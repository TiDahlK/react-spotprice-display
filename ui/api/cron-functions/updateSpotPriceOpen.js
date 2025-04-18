/* eslint-disable no-undef */
import axios from "axios";
import xml2js from "xml2js";
import { setBlob, deleteBlob } from "../../api-utils/blob.js";

const blobName = (date) => `open_spotprice_${date}`;

const AREAS = {
  SE1: "10Y1001A1001A44P",
  SE2: "10Y1001A1001A45N",
  SE3: "10Y1001A1001A46L",
  SE4: "10Y1001A1001A47J",
};

const TOKEN = process.env.ENTSOE_TOKEN;
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

  const tomorrow2200 = new Date(today2200.getTime() + 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/T/g, "")
      .slice(0, 12);
  };

  const periodStart = formatDate(today2200);
  const periodEnd = formatDate(tomorrow2200);

  return `${BASE_URL}?documentType=A44&periodStart=${periodStart}&periodEnd=${periodEnd}&in_Domain=${code}&out_Domain=${code}&securityToken=${TOKEN}`;
};

const toTwoDecimalsTruncated = (num) => {
  return Math.round(num * 100) / 100;
};

const getTimeLabel = (time) =>
  `Klockan ${(parseInt(time) - 1) % 24}:00-${time}:00`;

const fetchSpotPricesForArea = async (area, code, parser, exchangeRate) => {
  try {
    const { data: xml } = await axios.get(buildUrl(code));

    const json = await parser.parseStringPromise(xml);
    const timeSeries = json?.Publication_MarketDocument?.TimeSeries;

    const points =
      timeSeries?.Period?.Point?.map((p) => {
        const eurPerMWh = parseFloat(p["price.amount"]);
        const orePerKWh = (eurPerMWh * exchangeRate) / 10;

        return {
          time: p.position,
          value: orePerKWh, // truncated to 2 decimals
        };
      }) || [];

    const sorted = [...points].sort((a, b) => a.time - b.time);

    const { highest, lowest, sum } = sorted.reduce(
      (acc, point) => {
        acc.sum += parseFloat(point.value);

        if (point.value > acc.highest.value) {
          acc.highest = point;
        }
        if (point.value < acc.lowest.value) {
          acc.lowest = point;
        }

        return acc;
      },
      {
        sum: 0,
        highest: sorted[0],
        lowest: sorted[0],
      }
    );
    const avg = sum / sorted.length;

    return {
      [area]: {
        priceArea: area,
        high: {
          price: `${toTwoDecimalsTruncated(highest.value)} öre/kWh`,
          timespan: getTimeLabel(highest.time),
        },
        low: {
          price: `${toTwoDecimalsTruncated(lowest.value)} öre/kWh`,
          timespan: getTimeLabel(lowest.time),
        },
        average: {
          price: `${toTwoDecimalsTruncated(avg)} öre/kWh`,
        },
        timeSeries: sorted.map((point) => ({
          value: toTwoDecimalsTruncated(point.value),
          time: point.time,
        })),
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
  const { FXR_TOKEN } = process.env;
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

export async function deleteYesterdaysBlob() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  await deleteBlob(blobName(dateStr));
}

export default async function handler(req, res) {
  deleteYesterdaysBlob(); // no need to wait for response

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

  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const TOMORROWS_DATE = tomorrow.toISOString().split("T")[0];

  await setBlob(blobName(TOMORROWS_DATE), JSON.stringify(results));

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(results);
}
