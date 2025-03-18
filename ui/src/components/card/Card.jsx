import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EnergyChart from "../charts/energy_chart/EnergyChart";
import SpotPriceChart from "../charts/spotprice_chart/SpotPriceChart";

import "./Card.css";

function Card({
  priceArea,
  timeSeries,
  high,
  low,
  average,
  energyMix,
  isSelected,
  onClickCallback,
}) {
  const title = `${priceArea} ${average.price}`;

  function handleClick() {
    onClickCallback(priceArea);
  }

  function expandedCard() {
    document.title = title;

    return (
      <div className="card__container card__container-expanded">
        <button className="close-button" onClick={handleClick}>
          <FontAwesomeIcon
            icon="fa-solid fa-x fa-align-center"
            color="white"
            size="lg"
          />
        </button>
        <h2>
          <FontAwesomeIcon icon="fa-solid fa-bolt fa-align-center" />{" "}
          {priceArea} - {average.price}
        </h2>
        <SpotPriceChart timeSeries={timeSeries}></SpotPriceChart>
      </div>
    );
  }

  function defaultCard() {
    return (
      <button className="card__container" onClick={handleClick}>
        <h2>
          <FontAwesomeIcon icon="fa-solid fa-bolt fa-align-center" /> {title}
        </h2>
        <div className="card__section">
          <h3>
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-up fa-align-center" />
            Högst: {high.price} {high.timespan}
          </h3>
          <h3>
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-down" />
            Lägst: {low.price} {low.timespan}
          </h3>
          <div>
            <h3>Energimix</h3>
            <EnergyChart energyMix={energyMix}></EnergyChart>
          </div>
        </div>
      </button>
    );
  }

  return <>{isSelected ? expandedCard() : defaultCard()}</>;
}

export default Card;
