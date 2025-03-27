import axios from "axios";
import { setBlob } from "../../api-utils/blob.js";
import {
  STATIC_SPOTPRICE_PARAMS,
  COLOR_LIST,
  PRICE_AREAS,
  LABEL_DICTIONARY,
} from "../../api-utils/utils.js";

function mapSpotPriceData(data) {
  return data.deliveryAreas.reduce((result, area) => {
    let highestPrice = -Infinity;
    let lowestPrice = Infinity;
    let highTime = "";
    let lowTime = "";

    const timeSeries = data.multiAreaEntries.map((entry) => {
      const price = entry.entryPerArea[area] || 0;
      const deliveryStart = new Date(entry.deliveryStart);
      const hour = deliveryStart.getHours();

      if (price > highestPrice) {
        highestPrice = price;
        highTime = `Klockan ${hour}:00-${(parseInt(hour) + 1) % 24}:00`;
      }

      if (price < lowestPrice) {
        lowestPrice = price;
        lowTime = `Klockan ${hour}:00-${(parseInt(hour) + 1) % 24}:00`;
      }

      return {
        time: hour,
        value: Math.round(price * 10) / 100,
      };
    });

    const areaAverage = data.areaAverages.find(
      (a) => a.areaCode === area
    )?.price;

    result[area] = {
      priceArea: area,
      high: {
        price: `${(highestPrice / 10).toFixed(2)} öre/kWh`,
        timespan: highTime,
      },
      low: {
        price: `${(lowestPrice / 10).toFixed(2)} öre/kWh`,
        timespan: lowTime,
      },
      average: {
        price: `${(areaAverage / 10).toFixed(2)} öre/kWh`,
      },
      timeSeries: timeSeries.sort((a, b) => {
        return a.time - b.time;
      }),
    };

    return result;
  }, {});
}

function calculateProductionPercentage(data, colorMap) {
  const result = data.content.reduce(
    (productionByType, entry) => {
      if (!entry.byType || !entry.total) return productionByType;

      for (const [type, value] of Object.entries(entry.byType)) {
        productionByType.byType[type] =
          (productionByType.byType[type] || 0) + value;

        if (!colorMap[type]) {
          colorMap[type] = COLOR_LIST[Object.entries(colorMap).length];
        }
      }

      productionByType.totalProduction += entry.total;

      return productionByType;
    },
    { byType: {}, totalProduction: 0 }
  );

  const updatedData = Object.entries(result.byType)
    .map(([label, value], index) => {
      return {
        label: LABEL_DICTIONARY[label] || label,
        value: (value / result.totalProduction) * 100,
        id: index,
        color: colorMap[label],
      };
    })
    .reduce((acc, item) => {
      if (item.value > 1 && item.label !== "Övrigt") {
        acc.push(item);
        return acc;
      }

      const otherEntry = acc.find((entry) => entry.label === "Övrigt");

      if (otherEntry) {
        otherEntry.value += item.value;
        return acc;
      }

      acc.push({
        label: "Övrigt",
        value: item.value,
        id: acc.length,
        color: COLOR_LIST[Object.entries(colorMap).length],
      });

      return acc;
    }, []);

  return {
    calulatedArea: updatedData,
    colorMap,
  };
}

