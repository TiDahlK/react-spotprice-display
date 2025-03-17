import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/card/Card";
import { getFromSessionStorage } from "./utils";
import "./App.css";

function App() {
  const [spotPrices, setSpotPrices] = useState(() =>
    getFromSessionStorage("spotPrices", null)
  );
  const [energyMix, setEnergyMix] = useState(() =>
    getFromSessionStorage("energyMix", null)
  );
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (card) => {
    console.log(selectedCard, card);
    if (selectedCard === card) {
      setSelectedCard(null);
      return;
    }

    setSelectedCard(card);
  };
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpotPrice = async () => {
      if (spotPrices) {
        return;
      }

      try {
        const { data } = await axios.get(
          "http://localhost:7071/api/getSpotPrice"
        );
        setSpotPrices(data);
        window.sessionStorage.setItem("spotPrices", JSON.stringify(data));
      } catch (err) {
        console.log(err);
        setError("Kunde inte hämta spotpriser :(");
      }
    };

    fetchSpotPrice();
  }, []);

  useEffect(() => {
    const fetchEnergyMix = async () => {
      if (energyMix) {
        return;
      }
      try {
        const { data } = await axios.get(
          "http://localhost:7071/api/getEnergyMix"
        );
        setEnergyMix(data);
        window.sessionStorage.setItem("energyMix", JSON.stringify(data));
      } catch (err) {
        console.log(err);
        setError("Kunde inte hämta spotpriser :(");
      }
    };

    fetchEnergyMix();
  }, []);

  if (error) return <h1>{error}</h1>;
  if (!spotPrices || !energyMix) return <h1>Laddar in dagens spotpriser...</h1>;

  return (
    <>
      <h1>Dagens spotpriser</h1>
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
    </>
  );
}

export default App;
