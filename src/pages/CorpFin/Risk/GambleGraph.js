import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GambleGraph = ({a}) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const xl = 20;
    const xh = 222;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");
    svg.selectAll("*").remove();

    const xScale = d3.scaleLinear()
      .domain([xl - 10, xh + 10])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([xl - 10, xh + 10])  // Adjusted to fit the new curve and line
      .range([height - margin.bottom, margin.top]);

    // Define X Axis (y=0)
    svg.append("g")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(d3.axisBottom(xScale)
              .tickValues([])
              .tickFormat(() => "")
            );
    svg.append("text")
      .attr("x", 57)
      .attr("y", 295)
      .attr("text-anchor", "middle")
      .text("-100");
    svg.append("text")
      .attr("x", 248)
      .attr("y", 295)
      .attr("text-anchor", "middle")
      .text("-1");
    svg.append("text")
      .attr("x", 263)
      .attr("y", 295)
      .attr("text-anchor", "middle")
      .text("3");
    svg.append("text")
      .attr("x", 453)
      .attr("y", 295)
      .attr("text-anchor", "middle")
      .text("102");

    // Straight Line: y = x
    const lineData = [
      { x: xl - 10, y: xl - 10},
      { x: xh + 10, y: xh + 10},
    ];
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));
    svg.append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Vertical lines
    const lineData1 = [
      { x: xl, y: xl - 20},
      { x: xl, y: xl},
    ];
    svg.append("path")
      .datum(lineData1)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5") 
      .attr("d", line);
    const lineData2 = [
      { x: xh, y: xl - 20},
      { x: xh, y: xh},
    ];
    svg.append("path")
      .datum(lineData2)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5") 
      .attr("d", line);
    const lineData3 = [
      { x: xl + 99, y: xl - 20},
      { x: xl + 99, y: Math.max(xl + 99, ((xh - xl)/(Math.pow(xh, a) - Math.pow(xl, a)))*(Math.pow(xl + 99, a) - Math.pow(xh,a)) + xh)},
    ];
    svg.append("path")
      .datum(lineData3)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5") 
      .attr("d", line);
    const lineData4 = [
      { x: xl + 103, y: xl - 20},
      { x: xl + 103, y: Math.max(xl + 103, ((xh - xl)/(Math.pow(xh, a) - Math.pow(xl, a)))*(Math.pow(xl + 103, a) - Math.pow(xh,a)) + xh)},
    ];
    svg.append("path")
      .datum(lineData4)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5") 
      .attr("d", line);

    // Increasing Concave-Down Curve: y = -1 + sqrt((x + 101) / 100)
    const curveData = d3.range(xl - 10, xh + 10, 1).map(x => ({
      x,
      y: ((xh - xl)/(Math.pow(xh, a) - Math.pow(xl, a)))*(Math.pow(x, a) - Math.pow(xh,a)) + xh,  // Increasing concave-down function
    }));

    const curve = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);  // Smooth curve

    svg.append("path")
      .datum(curveData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", curve);
  }, [a]);

  return <svg ref={svgRef}></svg>;
};

export default GambleGraph;
