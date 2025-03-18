const { app } = require("@azure/functions");

const OpenAI = require("openai");
const client = new OpenAI();

const spotPrices = {
  priceArea: "SE4",
  high: {
    price: "155.50 öre/kWh",
    timespan: "Klocka 7:00-8:00",
  },
  low: {
    price: "-0.35 öre/kWh",
    timespan: "Klocka 13:00-14:00",
  },
  average: {
    price: "70.36 öre/kWh",
  },
  timeSeries: [
    {
      time: 0,
      value: 38.53,
    },
    {
      time: 1,
      value: 30.28,
    },
    {
      time: 2,
      value: 46.25,
    },
    {
      time: 3,
      value: 49.24,
    },
    {
      time: 4,
      value: 77.69,
    },
    {
      time: 5,
      value: 116.8,
    },
    {
      time: 6,
      value: 147.04,
    },
    {
      time: 7,
      value: 155.5,
    },
    {
      time: 8,
      value: 116.23,
    },
    {
      time: 9,
      value: 72.58,
    },
    {
      time: 10,
      value: 27.64,
    },
    {
      time: 11,
      value: 1.79,
    },
    {
      time: 12,
      value: -0.24,
    },
    {
      time: 13,
      value: -0.35,
    },
    {
      time: 14,
      value: 17.44,
    },
    {
      time: 15,
      value: 34.52,
    },
    {
      time: 16,
      value: 82.02,
    },
    {
      time: 17,
      value: 104.83,
    },
    {
      time: 18,
      value: 125.97,
    },
    {
      time: 19,
      value: 116.1,
    },
    {
      time: 20,
      value: 95.13,
    },
    {
      time: 21,
      value: 83.3,
    },
    {
      time: 22,
      value: 79.06,
    },
    {
      time: 23,
      value: 71.41,
    },
  ],
};
const importExport = {
  totalExport: 205616,
  totalImport: 361836,
  totalForeignImport: 22744,
  totalForeignExport: 205616,
  byArea: {
    DK2: { import: 0, export: 92156, netPosition: -92156 },
    LT: { import: 6832, export: 35260, netPosition: -28428 },
    SE3: { import: 339092, export: 0, netPosition: 339092 },
    "DE-LU": { import: 2996, export: 43608, netPosition: -40612 },
    PL: { import: 12916, export: 34592, netPosition: -21676 },
  },
};
const enrgyProductionMix = [
  {
    label: "Other",
    value: 11.401148188015789,
    id: 0,
    color: "#E4B07A",
  },
  {
    label: "HydroWaterReservoir",
    value: 11.25762468604234,
    id: 1,
    color: "#99621E",
  },
  {
    label: "WindOnshore",
    value: 77.34122712594187,
    id: 4,
    color: "#739E82",
  },
];

app.http("getAIAnalysis", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const content = `Använd datapunkterna 'SPOT_PRICES', 'IMPORT_EXPORT' och 'ENERGY_PRODUCTION_MIX' för att förklara varför 'SPOT_PRICES' är på dagens nivå. 
                    Var specifik för just dagens priser och undvik generella förklaringar. Lyft fram de mest avgörande faktorerna, såsom förändringar i elproduktion, import/export och hur detta påverkar priset. 
                    Sammanfattningen ska vara kort, lättförståelig och högst 100 ord lång. Svaret ska vara på svenska och formulerat på ett naturligt sätt.
                    DATA
                    SPOT_PRICES: ${JSON.stringify(spotPrices)}
                    IMPORT_EXPORT: ${JSON.stringify(importExport)}
                    ENERGY_PRODUCTION_MIX: ${JSON.stringify(enrgyProductionMix)}
                    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    });

    return {
      jsonBody: {
        message: completion.choices[0].message.content,
      },
    };
  },
});
