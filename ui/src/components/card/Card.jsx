import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LineChart } from "@mui/x-charts/LineChart"; // Import LineChart from MUI X Charts

import "./Card.css";
import EnergyChart from "../chart/EnergyChart";

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
  function handleClick() {
    onClickCallback(priceArea);
  }

  function expandedCard() {
    return (
      <div className="card__container card__container-expanded">
        <button className="close-button" onClick={handleClick}>
          <FontAwesomeIcon icon="fa-solid fa-x fa-align-center" size="lg" />
        </button>
        <h2>
          <FontAwesomeIcon icon="fa-solid fa-bolt fa-align-center" />{" "}
          {priceArea} - {average.price}
        </h2>
        <div className="chart-container">
          <LineChart
            dataset={[...timeSeries]}
            grid={{ vertical: true, horizontal: true }}
            xAxis={[
              {
                id: "hours",
                dataKey: "time",
                valueFormatter: (time) =>
                  `${time.toString().padStart(2, "0")}:00`,
              },
            ]}
            series={[
              {
                dataKey: "value",
                valueFormatter: (value) => `${value} öre/kWh`,
                area: true,
                color: "#3D6653",
              },
            ]}
          />
        </div>
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
