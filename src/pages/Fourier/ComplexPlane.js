import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ComplexPlane = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const width = 600, height = 600;
      const margin = 50;
      const tickStep = 1;

      const svg = d3.select(d3Container.current)
        .attr("width", width)
        .attr("height", height);

      const xScale = d3.scaleLinear().domain([-10, 10]).range([margin, width - margin]);
      const yScale = d3.scaleLinear().domain([-10, 10]).range([height - margin, margin]);

      svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "black");

      svg.append("line")
        .attr("x1", xScale(-10)).attr("x2", xScale(10))
        .attr("y1", yScale(0)).attr("y2", yScale(0))
        .attr("stroke", "black").attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)")
        .attr("marker-start", "url(#arrow)");

      svg.append("line")
        .attr("x1", xScale(0)).attr("x2", xScale(0))
        .attr("y1", yScale(-10)).attr("y2", yScale(10))
        .attr("stroke", "black").attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)")
        .attr("marker-start", "url(#arrow)");

      // Add X-axis ticks, labels, and tick lines
      svg.selectAll(".x-tick")
        .data(d3.range(-9, 10, tickStep))
        .enter().append("g")
        .each(function(d) {
          d3.select(this).append("line")  // Tick line
            .attr("x1", xScale(d)).attr("x2", xScale(d))
            .attr("y1", yScale(0) - 5).attr("y2", yScale(0) + 5)
            .attr("stroke", "black");

          if (d !== 0) {  // Remove zero labels
          d3.select(this).append("text")  // Tick label
            .attr("x", xScale(d))
            .attr("y", yScale(0) + 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .text(d);
          }
        });

      // Add Y-axis ticks, labels, and tick lines
      svg.selectAll(".y-tick")
        .data(d3.range(-9, 10, tickStep))
        .enter().append("g")
        .each(function(d) {
          d3.select(this).append("line")  // Tick line
            .attr("x1", xScale(0) - 5).attr("x2", xScale(0) + 5)
            .attr("y1", yScale(d)).attr("y2", yScale(d))
            .attr("stroke", "black");

          if (d !== 0) {  // Remove zero labels
            d3.select(this).append("text")  // Tick label
              .attr("x", xScale(0) - 15)
              .attr("y", yScale(d) + 5)
              .attr("text-anchor", "end")
              .attr("font-size", "12px")
              .text(`${d}i`);
          }
        });

      svg.append("text")
        .attr("x", width - margin)
        .attr("y", yScale(0) + 30)
        .attr("text-anchor", "end")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text("Real");

      svg.append("text")
        .attr("x", xScale(0) + 25)
        .attr("y", margin - 10)
        .attr("text-anchor", "end")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text("Imaginary");

      const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "red")
        .style("display", "none");

      const tooltip = svg.append("text")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .style("display", "none");

      svg.on("mousemove", (event) => {
        const [mouseX, mouseY] = d3.pointer(event);
        let xValue = Math.round(xScale.invert(mouseX));
        let yValue = Math.round(yScale.invert(mouseY));

        xValue = Math.max(-10, Math.min(10, xValue));
        yValue = Math.max(-10, Math.min(10, yValue));

        // Adjusted display format
        let coordText;
        if (xValue === 0) {
          coordText = yValue !== 0 ? `${yValue}i` : "";
        } else if (yValue === 0) {
          coordText = `${xValue}`;
        } else {
          coordText = `${xValue} ${yValue > 0 ? "+" : "-"} ${Math.abs(yValue)}i`;
        }

        let y_adjust;
        if (yValue < 0) {
          y_adjust = 20;
        } else {
          y_adjust = -10;
        }

        let x_adjust;
        if (xValue < 0) {
          x_adjust = -20;
        } else {
          x_adjust = 5;
        }

        dot.attr("cx", xScale(xValue))
          .attr("cy", yScale(yValue))
          .style("display", "block");

        tooltip.attr("x", xScale(xValue) + x_adjust)
          .attr("y", yScale(yValue) + y_adjust)
          .text(coordText)
          .style("display", "block");
      });

      svg.on("mouseleave", () => {
        dot.style("display", "none");
        tooltip.style("display", "none");
      });
    }
  }, []);

  return <svg ref={d3Container}></svg>;
};

export default ComplexPlane;
