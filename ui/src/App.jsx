import Card from "./components/card/Card";
import { useState, useEffect, useCallback } from "react";
import SpotPriceChart from "./components/charts/spotprice_chart/SpotPriceChart";
import {
  useSpotPrice,
  useEnergyMix,
  useExchangeData,
  useAnalysis,
  useContent,
} from "./utils/index";
import "./App.css";

function App() {
  const [spotPrices, getSpotPrices] = useSpotPrice();
  const [energyMix, getEnergyMix] = useEnergyMix();
  const [analysis, getAnalysis] = useAnalysis();
  const [content, getContent] = useContent();

  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  const selectedArea = useCallback(
    (node) => {
      if (node) {
        node.scrollIntoView({ behavior: "smooth" });
      }
    },
    [selectedCard]
  );
  useEffect(() => {
    getSpotPrices(setError);
    getEnergyMix();
    getAnalysis();
    getContent();
  }, []);

  const additionalInfoSubTitle = `Vad påverkar spotpriserna i prisområde ${selectedCard} idag?`;
  const additionalInfoTitle = `Dagens spotpris i prisområde ${selectedCard}`;

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!spotPrices) {
    return (
      <h1 className="neon-text">
        {content?.loadingText || "Laddar in dagens spotpriser..."}
      </h1>
    );
  }

  return (
    <>
      <h1 className="neon-text">{content?.title}</h1>
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
          <h2>{additionalInfoTitle}</h2>

          <SpotPriceChart
            timeSeries={spotPrices[selectedCard].timeSeries}
          ></SpotPriceChart>

          {analysis && content?.showAiAnalysis && (
            <>
              <h3>{additionalInfoSubTitle}</h3>
              <p className="info-text">{analysis[selectedCard]}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
