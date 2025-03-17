import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Card.css";
import EnergyChart from "../chart/EnergyChart";

function Card({
  priceArea,
  high,
  low,
  average,
  energyMix,
  isSelected,
  onClickCallback,
}) {
  function handleClick() {
    onClickCallback(priceArea);
  }

  function expandedCard() {
    return (
      <div
        className="card__container card__container-expanded"
        onClick={handleClick}
      >
        <h2>
          <FontAwesomeIcon icon="fa-solid fa-bolt fa-align-center" />{" "}
          {priceArea} - {average.price}
        </h2>
        <div className="card__section"></div>
      </div>
    );
  }

  function defaultCard() {
    return (
      <div className="card__container" onClick={handleClick}>
        <h2>
          <FontAwesomeIcon icon="fa-solid fa-bolt fa-align-center" />{" "}
          {priceArea} - {average.price}
        </h2>
        <div className="card__section">
          <h3>
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-up fa-align-center" />
            Högst - {high.price} {high.timespan}
          </h3>
          <h3>
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-down" />
            Lägst - {low.price} {low.timespan}
          </h3>
          <div>
            <h3>Energimix</h3>
            <EnergyChart energyMix={energyMix}></EnergyChart>
          </div>
        </div>
      </div>
    );
  }

  return <>{isSelected ? expandedCard() : defaultCard()}</>;
}

export default Card;
