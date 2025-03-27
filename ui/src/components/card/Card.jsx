import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EnergyChart from "../charts/energy_chart/EnergyChart";
import SpotPriceChart from "../charts/spotprice_chart/SpotPriceChart";

import "./Card.css";

function Card({ priceArea, high, low, average, energyMix, onClickCallback }) {
  const title = `${priceArea} ${average.price}`;
  const ay11Title = `Prisområde ${priceArea}, Dagens genomsnittspris ${average.price}`;

  function handleClick() {
    document.title = title;
    onClickCallback(priceArea);
  }

  return (
    <>
      <button className="card__container" onClick={handleClick}>
        <h2 id="main-heading" aria-labelledby={`extra-info-${priceArea}`}>
          <FontAwesomeIcon icon="fa-solid fa-bolt fa-align-center" />
          {title}
        </h2>
        <p id={`extra-info-${priceArea}`} hidden>
          {ay11Title}
        </p>
        <div className="card__section">
          <h3>
            <FontAwesomeIcon
              icon="fa-solid fa-circle-arrow-up fa-align-center"
              aria-hidden="true"
            />
            Högst: {high.price} {high.timespan}
          </h3>
          <h3>
            <FontAwesomeIcon
              icon="fa-solid fa-circle-arrow-down"
              aria-hidden="true"
            />
            Lägst: {low.price} {low.timespan}
          </h3>
          {energyMix && (
            <div>
              <h3>Energimix</h3>
              <EnergyChart energyMix={energyMix}></EnergyChart>
            </div>
          )}
        </div>
      </button>
    </>
  );
}

export default Card;
