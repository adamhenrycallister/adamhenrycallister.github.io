import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

const width = 700;
const height = 450;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };

export default function TwoStockCombinations() {
  const svgRef = useRef();

  const [asset1, setAsset1] = useState({ mu: 0.1, sigma: 0.15 });
  const [asset2, setAsset2] = useState({ mu: 0.06, sigma: 0.1 });
  const [correlation, setCorrelation] = useState(-0.2);

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

  // Compute feasible set
  const frontier = useMemo(() => {
    const steps = 100;
    return d3.range(steps + 1).map(i => {
      const w = i / steps;

      const mu =
        w * asset1.mu + (1 - w) * asset2.mu;

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

  const clamp = (min, max, value) =>
    Math.min(max, Math.max(min, value));

  // Drag behavior factory
  const makeDrag = setter =>
    d3.drag().on("drag", event => {
      const [xMin, xMax] = xScale.domain();
      const [yMin, yMax] = yScale.domain();

      const newSigma = clamp(xMin, xMax, xScale.invert(event.x));
      const newMu = clamp(yMin, yMax, yScale.invert(event.y));

      setter({
        sigma: newSigma,
        mu: newMu,
      });
    });



  return (
    <div>
      <svg ref={svgRef} width={width} height={height}>
        {/* Axes */}
        <g className="x-axis" />
        <g className="y-axis" />

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize={12}
        >
          Standard Deviation (Risk)
        </text>

        <text
          transform={`rotate(-90)`}
          x={-height / 2}
          y={15}
          textAnchor="middle"
          fontSize={12}
        >
          Mean Return
        </text>

        {/* Feasible set */}
        <path
          d={d3
            .line()
            .x(d => xScale(d.sigma))
            .y(d => yScale(d.mu))
            .curve(d3.curveMonotoneX)(frontier)}
          fill="none"
          stroke="steelblue"
          strokeWidth={2}
        />

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
        <text
          x={xScale(asset1.sigma) + 10}
          y={yScale(asset1.mu)}
          fontSize={11}
        >
          Stock Y
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
        <text
          x={xScale(asset2.sigma) + 10}
          y={yScale(asset2.mu)}
          fontSize={11}
        >
          Stock Z
        </text>
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
