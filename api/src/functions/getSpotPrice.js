const { app } = require("@azure/functions");
const axios = require("axios");

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

const MOCK_DATA = {
  deliveryDateCET: "2025-03-12",
  version: 3,
  updatedAt: "2025-03-11T12:10:37.917704Z",
  deliveryAreas: ["SE1", "SE2", "SE3", "SE4"],
  market: "DayAhead",
  multiAreaEntries: [
    {
      deliveryStart: "2025-03-11T23:00:00Z",
      deliveryEnd: "2025-03-12T00:00:00Z",
      entryPerArea: {
        SE1: 607.99,
        SE2: 568.94,
        SE3: 733.06,
        SE4: 734.26,
      },
    },
    {
      deliveryStart: "2025-03-12T00:00:00Z",
      deliveryEnd: "2025-03-12T01:00:00Z",
      entryPerArea: {
        SE1: 563.34,
        SE2: 517.48,
        SE3: 811.61,
        SE4: 817.97,
      },
    },
    {
      deliveryStart: "2025-03-12T01:00:00Z",
      deliveryEnd: "2025-03-12T02:00:00Z",
      entryPerArea: {
        SE1: 460.99,
        SE2: 412.28,
        SE3: 881.82,
        SE4: 895.97,
      },
    },
    {
      deliveryStart: "2025-03-12T02:00:00Z",
      deliveryEnd: "2025-03-12T03:00:00Z",
      entryPerArea: {
        SE1: 408.0,
        SE2: 355.67,
        SE3: 939.41,
        SE4: 958.5,
      },
    },
    {
      deliveryStart: "2025-03-12T03:00:00Z",
      deliveryEnd: "2025-03-12T04:00:00Z",
      entryPerArea: {
        SE1: 362.25,
        SE2: 303.01,
        SE3: 1039.8,
        SE4: 1062.94,
      },
    },
    {
      deliveryStart: "2025-03-12T04:00:00Z",
      deliveryEnd: "2025-03-12T05:00:00Z",
      entryPerArea: {
        SE1: 361.59,
        SE2: 292.48,
        SE3: 1152.35,
        SE4: 1180.55,
      },
    },
    {
      deliveryStart: "2025-03-12T05:00:00Z",
      deliveryEnd: "2025-03-12T06:00:00Z",
      entryPerArea: {
        SE1: 469.1,
        SE2: 383.09,
        SE3: 1606.76,
        SE4: 1654.59,
      },
    },
    {
      deliveryStart: "2025-03-12T06:00:00Z",
      deliveryEnd: "2025-03-12T07:00:00Z",
      entryPerArea: {
        SE1: 864.27,
        SE2: 783.74,
        SE3: 1789.42,
        SE4: 1831.76,
      },
    },
    {
      deliveryStart: "2025-03-12T07:00:00Z",
      deliveryEnd: "2025-03-12T08:00:00Z",
      entryPerArea: {
        SE1: 804.48,
        SE2: 738.54,
        SE3: 1648.23,
        SE4: 1680.7,
      },
    },
    {
      deliveryStart: "2025-03-12T08:00:00Z",
      deliveryEnd: "2025-03-12T09:00:00Z",
      entryPerArea: {
        SE1: 978.58,
        SE2: 951.59,
        SE3: 1376.48,
        SE4: 1393.93,
      },
    },
    {
      deliveryStart: "2025-03-12T09:00:00Z",
      deliveryEnd: "2025-03-12T10:00:00Z",
      entryPerArea: {
        SE1: 704.09,
        SE2: 675.79,
        SE3: 1130.85,
        SE4: 1150.16,
      },
    },
    {
      deliveryStart: "2025-03-12T10:00:00Z",
      deliveryEnd: "2025-03-12T11:00:00Z",
      entryPerArea: {
        SE1: 768.16,
        SE2: 730.86,
        SE3: 1133.92,
        SE4: 1126.46,
      },
    },
    {
      deliveryStart: "2025-03-12T11:00:00Z",
      deliveryEnd: "2025-03-12T12:00:00Z",
      entryPerArea: {
        SE1: 773.1,
        SE2: 733.39,
        SE3: 1114.4,
        SE4: 1107.59,
      },
    },
    {
      deliveryStart: "2025-03-12T12:00:00Z",
      deliveryEnd: "2025-03-12T13:00:00Z",
      entryPerArea: {
        SE1: 753.68,
        SE2: 699.49,
        SE3: 1142.7,
        SE4: 1132.94,
      },
    },
    {
      deliveryStart: "2025-03-12T13:00:00Z",
      deliveryEnd: "2025-03-12T14:00:00Z",
      entryPerArea: {
        SE1: 817.09,
        SE2: 755.77,
        SE3: 1162.23,
        SE4: 1151.26,
      },
    },
    {
      deliveryStart: "2025-03-12T14:00:00Z",
      deliveryEnd: "2025-03-12T15:00:00Z",
      entryPerArea: {
        SE1: 681.06,
        SE2: 626.31,
        SE3: 1361.56,
        SE4: 1352.13,
      },
    },
    {
      deliveryStart: "2025-03-12T15:00:00Z",
      deliveryEnd: "2025-03-12T16:00:00Z",
      entryPerArea: {
        SE1: 786.7,
        SE2: 698.83,
        SE3: 1636.16,
        SE4: 1617.18,
      },
    },
    {
      deliveryStart: "2025-03-12T16:00:00Z",
      deliveryEnd: "2025-03-12T17:00:00Z",
      entryPerArea: {
        SE1: 693.12,
        SE2: 594.17,
        SE3: 1871.15,
        SE4: 1843.94,
      },
    },
    {
      deliveryStart: "2025-03-12T17:00:00Z",
      deliveryEnd: "2025-03-12T18:00:00Z",
      entryPerArea: {
        SE1: 1186.03,
        SE2: 1043.31,
        SE3: 2331.37,
        SE4: 2296.92,
      },
    },
    {
      deliveryStart: "2025-03-12T18:00:00Z",
      deliveryEnd: "2025-03-12T19:00:00Z",
      entryPerArea: {
        SE1: 1344.56,
        SE2: 1226.52,
        SE3: 2055.89,
        SE4: 2028.58,
      },
    },
    {
      deliveryStart: "2025-03-12T19:00:00Z",
      deliveryEnd: "2025-03-12T20:00:00Z",
      entryPerArea: {
        SE1: 1315.82,
        SE2: 1227.83,
        SE3: 1619.59,
        SE4: 1599.52,
      },
    },
    {
      deliveryStart: "2025-03-12T20:00:00Z",
      deliveryEnd: "2025-03-12T21:00:00Z",
      entryPerArea: {
        SE1: 1012.26,
        SE2: 940.51,
        SE3: 1510.87,
        SE4: 1493.54,
      },
    },
    {
      deliveryStart: "2025-03-12T21:00:00Z",
      deliveryEnd: "2025-03-12T22:00:00Z",
      entryPerArea: {
        SE1: 1012.92,
        SE2: 956.2,
        SE3: 1270.07,
        SE4: 1287.95,
      },
    },
    {
      deliveryStart: "2025-03-12T22:00:00Z",
      deliveryEnd: "2025-03-12T23:00:00Z",
      entryPerArea: {
        SE1: 1039.58,
        SE2: 979.46,
        SE3: 1122.18,
        SE4: 1176.49,
      },
    },
  ],
  blockPriceAggregates: [
    {
      blockName: "Off-peak 1",
      deliveryStart: "2025-03-11T23:00:00Z",
      deliveryEnd: "2025-03-12T07:00:00Z",
      averagePricePerArea: {
        SE1: {
          average: 512.19,
          min: 361.59,
          max: 864.27,
        },
        SE2: {
          average: 452.09,
          min: 292.48,
          max: 783.74,
        },
        SE3: {
          average: 1119.28,
          min: 733.06,
          max: 1789.42,
        },
        SE4: {
          average: 1142.07,
          min: 734.26,
          max: 1831.76,
        },
      },
    },
    {
      blockName: "Peak",
      deliveryStart: "2025-03-12T07:00:00Z",
      deliveryEnd: "2025-03-12T19:00:00Z",
      averagePricePerArea: {
        SE1: {
          average: 857.55,
          min: 681.06,
          max: 1344.56,
        },
        SE2: {
          average: 789.55,
          min: 594.17,
          max: 1226.52,
        },
        SE3: {
          average: 1497.08,
          min: 1114.4,
          max: 2331.37,
        },
        SE4: {
          average: 1490.15,
          min: 1107.59,
          max: 2296.92,
        },
      },
    },
    {
      blockName: "Off-peak 2",
      deliveryStart: "2025-03-12T19:00:00Z",
      deliveryEnd: "2025-03-12T23:00:00Z",
      averagePricePerArea: {
        SE1: {
          average: 1095.15,
          min: 1012.26,
          max: 1315.82,
        },
        SE2: {
          average: 1026.0,
          min: 940.51,
          max: 1227.83,
        },
        SE3: {
          average: 1380.68,
          min: 1122.18,
          max: 1619.59,
        },
        SE4: {
          average: 1389.38,
          min: 1176.49,
          max: 1599.52,
        },
      },
    },
  ],
  currency: "SEK",
  exchangeRate: 10.97062,
  areaStates: [
    {
      state: "Final",
      areas: ["SE1", "SE2", "SE3", "SE4"],
    },
  ],
  areaAverages: [
    {
      areaCode: "SE1",
      price: 782.03,
    },
    {
      areaCode: "SE2",
      price: 716.47,
    },
    {
      areaCode: "SE3",
      price: 1351.75,
    },
    {
      areaCode: "SE4",
      price: 1357.33,
    },
  ],
};

async function fetchDayAheadPrices(date, market, deliveryAreas, currency) {
  try {
    const url = "https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices";
    const params = {
      date,
      market,
      deliveryArea: deliveryAreas.join(","), // Join areas as comma-separated string
      currency,
    };

    const response = await axios.get(url, { params });
    console.log("Fetched Data:", response.data);
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
    const data = await fetchDayAheadPrices(
      "2025-03-12",
      "DayAhead",
      ["SE1", "SE2", "SE3", "SE4"],
      "SEK"
    );

    const result = transformData(data);

    return { jsonBody: result };
  },
});
