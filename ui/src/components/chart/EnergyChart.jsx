import { PieChart } from "@mui/x-charts/PieChart";
import "./EnergyChart.css";
export default function EnergyChart({ energyMix }) {
  return (
    <div style={{ width: "100%", height: "200px" }}>
      <PieChart
        series={[
          {
            data: [...energyMix],
          },
        ]}
        margin={{
          left: 0,
          right: 250,
        }}
      />
    </div>
  );
}
