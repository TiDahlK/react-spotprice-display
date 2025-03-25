import { useDataFetch } from "./useDataFetch";
import {  SPOT_PRICE} from "../../constants"
const errorMessage = "Kunde inte hämta dagens spotpriser :(";

export const useSpotPrice = (setError) => {
  const onFailure = () => setError(errorMessage);

  return useDataFetch(SPOT_PRICE.SESSION_STORAGE_KEY, SPOT_PRICE.ENDPOINT, onFailure);
};
