import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GBMChart = ({ mu, sigma, S0 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const width = 600, height = 400;
    const n = 100;  // Number of time steps
    const dt = 1 / n;  // Time step size
    const T = 1;  // Total time

    // Simulate GBM path
    let S = [S0];
    for (let t = 1; t < n; t++) {
      const dW = Math.sqrt(dt) * d3.randomNormal(0, 1)();
      const St = S[S.length - 1] * Math.exp((mu - 0.5 * sigma ** 2) * dt + sigma * dW);
      S.push(St);
    }

    // Fixed Y-axis range (for the axis, not the line)
    const yMin = 0, yMax = 250;
    const shift = 50;

    // Scales
    const xScale = d3.scaleLinear().domain([0, n - 1]).range([shift, width - shift]);
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height - shift, shift]);

    // Line generator (without clipping values)
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d)) // Allow values outside [yMin, yMax]
      .curve(d3.curveBasis);

    // Draw axis
    svg.append("g").attr("transform", `translate(0, ${height - shift})`).call(d3.axisBottom(xScale));
    svg.append("g").attr("transform", `translate(${shift},0)`).call(d3.axisLeft(yScale));

    // label axis
    svg.append("text")     
        .attr("x", 310 )
        .attr("y", 385 )
        .style("text-anchor", "middle")
        .text("t");
    svg.append("text")      
        .attr("x", 15)
        .attr("y", 210 )
        .style("text-anchor", "middle")
        .text("X");

    // Title
    svg.append("text")     
        .attr("x", 310 )
        .attr("y", 25 )
        .style("text-anchor", "middle")
        .text("Geometric Brownian Motion");

    // Draw line (extends beyond axis limits if needed)
    svg.append("path")
      .datum(S)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

  }, [mu, sigma, S0]); // Recalculate when sliders change

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default GBMChart;
