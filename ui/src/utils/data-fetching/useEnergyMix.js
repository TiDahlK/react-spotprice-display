import { useDataFetch } from "./useDataFetch";

const sessionStorageKey = "energyMix";
const apiEndpoint = "getEnergyMix";
const errorMessage = "";

export const useEnergyMix = (setError) => {
  const onFailure = () => setError(errorMessage);

  return useDataFetch(sessionStorageKey, apiEndpoint, onFailure);
};
