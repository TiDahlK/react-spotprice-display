import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EnergyChart from "../charts/energy_chart/EnergyChart";

import "./Card.css";

function Card({ priceArea, high, low, average, energyMix, onClickCallback }) {
  const title = `${priceArea} ${average.price}`;

  function handleClick() {
    document.title = title;
    onClickCallback(priceArea);
  }

  return (
    <>
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
