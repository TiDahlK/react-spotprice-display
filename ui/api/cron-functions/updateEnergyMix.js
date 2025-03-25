import axios from "axios";
import { setBlob } from "../../api-utils/blob.js";

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

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const TODAYS_DATE = new Date().toISOString().split("T")[0];
    const blobName = `energy_${TODAYS_DATE}`;

    const energyMixPerPriceArea = await fetchProductionData();

    await setBlob(blobName, JSON.stringify(energyMixPerPriceArea));

    res.status(200).json(energyMixPerPriceArea);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
