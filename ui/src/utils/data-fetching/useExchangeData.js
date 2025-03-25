import { useDataFetch } from "./useDataFetch";
import { EXCHANGE_DATA } from "../../constants";

const errorMessage = "";

export const useExchangeData = (setError) => {
  const onFailure = () => setError(errorMessage);

  return useDataFetch(EXCHANGE_DATA.SESSION_STORAGE_KEY, EXCHANGE_DATA.ENDPOINT, onFailure);
};
