import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const PriceGraph = ({ K, r, sigma, S0 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const width = 600, height = 400;
    const n = 365;  // Number of time steps
    const dt = 1 / n;  // Time step size
    const T = 1;  // Total time
    const mu = 0;

    // Black-Scholes Formula for European Call
    function blackScholesCall(S, K, r, sigma, T) {
      if (T <= 0) return Math.max(S - K, 0); // Expired option
      const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
      const d2 = d1 - sigma * Math.sqrt(T);
      return S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
    }

    // Cumulative Normal Distribution Function
    function normCDF(x) {
      return (1 + erf(x / Math.sqrt(2))) / 2;
    }

    // Error Function Approximation
    function erf(x) {
      const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
      const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
      const sign = x < 0 ? -1 : 1;
      const t = 1 / (1 + p * Math.abs(x));
      return sign * (1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)));
    }

    // Simulate GBM path
    let S = [S0];
    let P = [blackScholesCall(S0, K, r, sigma, T)];
    for (let t = 1; t < n; t++) {
      const dW = Math.sqrt(dt) * d3.randomNormal(0, 1)();
      const St = S[S.length - 1] * Math.exp((mu - 0.5 * sigma ** 2) * dt + sigma * dW);
      S.push(St);
      P.push(blackScholesCall(St, K, r, sigma, T - t*dt));
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
    // svg.append("g").attr("transform", `translate(0, ${height - shift})`).call(d3.axisBottom(xScale));
    svg.append("g")
      .attr("transform", `translate(0, ${height - shift})`)
      .call(d3.axisBottom(xScale).tickFormat(d => 365 - d));
    svg.append("g").attr("transform", `translate(${shift},0)`).call(d3.axisLeft(yScale));

    // label axis
    svg.append("text")     
        .attr("x", 310 )
        .attr("y", 385 )
        .style("text-anchor", "middle")
        .text("Days to Expiration");
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("x", -180)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Price");

    // line labels/title
    svg.append("line")          
      .style("stroke", "steelblue")
      .attr("stroke-width", 2) 
      .attr("x1", 150)     
      .attr("y1", 20)     
      .attr("x2", 165) 
      .attr("y2", 20);
    svg.append("line")          
      .style("stroke", "green") 
      .attr("stroke-width", 2)
      .attr("x1", 300)     
      .attr("y1", 20)     
      .attr("x2", 315) 
      .attr("y2", 20);
    svg.append("text")
      .attr("x", 170)
      .attr("y", 20)
      .text("Stock Price")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")
    svg.append("text")
      .attr("x", 320)
      .attr("y", 20)
      .text("Call Option Price")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")

    // Draw line (extends beyond axis limits if needed)
    svg.append("path")
      .datum(S)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
    svg.append("path")
      .datum(P)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

  }, [K, r, sigma, S0]); // Recalculate when sliders change

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default PriceGraph;
