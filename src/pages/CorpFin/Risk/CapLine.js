import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

const width = 700;
const height = 450;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };

export default function CapLine() {
  const svgRef = useRef();

  const [asset1, setAsset1] = useState({ mu: 0.09, sigma: 0.32 });
  const [asset2, setAsset2] = useState({ mu: 0.05, sigma: 0.23 });
  const [correlation, setCorrelation] = useState(-0.2);

  // Risk-free rate
  const [riskFree, setRiskFree] = useState(0.03);

  // Scales
  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 0.4])
        .range([margin.left, width - margin.right]),
    []
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 0.15])
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

  // Efficient frontier
  const frontier = useMemo(() => {
    const steps = 150;

    return d3.range(steps + 1).map(i => {
      const w = i / steps;

      const mu = w * asset1.mu + (1 - w) * asset2.mu;

      const variance =
        w ** 2 * asset1.sigma ** 2 +
        (1 - w) ** 2 * asset2.sigma ** 2 +
        2 * w * (1 - w) * correlation * asset1.sigma * asset2.sigma;

      return {
        mu,
        sigma: Math.sqrt(Math.max(0, variance)),
      };
    });
  }, [asset1, asset2, correlation]);

  // Tangency portfolio (max Sharpe)
  const tangency = useMemo(() => {
    return frontier.reduce(
      (best, p) => {
        if (p.sigma === 0) return best;
        const sharpe = (p.mu - riskFree) / p.sigma;
        return sharpe > best.sharpe
          ? { ...p, sharpe }
          : best;
      },
      { sharpe: -Infinity }
    );
  }, [frontier, riskFree]);

  // Capital Market Line
  const cml = useMemo(() => {
    if (!tangency.sigma) return [];

    const maxSigma = xScale.domain()[1];

    return [
      { sigma: 0, mu: riskFree },
      {
        sigma: maxSigma,
        mu:
          riskFree +
          ((tangency.mu - riskFree) / tangency.sigma) * maxSigma,
      },
    ];
  }, [tangency, riskFree, xScale]);

  const clamp = (min, max, value) =>
    Math.min(max, Math.max(min, value));

  // Drag behavior for risky assets
  const makeDrag = setter =>
    d3.drag().on("drag", event => {
      const [xMin, xMax] = xScale.domain();
      const [yMin, yMax] = yScale.domain();

      setter({
        sigma: clamp(xMin, xMax, xScale.invert(event.x)),
        mu: clamp(yMin, yMax, yScale.invert(event.y)),
      });
    });

  // Drag for risk-free rate (vertical only)
  const makeRfDrag = () =>
    d3.drag().on("drag", event => {
      const [yMin, yMax] = yScale.domain();
      setRiskFree(clamp(yMin, yMax, yScale.invert(event.y)));
    });

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}>
        {/* Axes */}
        <g className="x-axis" />
        <g className="y-axis" />

        {/* Labels */}
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

        {/* Efficient frontier */}
        <path
          d={d3
            .line()
            .x(d => xScale(d.sigma))
            .y(d => yScale(d.mu))(frontier)}
          fill="none"
          stroke="steelblue"
          strokeWidth={2}
        />

        {/* Capital Market Line */}
        <path
          d={d3
            .line()
            .x(d => xScale(d.sigma))
            .y(d => yScale(d.mu))(cml)}
          fill="none"
          stroke="green"
          strokeWidth={2}
          strokeDasharray="6,4"
        />

        {/* Risk-free asset */}
        <circle
          ref={node => {
            if (node) d3.select(node).call(makeRfDrag());
          }}
          cx={xScale(0)}
          cy={yScale(riskFree)}
          r={7}
          fill="black"
        />
        <text x={xScale(0) + 10} y={yScale(riskFree)} fontSize={11}>
          Risk-free
        </text>

        {/* Asset 1 */}
        <circle
          ref={node => {
            if (node) d3.select(node).call(makeDrag(setAsset1));
          }}
          cx={xScale(asset1.sigma)}
          cy={yScale(asset1.mu)}
          r={7}
          fill="tomato"
        />
        <text x={xScale(asset1.sigma) + 10} y={yScale(asset1.mu)} fontSize={11}>
          Asset 1
        </text>

        {/* Asset 2 */}
        <circle
          ref={node => {
            if (node) d3.select(node).call(makeDrag(setAsset2));
          }}
          cx={xScale(asset2.sigma)}
          cy={yScale(asset2.mu)}
          r={7}
          fill="orange"
        />
        <text x={xScale(asset2.sigma) + 10} y={yScale(asset2.mu)} fontSize={11}>
          Asset 2
        </text>

        {/* Tangency portfolio */}
        {tangency.sigma && (
          <>
            <circle
              cx={xScale(tangency.sigma)}
              cy={yScale(tangency.mu)}
              r={6}
              fill="green"
            />
            <text
              x={xScale(tangency.sigma) -55}
              y={yScale(tangency.mu)}
              fontSize={11}
            >
              Tangency
            </text>
          </>
        )}

      </svg>

      {/* Controls */}
      <div style={{ marginTop: 10 }}>
        <label>
          Correlation: <strong>{correlation.toFixed(2)}</strong>
        </label>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={correlation}
          onChange={e => setCorrelation(+e.target.value)}
          style={{ width: 300, marginLeft: 10 }}
        />
      </div>
    </div>
  );
}
