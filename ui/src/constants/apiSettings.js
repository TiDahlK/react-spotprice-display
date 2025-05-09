const today = new Date().toISOString().split("T")[0];

export const SPOT_PRICE = {
  SESSION_STORAGE_KEY: `spotPrice_${today}`,
  ENDPOINT: "getSpotPrice",
};
export const ENERGY_MIX = {
  SESSION_STORAGE_KEY: `energyMix_${today}`,
  ENDPOINT: "getEnergyMix",
};
export const EXCHANGE_DATA = {
  SESSION_STORAGE_KEY: `exchangeData_${today}`,
  ENDPOINT: "getImportExport",
};
export const ANALYSIS = {
  SESSION_STORAGE_KEY: `analysis_${today}`,
  ENDPOINT: "getAnalysis",
};
