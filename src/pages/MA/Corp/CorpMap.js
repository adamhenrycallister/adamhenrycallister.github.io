// src/components/USHeatMap.js
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

const fipsToState = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT",
  "10": "DE", "11": "DC", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL",
  "18": "IN", "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD",
  "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT", "31": "NE",
  "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD",
  "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA", "54": "WV",
  "55": "WI", "56": "WY"
};

export default function CorpMap({ data, dataField, year}) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const yearlyData = data[`${year}`]; 
    if (!yearlyData) return;

    const width = 960;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("font", "10px sans-serif");

    svg.selectAll("*").remove(); // Clear previous renders

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "6px")
      .style("background", "#fff")
      .style("border", "1px solid #999")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("display", "none");


    const values = Object.values(yearlyData).map(d =>
      d?.[dataField]
    );
    console.log(values)
    const maxVal = d3.max(values);

    const color = dataField === "count"
      ? d3.scaleSequentialLog([1, maxVal], d3.interpolateOranges)
      : d3.scaleSequentialLog([0.0001, maxVal], d3.interpolateBlues);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(us => {
      const states = feature(us, us.objects.states).features;

      const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
      const path = d3.geoPath().projection(projection);

      svg.append("g")
        .selectAll("path")
        .data(states)
        .join("path")
        .attr("d", path)
        .attr("fill", d => {
          const abbr = fipsToState[String(d.id).padStart(2, "0")];
          const val = yearlyData[abbr] ? (dataField === "count" ? yearlyData[abbr].count : yearlyData[abbr].mkt_cap) : null;
          return val != null ? color(val) : "#eee";
        })
        .attr("stroke", "#fff")
        .on("mouseover", (event, d) => {
          const abbr = fipsToState[String(d.id).padStart(2, "0")];
          const info = yearlyData[abbr];
          if (!info) return;
          const html = dataField === "count"
            ? `<strong>${abbr}</strong><br/>Companies: ${info.count.toLocaleString()} (${info.percent}%)`
            : `<strong>${abbr}</strong><br/>Mkt Cap Share: ${info.mkt_cap}%`;
          tooltip.html(html)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`)
            .style("display", "inline-block");
        })
        .on("mousemove", (event) => {
          tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => tooltip.style("display", "none"));
    });

    return () => {
      if (tooltipRef.current) tooltip.remove();
    };
  }, [data, dataField, year]);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
}
