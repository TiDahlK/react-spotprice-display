import "./LegendItem.css";
export const LegendItem = ({ color, label }) => {
  return (
    <div className="legend-item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle
          cx="9"
          cy="9"
          r="8"
          fill={color}
          stroke="#8c8c8c"
          strokeWidth="1"
        />
      </svg>
      <span role="tooltip">{label}</span>
    </div>
  );
};
