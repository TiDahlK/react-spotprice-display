import axios from "axios";
import { useState } from "react";
import { getFromSessionStorage } from "../index";

export const useDataFetch = (sessionStorageKey, endpoint, onFailure) => {
  const [apiData, setApiData] = useState(() =>
    getFromSessionStorage(sessionStorageKey, null)
  );

  const getApiData = async () => {
    if (apiData) {
      return;
    }

    try {
      const { data } = await axios.get(`/api/${endpoint}`);
      window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
      setApiData(data);
    } catch(error) {
      onFailure(error);
    }
  };

  return [apiData, getApiData];
};
