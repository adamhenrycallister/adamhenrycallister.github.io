import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RiskAversion = ({A, L}) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const X = 100;
    const xl = 0;
    const xh = 100;
    const p = .5;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");
    svg.selectAll("*").remove();

    const xScale = d3.scaleLinear()
      .domain([xl, xh])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([xl, xh]) 
      .range([height - margin.bottom, margin.top]);

    // Define X Axis (y=0)
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0,${height - 20})`).call(xAxis);
    svg.append("g").attr("transform", `translate(30,10)`).call(yAxis);

    const cara = d3.range(xl, xh, 1).map(x => ({
      x,
      y: (-1/A)*(Math.log(p*Math.exp(-A*(x+X))+ (1-p)*Math.exp(-A*x))) - x
    }));

    const crra = d3.range(xl, xh, 1).map(x => ({
      x,
      y: Math.pow(p*Math.pow((x+ X), 1-L) + (1-p)*Math.pow(x,1-L), 1/(1-L)) - x,  
    }));

    const curve = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);  // Smooth curve

    svg.append("path")
      .datum(cara)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", curve);
    svg.append("path")
      .datum(crra)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", curve);

  }, [A, L]);

  return <svg ref={svgRef}></svg>;
};

export default RiskAversion;
