import { useDataFetch } from "./useDataFetch";

const sessionStorageKey = "exchangeData";
const apiEndpoint = "getImportExport";
const errorMessage = "";

export const useExchangeData = (setError) => {
  const onFailure = () => setError(errorMessage);

  return useDataFetch(sessionStorageKey, apiEndpoint, onFailure);
};
