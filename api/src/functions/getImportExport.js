const { app } = require("@azure/functions");
const axios = require("axios");

const PRICE_AREAS = ["SE1", "SE2", "SE3", "SE4"];

function aggregateData(data) {
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

async function fetchExchangeData({ date, deliveryArea }) {
  try {
    const url = "https://dataportal-api.nordpoolgroup.com/api/PhysicalFlows";
    const params = {
      date,
      deliveryArea,
    };

    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Day Ahead Prices:", error.message);
    throw error;
  }
}

app.http("getImportExport", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const TODAYS_DATE = new Date().toISOString().split("T")[0];

    const exchangeDataPromises = PRICE_AREAS.map((area) =>
      fetchExchangeData({ date: TODAYS_DATE, deliveryArea: area })
    );
    const exchangeDataResults = await Promise.all(exchangeDataPromises);
    
    const importExportResult = exchangeDataResults.reduce(
      (acc, area) => {
        const { deliveryArea, ...rest } = aggregateData(area);
        acc[deliveryArea] = rest;

        return acc;
      },
      { SE1: {}, SE2: {}, SE3: {}, SE4: {} }
    );

    return { jsonBody: importExportResult };
  },
});
