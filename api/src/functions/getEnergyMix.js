const { app } = require("@azure/functions");
const axios = require("axios");
const COLOR_LIST = [
  "#99621E",
  "#D38B5D",
  "#F3FFB6",
  "#739E82",
  "#2C5530",
  "#A67C52",
  "#E4B07A",
  "#FAEECF",
  "#8AA899",
  "#3D6653",
  "#B0885C",
  "#D9A87C",
  "#F2E8C6",
  "#7D9A87",
  "#466A5D",
  "#C4A484",
  "#E0C3A2",
  "#FFF7E4",
  "#99B3A6",
  "#5B7F6B",
];

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
        label,
        value: (value / result.totalProduction) * 100,
        id: index,
        color: colorMap[label],
      };
    })
    .reduce((acc, item) => {
      if (item.value > 1 && item.label !== "Other") {
        acc.push(item);
        return acc;
      }

      const otherEntry = acc.find((entry) => entry.label === "Other");

      if (otherEntry) {
        otherEntry.value += item.value;
        return acc;
      }

      acc.push({
        label: "Other",
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

const fetchProductionData = async () => {
  const baseURL = "https://dataportal-api.nordpoolgroup.com/api/ProductionData";
  const deliveryAreas = ["SE1", "SE2", "SE3", "SE4"];
  const today = new Date().toISOString().split("T")[0];

  try {
    const requests = deliveryAreas.map((area) =>
      axios.get(baseURL, {
        params: {
          date: today,
          deliveryArea: area,
          location: "",
        },
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
