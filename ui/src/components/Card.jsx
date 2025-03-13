import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Card.css";

function Card({ priceArea, high, low, average }) {
  return (
    <>
      <div>
        <div className="card__container">
          <h2>
            <FontAwesomeIcon icon="fa-solid fa-bolt fa-align-center" />{" "}
            {priceArea} - {average.price}
          </h2>
          <div className="card__section">
            <h3>
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-up fa-align-center" />
              Högst - {high.price} - {high.timespan}
            </h3>
            <h3>
              <FontAwesomeIcon icon="fa-solid fa-circle-arrow-down" />
              Lägst - {low.price} - {low.timespan}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
