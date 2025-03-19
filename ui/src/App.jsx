import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./components/card/Card";
import { getFromSessionStorage } from "./utils";
import "./App.css";
import SpotPriceChart from "./components/charts/spotprice_chart/SpotPriceChart";

function App() {
  const [spotPrices, setSpotPrices] = useState(() =>
    getFromSessionStorage("spotPrices", null)
  );
  const [energyMix, setEnergyMix] = useState(() =>
    getFromSessionStorage("energyMix", null)
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);

  const isDataFetched = useRef({
    spotPricesFetched: false,
    energyMixFetched: false,
  });

  const selectedArea = useRef(null);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    selectedArea.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSpotPrice = async () => {
      if (spotPrices || isDataFetched.current.spotPricesFetched) {
        return; // Avoid fetching if already fetched or sessionStorage has it
      }

      try {
        const { data } = await axios.get(
          "http://localhost:7071/api/getSpotPrice"
        );
        setSpotPrices(data);
        window.sessionStorage.setItem("spotPrices", JSON.stringify(data));
        isDataFetched.current.spotPricesFetched = true; // Mark as fetched
      } catch (err) {
        console.log(err);
        setError("Kunde inte hämta spotpriser :(");
      }
    };

    fetchSpotPrice();
  }, [spotPrices]); // Add spotPrices as dependency to check if it was fetched

  useEffect(() => {
    const fetchEnergyMix = async () => {
      if (energyMix || isDataFetched.current.energyMixFetched) {
        return; // Avoid fetching if already fetched or sessionStorage has it
      }

      try {
        const { data } = await axios.get(
          "http://localhost:7071/api/getEnergyMix"
        );
        setEnergyMix(data);
        window.sessionStorage.setItem("energyMix", JSON.stringify(data));
        isDataFetched.current.energyMixFetched = true; // Mark as fetched
      } catch (err) {
        console.log(err);
        setError("Kunde inte hämta energimix :(");
      }
    };

    fetchEnergyMix();
  }, [energyMix]); // Add energyMix as dependency to check if it was fetched

  if (error) return <h1>{error}</h1>;
  if (!spotPrices || !energyMix)
    return <h1 className="neon-text">Laddar in dagens spotpriser...</h1>;

  return (
    <>
      <h1 className="neon-text">Dagens spotpriser</h1>
      <div className="container">
        {Object.entries(spotPrices).map(([area, spotPriceInfo]) => {
          const props = {
            ...spotPriceInfo,
            energyMix: energyMix.areas[area],
            isSelected: area === selectedCard,
          };
          return (
            <Card
              key={area}
              {...props}
              onClickCallback={handleSelectCard}
            ></Card>
          );
        })}
      </div>
      {selectedCard && (
        <div className="additional-info_container" ref={selectedArea}>
          <h2>Dagens Spotpris i {selectedCard}</h2>

          <SpotPriceChart
            timeSeries={spotPrices[selectedCard].timeSeries}
          ></SpotPriceChart>

          <h3>Vad påverkar spotpriserna i {selectedCard} idag?</h3>
          <p className="info-text">
            På grund av hög export och låg produktion från förnybara källor, som
            vanligtvis pressar ner priserna, är elpriserna idag högre än normalt
            i SE4. Vindkraftsproduktionen är låg, samtidigt som exporten till
            kontinenten är hög, vilket skapar ett underskott och driver upp
            priset
          </p>
        </div>
      )}
    </>
  );
}

export default App;
