import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Card.css";
import EnergyChart from "../chart/EnergyChart";

function Card({ priceArea, high, low, average, energyMix }) {
  return (
    <>
      <div className="card__container">
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
    </>
  );
}

export default Card;
