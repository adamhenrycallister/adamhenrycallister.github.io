import React from "react";

const HEX_SIZE = 40;
// Pointy-topped math
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = 2 * HEX_SIZE;

const hexPoints = (cx, cy, size) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    // Subtract 30 degrees (PI/6) to make it pointy-topped if using 0, 60... 
    // Or use the current 0, 60... but adjust the spacing math.
    // Standard pointy-topped orientation:
    const angle = (Math.PI / 180) * (60 * i - 30);
    points.push([
      cx + size * Math.cos(angle),
      cy + size * Math.sin(angle),
    ]);
  }
  return points.map(p => p.join(",")).join(" ");
};

const SettlementMarker = ({ x, y, type }) => {
  if (type === "x") {
    return (
      <g stroke="red" strokeWidth={3}>
        <line x1={x - 10} y1={y - 10} x2={x + 10} y2={y + 10} />
        <line x1={x + 10} y1={y - 10} x2={x - 10} y2={y + 10} />
      </g>
    );
  }
  return (
    <circle cx={x} cy={y} r={10} fill="none" stroke="blue" strokeWidth={3} />
  );
};

const CatanBoard = ({ numbers = [], settlements = [] }) => {
  const rows = [3, 4, 5, 4, 3];
  const tiles = [];

  let index = 0;
  const centerY = 250;
  const centerX = 300;

  rows.forEach((count, row) => {
    // Vertical spacing for pointy-topped is 3/4 of HEX_HEIGHT
    const rowY = centerY + (row - 2) * (HEX_SIZE * 1.5);
    
    // Horizontal start needs to center the row
    // We offset each hexagon by HEX_WIDTH
    const rowStartX = centerX - ((count - 1) * HEX_WIDTH) / 2;

    for (let i = 0; i < count; i++) {
      tiles.push({
        index,
        x: rowStartX + i * HEX_WIDTH,
        y: rowY,
        number: numbers[index],
      });
      index++;
    }
  });

  return (
    <svg width={600} height={500} viewBox="0 0 600 500">
      {tiles.map(tile => (
        <g key={tile.index}>
          <polygon
            points={hexPoints(tile.x, tile.y, HEX_SIZE)}
            fill="#f5deb3"
            stroke="#444"
            strokeWidth={2}
          />
          {tile.number && (
            <g>
              <circle
                cx={tile.x}
                cy={tile.y}
                r={14}
                // Changed: Always use #eee, or change text color instead of background
                fill="#eee" 
                stroke="#333"
              />
              <text
                x={tile.x}
                y={tile.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                // Optional: Make the text itself red for 6 and 8 (traditional Catan)
                fill="black"
              >
                {tile.number}
              </text>
            </g>
          )}
        </g>
      ))}

      {settlements.map((s, i) => {
        const tile = tiles[s.tile];
        if (!tile) return null;
        return (
          <SettlementMarker
            key={i}
            x={tile.x}
            y={tile.y - HEX_SIZE} // Placed on the top vertex
            type={s.type}
          />
        );
      })}
    </svg>
  );
};

export default CatanBoard;