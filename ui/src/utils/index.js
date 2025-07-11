export { useEnergyMix } from "./data-fetching/useEnergyMix";
export { useExchangeData } from "./data-fetching/useExchangeData";
export { useSpotPrice } from "./data-fetching/useSpotPrice";
export { useAnalysis } from "./data-fetching/useAnalysis";
export { useContent } from "./data-fetching/useContent";

export function getFromSessionStorage(key, fallbackValue) {
  const item = window.sessionStorage.getItem(key);
  return item ? JSON.parse(item) : fallbackValue;
}
