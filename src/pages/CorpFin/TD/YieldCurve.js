// YieldCurve.js
import React from "react";

const YieldCurve = ({ data, width = 500, height = 250, padding = 40 }) => {
  const maturities = data.map(d => d.maturity);
  const yields = data.map(d => d.yield);

  const minX = Math.min(...maturities);
  const maxX = Math.max(...maturities);
  const minY = 0;
  const maxY = Math.max(...yields);

  // Scales
  const scaleX = x =>
    padding + ((x - minX) / (maxX - minX)) * (width - padding * 2);

  const scaleY = y =>
    height - padding - ((y - minY) / (maxY - minY)) * (height - padding * 2);

  // SVG path
  const pathD =
    "M " +
    data
      .map(d => `${scaleX(d.maturity)},${scaleY(d.yield)}`)
      .join(" L ");

  return (
    <svg width={width} height={height}>
      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="#333"
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="#333"
      />

      {/* Axis Labels */}
      <text
        x={width / 2}
        y={height - 10}
        textAnchor="middle"
        fontSize={12}
        fill="#333"
      >
        Maturity (Years)
      </text>
      <text
        x={-height / 2}
        y={15}
        transform="rotate(-90)"
        textAnchor="middle"
        fontSize={12}
        fill="#333"
      >
        Yield (%)
      </text>

      {/* Yield curve path */}
      <path d={pathD} fill="none" stroke="#0b6efd" strokeWidth={3} />

      {/* Points */}
      {data.map((d, i) => (
        <circle
          key={i}
          cx={scaleX(d.maturity)}
          cy={scaleY(d.yield)}
          r={4}
          fill="#0b6efd"
        />
      ))}
    </svg>
  );
};

export default YieldCurve;
