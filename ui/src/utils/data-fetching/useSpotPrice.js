import { useDataFetch } from "./useDataFetch";

const sessionStorageKey = "spotPrices";
const apiEndpoint = "getSpotPrice";
const errorMessage = "Kunde inte hämta dagens spotpriser :(";

export const useSpotPrice = (setError) => {
  const onFailure = () => setError(errorMessage);

  return useDataFetch(sessionStorageKey, apiEndpoint, onFailure);
};
