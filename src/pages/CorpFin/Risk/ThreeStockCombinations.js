import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

const width = 700;
const height = 450;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };

// Clamp helper
const clamp = (min, max, v) => Math.min(max, Math.max(min, v));

// Correlation feasibility bounds
function minRho(r12, r13) {
  return r12 * r13 - Math.sqrt((1 - r12 ** 2) * (1 - r13 ** 2));
}
function maxRho(r12, r13) {
  return r12 * r13 + Math.sqrt((1 - r12 ** 2) * (1 - r13 ** 2));
}

// Sample simplex of weights
function sampleWeights(steps = 25) {
  const weights = [];
  for (let i = 0; i <= steps; i++) {
    for (let j = 0; j <= steps - i; j++) {
      const w1 = i / steps;
      const w2 = j / steps;
      const w3 = 1 - w1 - w2;
      weights.push([w1, w2, w3]);
    }
  }
  return weights;
}

function corrDeterminant(r12, r13, r23) {
  return (
    1 +
    2 * r12 * r13 * r23 -
    r12 * r12 -
    r13 * r13 -
    r23 * r23
  );
}

export default function ThreeAssetCombinations() {
  const svgRef = useRef();

  // Assets
  const [a1, setA1] = useState({ mu: 0.10, sigma: 0.15 });
  const [a2, setA2] = useState({ mu: 0.06, sigma: 0.10 });
  const [a3, setA3] = useState({ mu: 0.14, sigma: 0.20 });

  // Correlations
  const [r12, setR12] = useState(0.2);
  const [r13, setR13] = useState(-0.1);
  const [r23Raw, setR23Raw] = useState(0.0);

  // Enforce feasibility of r23
  const r23Min = minRho(r12, r13);
  const r23Max = maxRho(r12, r13);
  const r23 = clamp(r23Min, r23Max, r23Raw);

  const steps = 20;


  useEffect(() => {
    if (r23Raw !== r23) {
      setR23Raw(r23); // Snap the slider back into feasible range
    }
  }, [r23, r23Raw]);


  // Scales
  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 0.45])
        .range([margin.left, width - margin.right]),
    []
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 0.18])
        .range([height - margin.bottom, margin.top]),
    []
  );

  // Axes
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  }, [xScale, yScale]);

  const weights = useMemo(() => sampleWeights(steps), [steps]);

  const feasibleSigma = useMemo(() => {
    return weights.map(([w1, w2, w3]) => {
      const variance =
        w1 * w1 * a1.sigma ** 2 +
        w2 * w2 * a2.sigma ** 2 +
        w3 * w3 * a3.sigma ** 2 +
        2 * w1 * w2 * r12 * a1.sigma * a2.sigma +
        2 * w1 * w3 * r13 * a1.sigma * a3.sigma +
        2 * w2 * w3 * r23 * a2.sigma * a3.sigma;

      return Math.sqrt(Math.max(0, variance));
    });
  }, [weights, a1.sigma, a2.sigma, a3.sigma, r12, r13, r23]);

  const feasibleMu = useMemo(() => {
    return weights.map(([w1, w2, w3]) =>
      w1 * a1.mu + w2 * a2.mu + w3 * a3.mu
    );
  }, [weights, a1.mu, a2.mu, a3.mu]);

  const pts = useMemo(
    () =>
      feasibleSigma.map((s, i) => [
        xScale(s),
        yScale(feasibleMu[i])
      ]),
    [feasibleSigma, feasibleMu, xScale, yScale]
  );

  // Feasible portfolio set
  const geometryKey = useMemo(
    () => [
      a1.sigma, a2.sigma, a3.sigma,
      r12, r13, r23
    ].map(v => v.toFixed(4)).join("|"),
    [a1.sigma, a2.sigma, a3.sigma, r12, r13, r23]
  );

  const hullPath = useMemo(() => {
    if (pts.length < 3) return null;

    const hull = d3.polygonHull(pts);
    if (!hull) return null;

    return (
      "M" +
      hull.map(p => `${p[0]},${p[1]}`).join("L") +
      "Z"
    );
  }, [pts, geometryKey]);

  // Drag behavior
  const makeDrag = setter => {
    let raf = null;

    return d3.drag().on("drag", event => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        setter({
          sigma: clamp(...xScale.domain(), xScale.invert(event.x)),
          mu: clamp(...yScale.domain(), yScale.invert(event.y))
        });
        raf = null;
      });
    });
  };


  return (
    <div>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />

        {/* Axis labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize={12}>
          Standard Deviation (Risk)
        </text>
        <text
          transform="rotate(-90)"
          x={-height / 2}
          y={15}
          textAnchor="middle"
          fontSize={12}
        >
          Mean Return
        </text>

        {hullPath && (
          <path
            d={hullPath}
            fill="steelblue"
            opacity={0.25}
          />
        )}

        {/* Asset 1 */}
        <circle
          ref={n => n && d3.select(n).call(makeDrag(setA1))}
          cx={xScale(a1.sigma)}
          cy={yScale(a1.mu)}
          r={7}
          fill="tomato"
        />
        <text x={xScale(a1.sigma) + 10} y={yScale(a1.mu)} fontSize={11}>
          Asset 1
        </text>

        {/* Asset 2 */}
        <circle
          ref={n => n && d3.select(n).call(makeDrag(setA2))}
          cx={xScale(a2.sigma)}
          cy={yScale(a2.mu)}
          r={7}
          fill="orange"
        />
        <text x={xScale(a2.sigma) + 10} y={yScale(a2.mu)} fontSize={11}>
          Asset 2
        </text>

        {/* Asset 3 */}
        <circle
          ref={n => n && d3.select(n).call(makeDrag(setA3))}
          cx={xScale(a3.sigma)}
          cy={yScale(a3.mu)}
          r={7}
          fill="purple"
        />
        <text x={xScale(a3.sigma) + 10} y={yScale(a3.mu)} fontSize={11}>
          Asset 3
        </text>
      </svg>

      {/* Controls */}
      <div style={{ marginTop: 10 }}>
        <div style={{display: "flex", justifyContent: "space-between", width: 380}}>
          <label>ρ₁₂: <strong>{r12.toFixed(2)}</strong></label>
          <input type="range" min={-1} max={1} step={0.01}
            value={r12} onChange={e => setR12(+e.target.value)} 
            style={{ width: 300, marginLeft: 10 }}
          />
        </div>

        <div style={{display: "flex", justifyContent: "space-between", width: 380}}>
          <label>ρ₁₃: <strong>{r13.toFixed(2)}</strong></label>
          <input type="range" min={-1} max={1} step={0.01}
            value={r13} onChange={e => setR13(+e.target.value)} 
            style={{ width: 300, marginLeft: 10 }}
          />
        </div>

        <div style={{display: "flex", justifyContent: "space-between", width: 380}}>
          <label>ρ₂₃: <strong>{r23.toFixed(2)}</strong></label>
          <input type="range"
            min={-1}
            max={1}
            step={0.01}
            value={r23Raw}
            onChange={e => setR23Raw(+e.target.value)}
            style={{ width: 300, marginLeft: 10 }}
          />
        </div>
      </div>
    </div>
  );
}
