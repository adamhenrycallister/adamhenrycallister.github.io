import React from "react";

const DicePMF = () => {
  // Sum probabilities for two dice
  const sums = [
    { sum: 2, count: 1 },
    { sum: 3, count: 2 },
    { sum: 4, count: 3 },
    { sum: 5, count: 4 },
    { sum: 6, count: 5 },
    { sum: 7, count: 6 },
    { sum: 8, count: 5 },
    { sum: 9, count: 4 },
    { sum: 10, count: 3 },
    { sum: 11, count: 2 },
    { sum: 12, count: 1 },
  ];

  const maxCount = 6;
  const svgWidth = 500;
  const svgHeight = 300;
  const xOffset = 60;
  const barWidth = svgWidth / (sums.length+1) - 13;

  return (
    <div style={{ position: "relative" }}>
    <svg width={svgWidth} height={svgHeight}>
      {/* Bars */}
      {sums.map((s, i) => {
        const barHeight = (s.count / maxCount) * (svgHeight - 50);
        const x = i * (barWidth + 10) + xOffset + 10;
        const y = svgHeight - barHeight - 40;

        return (
          <rect
            key={s.sum}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill="#69b3a2"
          />
        );
      })}

      {/* X-axis */}
      <line
        x1={xOffset}
        y1={svgHeight - 40}
        x2={svgWidth}
        y2={svgHeight - 40}
        stroke="black"
        strokeWidth={2}
      />

      {/* Y-axis */}
      <line
        x1={xOffset}
        y1={10}
        x2={xOffset}
        y2={svgHeight - 40}
        stroke="black"
        strokeWidth={2}
      />

      {/* Y-axis ticks and labels */}
      {[1, 2, 3, 4, 5, 6].map(i => {
        const y = svgHeight - 40 - (i / maxCount) * (svgHeight - 50);
        return (
          <g key={i}>
            <line x1={xOffset-5} x2={xOffset} y1={y} y2={y} stroke="black" />
            <text x={xOffset-10} y={y + 4} fontSize="12" textAnchor="end">
              {i}/36
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {sums.map((s, i) => {
        const x = i * (barWidth + 10) + 10 + xOffset + barWidth / 2;
        return (
          <text
            key={s.sum}
            x={x}
            y={svgHeight - 25}
            textAnchor="middle"
            fontSize="12"
          >
            {s.sum}
          </text>
        );
      })}

      {/* Axis labels */}
      <text
        x={svgWidth / 2 + 30}
        y={svgHeight - 5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
      >
        Sum of Two Dice
      </text>

      <text
        x={45}
        y={svgHeight / 2}
        transform={`rotate(-90, 15, ${svgHeight / 2})`}
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
      >
        Probability
      </text>
    </svg>
    </div>
  );
};

export default DicePMF;
