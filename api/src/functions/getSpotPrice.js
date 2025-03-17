const { app } = require("@azure/functions");
const axios = require("axios");
const STATIC_PARAMS = {
  market: "DayAhead",
  deliveryAreas: ["SE1", "SE2", "SE3", "SE4"],
  currency: "SEK",
};

function transformData(data) {
  return data.deliveryAreas.reduce((result, area) => {
    let highestPrice = -Infinity;
    let lowestPrice = Infinity;
    let highTime = "";
    let lowTime = "";

    data.multiAreaEntries.forEach((entry) => {
      const price = entry.entryPerArea[area];

      const deliveryStart = new Date(entry.deliveryStart);
      const hour = deliveryStart.getHours().toString().padStart(2, "0");
      const nextHour =
        hour === "23"
          ? "00"
          : (deliveryStart.getHours() + 1).toString().padStart(2, "0");
      const timeSpan = `Klocka ${hour}:00-${nextHour}:00`;

      if (price > highestPrice) {
        highestPrice = price;
        highTime = timeSpan;
      }

      if (price < lowestPrice) {
        lowestPrice = price;
        lowTime = timeSpan;
      }
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
    };

    return result;
  }, {});
}

async function fetchDayAheadPrices({ date, market, deliveryAreas, currency }) {
  try {
    const url = "https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices";
    const params = {
      date,
      market,
      deliveryArea: deliveryAreas.join(","),
      currency,
    };

    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Day Ahead Prices:", error.message);
    throw error;
  }
}

app.http("getSpotPrice", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const date = new Date().toISOString().split("T")[0];

    const data = await fetchDayAheadPrices({ date, ...STATIC_PARAMS });

    const result = transformData(data);

    return { jsonBody: result };
  },
});
