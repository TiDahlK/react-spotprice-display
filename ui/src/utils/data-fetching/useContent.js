import axios from "axios";
import { useState } from "react";
import { getFromSessionStorage } from "../index";

const SESSION_STORAGE_KEY = "content";

const FALLBACK_COTNENT = {
  title: "Dagens spotpriser",
  loadingText: "Laddar in dagens spotpriser...",
  defaultErrorText: "Ojdå, något gick fel :(",
  showAiAnalysis: false,
};

const query = {
  query: `
        query {
          spotPriceMainCollection {
            items {
              title
              loadingText
              defaultErrorText
              showAiAnalysis
            }
          }
        }
      `,
};

export const useContent = () => {
  const [apiData, setApiData] = useState(() =>
    getFromSessionStorage(SESSION_STORAGE_KEY, null)
  );

  const getApiData = async () => {
    if (apiData) {
      return;
    }

    try {
      const { data } = await axios.post(`/api/getContent`, query);

      window.sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify(data.spotPriceMainCollection.items[0])
      );
      setApiData(data.spotPriceMainCollection.items[0]);
    } catch {
      setApiData(FALLBACK_COTNENT);
    }
  };

  return [apiData, getApiData];
};