function aggregateExchangeData(data) {
  const convertToMWH = (value) => value / 4;

  const {
    totalExport,
    totalImport,
    totalNetPosition,
    totalForeignImport,
    totalForeignExport,
    totalForeignNetPosition,
    byArea,
  } = data.content.reduce(
    (acc, entry) => {
      acc.totalExport += entry.totalExport;
      acc.totalImport += entry.totalImport;
      acc.totalNetPosition += entry.totalNetPosition;

      Object.entries(entry.byArea).forEach(([area, values]) => {
        if (!acc.byArea[area]) {
          acc.byArea[area] = { import: 0, export: 0, netPosition: 0 };
        }
        acc.byArea[area].import += values.import;
        acc.byArea[area].export += values.export;
        acc.byArea[area].netPosition += values.netPosition;

        if (!PRICE_AREAS[area]) {
          acc.totalForeignImport += values.import;
          acc.totalForeignExport += values.export;
          acc.totalForeignNetPosition += values.netPosition;
        }
      });

      return acc;
    },
    {
      totalExport: 0,
      totalImport: 0,
      totalNetPosition: 0,
      totalForeignImport: 0,
      totalForeignExport: 0,
      totalForeignNetPosition: 0,
      byArea: {},
    }
  );

  return {
    totalExport: convertToMWH(totalExport),
    totalImport: convertToMWH(totalImport),
    totalNetPosition: convertToMWH(totalNetPosition),
    totalForeignImport: convertToMWH(totalForeignImport),
    totalForeignExport: convertToMWH(totalForeignExport),
    totalForeignNetPosition: convertToMWH(totalForeignNetPosition),
    byArea: Object.entries(byArea).map(([label, value]) => {
      return {
        import: convertToMWH(value.import),
        export: convertToMWH(value.export),
        netPosition: convertToMWH(value.netPosition),
        label,
      };
    }),
    deliveryArea: data.deliveryArea,
  };
}

async function fetchDayAheadPrices(date) {
  const url = "https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices";
  const params = {
    date,
    market: STATIC_SPOTPRICE_PARAMS.market,
    deliveryArea: STATIC_SPOTPRICE_PARAMS.deliveryAreas.join(","),
    currency: STATIC_SPOTPRICE_PARAMS.currency,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Day Ahead Prices:", error.message);
    throw error;
  }
}

async function fetchProductionData() {
  const baseURL = "https://dataportal-api.nordpoolgroup.com/api/ProductionData";
  const deliveryAreas = PRICE_AREAS;
  const today = new Date().toISOString().split("T")[0];

  try {
    const requests = deliveryAreas.map((area) =>
      axios.get(baseURL, {
        params: { date: today, deliveryArea: area, location: "" },
      })
    );

    const responses = await Promise.all(requests);
    return responses.reduce(
      (result, response) => {
        const { calulatedArea, colorMap } = calculateProductionPercentage(
          response.data,
          result.colorMap
        );

        result.areas[response.data.deliveryArea] = calulatedArea;
        result.colorMap = colorMap;
        return result;
      },
      { areas: { SE1: null, SE2: null, SE3: null, SE4: null }, colorMap: {} }
    );
  } catch (error) {
    console.error("Error fetching production data:", error);
  }
}

async function fetchExchangeData(date, deliveryArea) {
  const url = "https://dataportal-api.nordpoolgroup.com/api/PhysicalFlows";
  const params = {
    date,
    deliveryArea,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Exchange Data:", error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const TODAYS_DATE = new Date().toISOString().split("T")[0];
    const energyBlobName = `energy_${TODAYS_DATE}`;
    const exchangeBlobName = `exchange_${TODAYS_DATE}`;
    const spotPriceBlobName = `spotprice_${TODAYS_DATE}`;

    const [priceData, productionData, exchangeData] = await Promise.all([
      fetchDayAheadPrices(TODAYS_DATE),
      fetchProductionData(),
      fetchExchangeData(TODAYS_DATE, "SE1"),
    ]);

    const transformedPriceData = mapSpotPriceData(priceData);
    const exchangeDataAggregated = aggregateExchangeData(exchangeData);
    const combinedData = {
      priceData: transformedPriceData,
      productionData,
      exchangeData: exchangeDataAggregated,
    };

    await Promise.all([
      setBlob(spotPriceBlobName, JSON.stringify(transformedPriceData)),
      setBlob(exchangeBlobName, JSON.stringify(exchangeDataAggregated)),
      setBlob(energyBlobName, JSON.stringify(productionData)),
    ]);

    res.status(200).json(combinedData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
