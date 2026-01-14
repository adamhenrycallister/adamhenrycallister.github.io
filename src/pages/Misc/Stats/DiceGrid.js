import React, { useState } from "react";

const pipPositions = {
  1: [[0.5, 0.5]],
  2: [[0.25, 0.25], [0.75, 0.75]],
  3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
  4: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]],
  5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
  6: [
    [0.25, 0.25], [0.25, 0.5], [0.25, 0.75],
    [0.75, 0.25], [0.75, 0.5], [0.75, 0.75]
  ],
};

const Die = ({ value, x, y, size, highlighted }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect
      width={size}
      height={size}
      rx={6}
      ry={6}
      fill={highlighted ? "#ffe08a" : "white"}
      stroke="black"
      strokeWidth={highlighted ? 2 : 1}
    />
    {pipPositions[value].map(([px, py], i) => (
      <circle
        key={i}
        cx={px * size}
        cy={py * size}
        r={size * 0.07}
        fill="black"
      />
    ))}
  </g>
);

const DiceGrid = () => {
  const [activeSum, setActiveSum] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const dieSize = 30;
  const padding = 10;
  const cellWidth = dieSize * 2 + padding * 3;
  const cellHeight = dieSize + padding * 2;

  const handleMouseEnter = (sum, event) => {
    setActiveSum(sum);
    setTooltip({
      x: event.clientX,
      y: event.clientY,
      sum,
    });
  };

  const handleMouseLeave = () => {
    setActiveSum(null);
    setTooltip(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        width={cellWidth * 6}
        height={cellHeight * 6}
      >
        {[1, 2, 3, 4, 5, 6].map((d1, row) =>
          [1, 2, 3, 4, 5, 6].map((d2, col) => {
            const sum = d1 + d2;
            const highlighted = activeSum === sum;

            const x = col * cellWidth;
            const y = row * cellHeight;

            return (
              <g
                key={`${d1}-${d2}`}
                transform={`translate(${x}, ${y})`}
                onMouseEnter={(e) => handleMouseEnter(sum, e)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "pointer" }}
              >
                <Die
                  value={d1}
                  x={padding}
                  y={padding}
                  size={dieSize}
                  highlighted={highlighted}
                />
                <Die
                  value={d2}
                  x={padding * 2 + dieSize}
                  y={padding}
                  size={dieSize}
                  highlighted={highlighted}
                />
              </g>
            );
          })
        )}
      </svg>

      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 12,
            top: tooltip.y + 12,
            background: "rgba(0,0,0,0.75)",
            color: "white",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            pointerEvents: "none",
          }}
        >
          Sum = {tooltip.sum}
        </div>
      )}
    </div>
  );
};

export default DiceGrid;
