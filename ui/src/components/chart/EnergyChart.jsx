import { PieChart } from "@mui/x-charts/PieChart";
import "./EnergyChart.css";
import { LegendItem } from "./LegendItem";
export default function EnergyChart({ energyMix }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PieChart
        height={200}
        series={[
          {
            valueFormatter: (item) => `${item.value.toFixed(2)}%`,
            data: [...energyMix],
            cx: 122,
            cy: 100,
            innerRadius: 30,
            outerRadius: 70,
            paddingAngle: 5,
            cornerRadius: 2,
            startAngle: -95,
            endAngle: 225,
          },
        ]}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
      <div className="legend__container">
        {energyMix.map((type) => (
          <LegendItem
            key={type.label}
            label={type.label}
            color={type.color}
          ></LegendItem>
        ))}
      </div>
    </div>
  );
}
