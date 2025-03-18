import { LineChart } from "@mui/x-charts/LineChart"; // Import LineChart from MUI X Charts
import "./SpotPriceChart.css";

export default function SpotPriceChart({ timeSeries }) {
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
            valueFormatter: (time) => `${time.toString().padStart(2, "0")}:00`,
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
  );
}
