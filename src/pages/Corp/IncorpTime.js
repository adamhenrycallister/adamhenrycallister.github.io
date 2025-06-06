// LineChart.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function IncorpTime({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 45, left: 55 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .html("") // Clear
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const years = data.map(d => d.year);
    const categories = Object.keys(data[0]).filter(k => k !== "year");

    const x = d3.scaleLinear()
      .domain(d3.extent(years))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(categories, c => d[c]))])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    g.append("g").call(d3.axisLeft(y));

    // Lines
    const line = d3.line()
      .x(d => x(d.year))
      .y((d, i, nodes) => y(d.value));

    categories.forEach(category => {
      const lineData = data.map(d => ({ year: d.year, value: d[category] }));

      g.append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", color(category))
        .attr("stroke-width", 2)
        .attr("d", line);

      // Dots with tooltips
      g.selectAll(`.dot-${category}`)
        .data(lineData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(d.value))
        .attr("r", 4)
        .attr("fill", color(category))
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition().duration(100)
            .attr("r", 7)
            .attr("stroke", "#000")
            .attr("stroke-width", 2);

          tooltip
            .style("opacity", 1)
            .html(`<strong>${category}</strong><br>Year: ${d.year}<br>Count: ${d.value}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function () {
          d3.select(this)
            .transition().duration(100)
            .attr("r", 4)
            .attr("stroke", "none");

          tooltip.style("opacity", 0);
        });
    });

    // Tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip-line")
      .style("position", "absolute")
      .style("text-align", "left")
      .style("padding", "6px")
      .style("font", "12px sans-serif")
      .style("background", "rgba(0,0,0,0.7)")
      .style("color", "#fff")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // axis labels
    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 12)
      .text("Number of Companies")
      .style("font-size", "15px")
      .style("text-anchor", "middle")
      // .attr("alignment-baseline","middle")
      .attr("transform", `rotate(-90)`)
    svg.append("text")
      .attr("x", width/2)
      .attr("y", height + 55)
      .text("Year")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")


    // line labels/title
    svg.append("line")          
      .style("stroke", color('DE'))
      .attr("stroke-width", 2) 
      .attr("x1", 600)     
      .attr("y1", 40)     
      .attr("x2", 615) 
      .attr("y2", 40);
    svg.append("line")          
      .style("stroke", color('HQ')) 
      .attr("stroke-width", 2)
      .attr("x1", 600)     
      .attr("y1", 60)     
      .attr("x2", 615) 
      .attr("y2", 60);
    svg.append("line")          
      .style("stroke", color('other')) 
      .attr("stroke-width", 2)
      .attr("x1", 600)     
      .attr("y1", 80)     
      .attr("x2", 615) 
      .attr("y2", 80);
    svg.append("text")
      .attr("x", 620)
      .attr("y", 40)
      .text("Delaware")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")
    svg.append("text")
      .attr("x", 620)
      .attr("y", 60)
      .text("Headquarter State")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")
    svg.append("text")
      .attr("x", 620)
      .attr("y", 80)
      .text("Other State")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")
    svg.append("text")
      .attr("x", 500)
      .attr("y", 20)
      .text("Number of Companies Incorporated in:")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")

  }, [data]);

  return <svg ref={svgRef}></svg>;
}
