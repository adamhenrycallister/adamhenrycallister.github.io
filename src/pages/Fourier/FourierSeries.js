import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const FourierSeries = ({N, graph}) => {
  const svgRef = useRef();

  useEffect(() => {
      const width = 600, height = 400;
      const margin = 50;
      const T = 2;  // Period
      const b = 1;  // Amplitude
      const bs = 1;  // Amplitude Saw
      const bt = 2;  // Amplitude Triangle
      const xMin = -4, xMax = 4;  // X-axis range

      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .style("overflow", "visible");
      svg.selectAll("*").remove();

      const xScale = d3.scaleLinear().domain([xMin, xMax]).range([margin, width - margin]);
      const yScale = d3.scaleLinear().domain([-b - .5, b + .5]).range([height - margin, margin]);

      // Draw Axes
      const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat("");
      const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat("");

      svg.append("g")
        .attr("transform", `translate(0,${yScale(0)})`)
        .call(xAxis);

      svg.append("g")
        .attr("transform", `translate(${xScale(0)},0)`)
        .call(yAxis);

      // Function to compute Fourier series: Box
      function fourierSeriesBox(x, N, T, b) {
        let result = 0;
        for (let n = 1; n <= N; n++) {
          result += Math.sin((2 * Math.PI * (2 * n - 1) * x) / T) / (2 * n - 1);
        }
        return (b * result * 4) / Math.PI;
      }

      // Function to compute Fourier series: Saw
      function fourierSeriesSaw(x, N, T, b) {
        let result = 0;
        for (let n = 1; n <= N; n++) {
          result += Math.pow(-1,n-1) * Math.sin((2 * Math.PI * n * x) / T) / n ;
        }
        return (bs * T * result) / Math.PI;
      }

      // Function to compute Fourier series: Triangle
      function fourierSeriesTriangle(x, N, T, b) {
        let result = 0;
        for (let n = 1; n <= N; n++) {
          result += Math.cos((2 * Math.PI * (2 * n - 1) * x) / T) / Math.pow(2 * n - 1, 2);
        }
        return (b * T* result * 2) / Math.pow(Math.PI, 2);
      }

      const stepData = [];
      const approxData = [];

      if (`${graph}` === "box") {
        // Generate periodic box function data
        for (let x = xMin; x <= xMax; x += 0.01) {
          const modX = ((x % T) + T) % T;  // Ensure periodicity
          const yValue = modX < T / 2 ? b : -b;
          stepData.push({ x, y: yValue });
        }

        // Generate approximation data
        for (let x = xMin; x <= xMax; x += 0.01) {
          approxData.push({ x, y: fourierSeriesBox(x, N, T, b) });
        }
      }

      if (`${graph}` === "saw") {
        // Generate periodic box function data
        for (let x = xMin; x <= xMax; x += 0.01) {
          const normalizedX = (((x-T/2) % T) + T) % T;  // Normalize x to the range [0, T)
          const yValue =  bs * (normalizedX - T / 2);
          stepData.push({ x, y: yValue });
        }

        // Generate approximation data
        for (let x = xMin; x <= xMax; x += 0.01) {
          approxData.push({ x, y: fourierSeriesSaw(x, N, T, bs) });
        }
      }

      if (`${graph}` === "triangle") {
        // Generate periodic box function data
        for (let x = xMin; x <= xMax; x += 0.01) {
          const normalizedX = ((x % T) + T) % T; 
          let yValue;
          if (normalizedX < T/2) {
            yValue =  bt * (T/4 - normalizedX);
          } else {
            yValue =  bt * (normalizedX - 3*T/4);
          }
          stepData.push({ x, y: yValue });
        }

        // Generate approximation data
        for (let x = xMin; x <= xMax; x += 0.01) {
          approxData.push({ x, y: fourierSeriesTriangle(x, N, T, bt) });
        }
      }

      // Draw periodic box function
      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveStepAfter);

      svg.append("path")
        .datum(stepData)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5") 
        .attr("d", line);

      // Draw Fourier series approximation
      const fourierLine = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveBasis);  // Smooth curve

      svg.append("path")
        .datum(approxData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", fourierLine);

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
      .text("Function")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")
    svg.append("text")
      .attr("x", 170)
      .attr("y", 40)
      .text("Approximation")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")

  }, [N, graph]);

  return <svg ref={svgRef}></svg>;
};

export default FourierSeries;
