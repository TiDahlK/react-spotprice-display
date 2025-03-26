import Card from "./components/card/Card";
import { useState, useEffect, useRef } from "react";
import SpotPriceChart from "./components/charts/spotprice_chart/SpotPriceChart";
import {
  useSpotPrice,
  useEnergyMix,
  useExchangeData,
  useAnalysis,
} from "./utils/index";
import "./App.css";

function App() {
  const [spotPrices, getSpotPrices] = useSpotPrice();
  const [energyMix, getEnergyMix] = useEnergyMix();
  const [exchangeData, getExchangeData] = useExchangeData();
  const [analysis, getAnalysis] = useAnalysis();

  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);

  const selectedArea = useRef(null);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    selectedArea.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getSpotPrices(setError);
    getEnergyMix();
    getExchangeData();
    getAnalysis();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!spotPrices) {
    return <h1 className="neon-text">Laddar in dagens spotpriser...</h1>;
  }

  return (
    <>
      <h1 className="neon-text">Dagens spotpriser</h1>
      <div className="container">
        {Object.entries(spotPrices).map(([area, spotPriceInfo]) => {
          const props = {
            ...spotPriceInfo,
            energyMix: energyMix?.areas[area],
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
          <p className="info-text">{analysis[selectedCard]}</p>
        </div>
      )}
    </>
  );
}

export default App;
