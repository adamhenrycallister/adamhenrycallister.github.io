import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const ContinuousCompounding = ({r, n}) => {
  const X0 = 10;
  const svgRef = useRef();

  const width = 500, height = 300, margin = 50;
  const periods = 30; // Number of time periods (years)

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawings

    // Generate data points
    const timePoints = d3.range(0, periods + 1);
    const discreteData = timePoints.map(t => ({
      time: t,
      value: X0 * Math.pow(1 + r / n, n * t),
    }));
    const continuousData = timePoints.map(t => ({
      time: t,
      value: X0 * Math.exp(r * t),
    }));

    // Scales
    const xScale = d3.scaleLinear().domain([0, periods]).range([margin, width - margin]);
    const yMax = Math.max(...discreteData.map(d => d.value), ...continuousData.map(d => d.value));
    const yScale = d3.scaleLinear().domain([X0, yMax]).range([height - margin, margin]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", `translate(0,${height - margin})`).call(xAxis);
    svg.append("g").attr("transform", `translate(${margin},0)`).call(yAxis);

    // Line generators
    const lineGenerator = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw discrete compounding line
    svg.append("path")
      .datum(discreteData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    // Draw continuous compounding line
    svg.append("path")
      .datum(continuousData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5") // Dashed for continuous
      .attr("d", lineGenerator);

    // Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Time Period");

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Investment Value");

    // line labels/title
    svg.append("line")          
      .style("stroke", "red")
      .attr("stroke-width", 2) 
      .attr("stroke-dasharray", "5,5") 
      .attr("x1", 150)     
      .attr("y1", 20)     
      .attr("x2", 165) 
      .attr("y2", 20);
    svg.append("line")          
      .style("stroke", "steelblue") 
      .attr("stroke-width", 2)
      .attr("x1", 150)     
      .attr("y1", 40)     
      .attr("x2", 165) 
      .attr("y2", 40);
    svg.append("text")
      .attr("x", 170)
      .attr("y", 20)
      .text("Continuous Compounding")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")
    svg.append("text")
      .attr("x", 170)
      .attr("y", 40)
      .text("Compounding n Times Per Period")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")

  }, [r, n]);

  return <svg ref={svgRef} width={width} height={height}></svg>;;
};

export default ContinuousCompounding;
