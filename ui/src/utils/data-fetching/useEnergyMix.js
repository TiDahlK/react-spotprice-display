import { useDataFetch } from "./useDataFetch";
import { ENERGY_MIX } from "../../constants";
const errorMessage = "";

export const useEnergyMix = (setError) => {
  const onFailure = () => setError(errorMessage);

  return useDataFetch(ENERGY_MIX.SESSION_STORAGE_KEY, ENERGY_MIX.ENDPOINT, onFailure);
};
