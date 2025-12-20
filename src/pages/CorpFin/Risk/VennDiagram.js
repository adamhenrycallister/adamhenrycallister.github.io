import React from "react";

const VennDiagram = ({
  a = 0.4,
  b = 0.3,
  overlap = 0.1,
}) => {
  return (
    <svg width="300" height="200" viewBox="0 0 300 200">
      {/* Circle A */}
      <circle
        cx="120"
        cy="100"
        r="70"
        fill="rgba(255, 99, 132, 0.5)"
      />

      {/* Circle B */}
      <circle
        cx="180"
        cy="100"
        r="70"
        fill="rgba(54, 162, 235, 0.5)"
      />

      {/* Labels */}
      <text x="80" y="100" textAnchor="middle" fontSize="14">
        Pr(A)
      </text>

      <text x="220" y="100" textAnchor="middle" fontSize="14">
        Pr(B)
      </text>

      <text x="150" y="100" textAnchor="middle" fontSize="14">
        Pr(A ∩ B)
      </text>
    </svg>
  );
};

export default VennDiagram;
