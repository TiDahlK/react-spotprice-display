import axios from "axios";
import xml2js from "xml2js";
import { setBlob } from "../../api-utils/blob.js";
import dotenv from "dotenv";

const env = dotenv.config().parsed;
const AREAS = {
  SE1: "10Y1001A1001A44P",
  SE2: "10Y1001A1001A45N",
  SE3: "10Y1001A1001A46L",
  SE4: "10Y1001A1001A47J",
};

const TOKEN = env.ENTSOE_TOKEN;
const BASE_URL = "https://web-api.tp.entsoe.eu/api";

const buildUrl = (code) => {
  const now = new Date();

  const today2200 = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      22,
      0,
      0
    )
  );

  const yesterday2200 = new Date(today2200.getTime() - 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/T/g, "")
      .slice(0, 12);
  };

  const periodStart = formatDate(yesterday2200);
  const periodEnd = formatDate(today2200);

  return `${BASE_URL}?documentType=A44&periodStart=${periodStart}&periodEnd=${periodEnd}&in_Domain=${code}&out_Domain=${code}&securityToken=${TOKEN}`;
};

const toTwoDecimalsTruncated = (num) => {
  return (Math.floor(num * 100) / 100).toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const fetchSpotPricesForArea = async (area, code, parser, exchangeRate) => {
  try {
    const { data: xml } = await axios.get(buildUrl(code));
    const json = await parser.parseStringPromise(xml);
    const timeSeries = json?.Publication_MarketDocument?.TimeSeries;

    const points =
      timeSeries?.Period?.Point?.map((p) => {
        const eurPerMWh = parseFloat(p["price.amount"]);
        const orePerKWh = (eurPerMWh * exchangeRate * 0.9901639344262295) / 10;

        return {
          time: p.position,
          price: toTwoDecimalsTruncated(orePerKWh), // truncated to 2 decimals
        };
      }) || [];

    const sorted = [...points].sort((a, b) => a.time - b.time);

    const highest = sorted.reduce((a, b) => (a.price > b.price ? a : b));
    const lowest = sorted.reduce((a, b) => (a.price < b.price ? a : b));
    const avg = toTwoDecimalsTruncated(
      sorted.reduce((sum, p) => sum + parseFloat(p.price), 0) / sorted.length
    );

    return {
      [area]: {
        priceArea: area,
        high: {
          price: `${highest.price} öre/kWh`,
          timespan: `Klockan ${highest.time}:00-${
            (parseInt(highest.time) + 1) % 24
          }:00`,
        },
        low: {
          price: `${lowest.price} öre/kWh`,
          timespan: `Klockan ${lowest.time}:00-${
            (parseInt(lowest.time) + 1) % 24
          }:00`,
        },
        average: {
          price: `${avg} öre/kWh`,
        },
        timeSeries: sorted,
      },
    };
  } catch (err) {
    return {
      [area]: {
        error: "Failed to fetch or parse data",
        details: err.message,
      },
    };
  }
};

const getFxRateEURtoSEK = async () => {
  const { FXR_TOKEN } = env;
  const url = `https://api.fxratesapi.com/latest?currencies=SEK&base=EUR&amount=1`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${FXR_TOKEN}`,
      },
    });

    return data?.rates?.SEK ?? null;
  } catch (err) {
    console.error("Failed to fetch FX rate:", err.message);
    return null;
  }
};

export default async function handler(req, res) {
  const parser = new xml2js.Parser({ explicitArray: false });

  const exchangeRate = await getFxRateEURtoSEK();
  if (!exchangeRate) {
    return res
      .status(500)
      .json({ error: "Failed to fetch currency conversion rate" });
  }

  const promises = Object.entries(AREAS).map(([area, code]) =>
    fetchSpotPricesForArea(area, code, parser, exchangeRate)
  );

  const areaResults = await Promise.all(promises);

  const results = Object.assign({}, ...areaResults);
  const TODAYS_DATE = new Date().toISOString().split("T")[0];

  await setBlob(`open_spotprice_${TODAYS_DATE}`, JSON.stringify(results));

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(results);
}
