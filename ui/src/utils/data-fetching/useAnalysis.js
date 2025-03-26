import { useDataFetch } from "./useDataFetch";
import { ANALYSIS } from "../../constants";
const errorMessage = "";

export const useAnalysis = (setError) => {
  const onFailure = () => setError(errorMessage);

  return useDataFetch(
    ANALYSIS.SESSION_STORAGE_KEY,
    ANALYSIS.ENDPOINT,
    onFailure
  );
};
