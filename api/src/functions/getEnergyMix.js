const { app } = require("@azure/functions");
const axios = require("axios");

const MOCK_DATA = {
  updatedAt: "2025-03-13T11:03:25.6680304Z",
  deliveryDateCET: "2025-03-13",
  deliveryStart: "2025-03-12T23:00:00Z",
  deliveryEnd: "2025-03-13T23:00:00Z",
  deliveryArea: "SE3",
  content: [
    {
      byType: {
        FossilGas: 1,
        HydroWaterReservoir: 1794,
        Nuclear: 6445,
        Other: 898,
        Solar: 0,
        WindOnshore: 466,
      },
      total: 9604,
      deliveryStart: "2025-03-12T23:00:00Z",
      deliveryEnd: "2025-03-13T00:00:00Z",
    },
    {
      byType: {
        FossilGas: 1,
        HydroWaterReservoir: 1793,
        Nuclear: 6445,
        Other: 883,
        Solar: 0,
        WindOnshore: 487,
      },
      total: 9609,
      deliveryStart: "2025-03-13T00:00:00Z",
      deliveryEnd: "2025-03-13T01:00:00Z",
    },
    {
      byType: {
        FossilGas: 0,
        HydroWaterReservoir: 1793,
        Nuclear: 6445,
        Other: 887,
        Solar: 0,
        WindOnshore: 498,
      },
      total: 9623,
      deliveryStart: "2025-03-13T01:00:00Z",
      deliveryEnd: "2025-03-13T02:00:00Z",
    },
    {
      byType: {
        FossilGas: 0,
        HydroWaterReservoir: 1792,
        Nuclear: 6444,
        Other: 882,
        Solar: 0,
        WindOnshore: 520,
      },
      total: 9638,
      deliveryStart: "2025-03-13T02:00:00Z",
      deliveryEnd: "2025-03-13T03:00:00Z",
    },
    {
      byType: {
        FossilGas: 0,
        HydroWaterReservoir: 1766,
        Nuclear: 6446,
        Other: 882,
        Solar: 0,
        WindOnshore: 554,
      },
      total: 9648,
      deliveryStart: "2025-03-13T03:00:00Z",
      deliveryEnd: "2025-03-13T04:00:00Z",
    },
    {
      byType: {
        FossilGas: 0,
        HydroWaterReservoir: 1653,
        Nuclear: 6445,
        Other: 885,
        Solar: 0,
        WindOnshore: 564,
      },
      total: 9547,
      deliveryStart: "2025-03-13T04:00:00Z",
      deliveryEnd: "2025-03-13T05:00:00Z",
    },
    {
      byType: {
        FossilGas: 0,
        HydroWaterReservoir: 1672,
        Nuclear: 6447,
        Other: 901,
        Solar: 1,
        WindOnshore: 566,
      },
      total: 9587,
      deliveryStart: "2025-03-13T05:00:00Z",
      deliveryEnd: "2025-03-13T06:00:00Z",
    },
    {
      byType: {
        FossilGas: 1,
        HydroWaterReservoir: 1693,
        Nuclear: 6448,
        Other: 929,
        Solar: 24,
        WindOnshore: 526,
      },
      total: 9621,
      deliveryStart: "2025-03-13T06:00:00Z",
      deliveryEnd: "2025-03-13T07:00:00Z",
    },
    {
      byType: {
        FossilGas: 1,
        HydroWaterReservoir: 1697,
        Nuclear: 6447,
        Other: 935,
        Solar: 77,
        WindOnshore: 458,
      },
      total: 9615,
      deliveryStart: "2025-03-13T07:00:00Z",
      deliveryEnd: "2025-03-13T08:00:00Z",
    },
    {
      byType: {
        FossilGas: 1,
        HydroWaterReservoir: 1707,
        Nuclear: 6446,
        Other: 934,
        Solar: 148,
        WindOnshore: 412,
      },
      total: 9648,
      deliveryStart: "2025-03-13T08:00:00Z",
      deliveryEnd: "2025-03-13T09:00:00Z",
    },
    {
      byType: {
        FossilGas: 1,
        HydroWaterReservoir: 1725,
        Nuclear: 6448,
        Other: 940,
        Solar: 221,
        WindOnshore: 357,
      },
      total: 9692,
      deliveryStart: "2025-03-13T09:00:00Z",
      deliveryEnd: "2025-03-13T10:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T10:00:00Z",
      deliveryEnd: "2025-03-13T11:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T11:00:00Z",
      deliveryEnd: "2025-03-13T12:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T12:00:00Z",
      deliveryEnd: "2025-03-13T13:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T13:00:00Z",
      deliveryEnd: "2025-03-13T14:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T14:00:00Z",
      deliveryEnd: "2025-03-13T15:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T15:00:00Z",
      deliveryEnd: "2025-03-13T16:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T16:00:00Z",
      deliveryEnd: "2025-03-13T17:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T17:00:00Z",
      deliveryEnd: "2025-03-13T18:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T18:00:00Z",
      deliveryEnd: "2025-03-13T19:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T19:00:00Z",
      deliveryEnd: "2025-03-13T20:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T20:00:00Z",
      deliveryEnd: "2025-03-13T21:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T21:00:00Z",
      deliveryEnd: "2025-03-13T22:00:00Z",
    },
    {
      byType: {},
      total: null,
      deliveryStart: "2025-03-13T22:00:00Z",
      deliveryEnd: "2025-03-13T23:00:00Z",
    },
  ],
  productionTypes: [
    "FossilGas",
    "HydroWaterReservoir",
    "Nuclear",
    "Other",
    "Solar",
    "WindOnshore",
  ],
};

function calculateProductionPercentage(data) {
  const result = data.content.reduce(
    (productionByType, entry) => {
      if (!entry.byType || !entry.total) return productionByType;

      for (const [type, value] of Object.entries(entry.byType)) {
        productionByType.byType[type] =
          (productionByType.byType[type] || 0) + value;
      }

      productionByType.totalProduction += entry.total;

      return productionByType;
    },
    { byType: {}, totalProduction: 0 }
  );

  console.log(result.totalProduction);
  const percentageByType = {};

  return Object.entries(result.byType).map(([label, value], index) => {
    console.log(label, value);
    return { label, value: (value / result.totalProduction) * 100, id: index };
  });
}

const fetchProductionData = async () => {
  const baseURL = "https://dataportal-api.nordpoolgroup.com/api/ProductionData";
  const deliveryAreas = ["SE1", "SE2", "SE3", "SE4"];
  const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)

  try {
    // Create an array of promises for each delivery area
    const requests = deliveryAreas.map((area) =>
      axios.get(baseURL, {
        params: {
          date: today,
          deliveryArea: area,
          location: "",
        },
      })
    );

    // Wait for all requests to complete
    const responses = await Promise.all(requests);

    return responses.reduce(
      (result, response) => {
        const calulatedArea = calculateProductionPercentage(response.data);
        result[response.data.deliveryArea] = calulatedArea;
        return result;
      },
      { SE1: null, SE2: null, SE3: null, SE4: null }
    );
  } catch (error) {
    console.error("Error fetching production data:", error);
  }
};

app.http("getEnergyMix", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const energyMixPerPriceArea = await fetchProductionData();

    return {
      jsonBody: energyMixPerPriceArea,
    };
  },
});
