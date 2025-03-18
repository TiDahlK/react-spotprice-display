import { LineChart } from "@mui/x-charts/LineChart"; // Import LineChart from MUI X Charts
import "./SpotPriceChart.css";

export default function SpotPriceChart({ timeSeries }) {
  function findMinMax(data) {
    return data.reduce(
      (acc, entry) => {
        const { value } = entry;

        if (value < acc.min) {
          acc.min = entry.value;
          return acc;
        }
        if (value > acc.max) {
          acc.max = entry.value;
          return acc;
        }

        return acc;
      },
      { min: data[0].value, max: data[0].value }
    );
  }
  const { min, max } = findMinMax(timeSeries);
  const colorMap =
    max < 20
      ? null
      : {
          type: "continuous",
          min,
          max,
          color: ["#739E82", "#B24342"],
        };
  return (
    <div className="chart-container">
      <LineChart
        dataset={[...timeSeries]}
        grid={{ vertical: true, horizontal: true }}
        xAxis={[
          {
            id: "hours",
            dataKey: "time",
            max: 23,
            valueFormatter: (time, context) => {
              const timeLabel = `${time.toString().padStart(2, "0")}:00`;
              return context.location === "tick"
                ? timeLabel
                : `Klockan: ${timeLabel}`;
            },
          },
        ]}
        series={[
          {
            dataKey: "value",
            valueFormatter: (value) => `${value} öre/kWh`,
            area: true,
            color: "#739E82",
          },
        ]}
        yAxis={[
          {
            colorMap,
          },
        ]}
      />
    </div>
  );
}
