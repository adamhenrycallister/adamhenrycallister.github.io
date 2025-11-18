import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DamageViz = ({ mu, sigma, val, fd, cd, maintenance, setDragValues }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    // colors
    const fraud_color = "#D55E00";
    const corrective_color = "#009E73";
    const price_color = "#56B4E9";
    const price_color_counter = "#CC79A7";
    const buy_color = "#E69F00";
    const sell_color = "#0072B2";

    const width = 800, height = 500;
    const n = 320;  // Number of time steps
    const dt = 1 / n;  // Time step size
    const T = 1;  // Total time
    const S0 = 100; // starting stock price
    const fd_lines = [19, 59, 99];
    const cd_lines = [219, 179, 139];

    // Fixed Y-axis range (for the axis, not the line)
    const yMin = 0, yMax = 250;
    const shift = 75;

    // Simulate GBM path
    let inflation = [val/fd, val*(-Math.pow(fd,2)/6 + fd/2 + 2/3), val, val*(-Math.pow(cd,2)/6 + cd/2 + 2/3), val/cd];
    if (maintenance == true) {
      inflation = [val/fd, val*(-Math.pow(fd,2)/6 + fd/2 + 2/3), val, (val/6)*(-Math.pow(cd,2) + 6*cd -5), (val/6)*(cd-1)*(cd - 2)];
    }
    let S = [S0];
    let PC = [S0];
    let PA = [S0];
    let upper_lim = yMax;
    if (val > 0) {
      upper_lim = yMax - val;
    }
    let lower_lim = yMin;
    if (val < 0) {
      lower_lim = yMin - val;
    }

    for (let t = 1; t < n; t++) {
      const dW = Math.sqrt(dt) * d3.randomNormal(0, 1)();
      let St = S[S.length - 1] * Math.exp((mu - 0.5 * sigma ** 2) * dt + sigma * dW);

      if (St > upper_lim) {
        St = upper_lim - (St - upper_lim);  // reflect
      }
      if (St < lower_lim) {
        St = lower_lim - (St - lower_lim);  // reflect
      }
      S.push(St);

      if (maintenance == false) {
        PC.push(St);

        // Determine the inflation adjustment based on t
        let infl = 0;
        if (t >= 20 && t < 60) infl = inflation[0];
        else if (t >= 60 && t < 100) infl = inflation[1];
        else if (t >= 100 && t < 140) infl = inflation[2];
        else if (t >= 140 && t < 180) infl = inflation[3];
        else if (t >= 180 && t < 220) infl = inflation[4];

        PA.push(Math.max(0, St + infl)); 
      } else {
        if (t < 20) {
          PC.push(St)
          PA.push(St)
        } else if (t >= 20 && t < 60) {
          PC.push(St + inflation[0])
          PA.push(St)
        } else if (t >= 60 && t < 100) {
          PC.push(St + inflation[1])
          PA.push(St)
        } else if (t >= 100 && t < 140) {
          PC.push(St + inflation[2])
          PA.push(St)
        } else if (t >= 140 && t < 180) {
          PC.push(St + inflation[2])
          PA.push(St + inflation[4])
        } else if (t >= 180 && t < 220) {
          PC.push(St + inflation[2])
          PA.push(St + inflation[3])
        } else {
          PC.push(St + inflation[2])
          PA.push(St + inflation[2])
        }
      }

    }

    // Scales
    const xScale = d3.scaleLinear().domain([0, n - 1]).range([shift, width - shift]);
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height - shift, shift]);

    // Line generator (without clipping values)
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d)) // Allow values outside [yMin, yMax]
      .curve(d3.curveBasis);

    // Draw axis
    svg.append("g")
        .attr("transform", `translate(0, ${height - shift})`)
        .call(d3.axisBottom(xScale)) 
        .call(d3.axisBottom(xScale)
           .tickSize(0)  // removes tick lines
           .tickFormat(""));
    svg.append("g").attr("transform", `translate(${shift},0)`).call(d3.axisLeft(yScale));

    // label axis
    svg.append("text")     
        .attr("x", 380 )
        .attr("y", 485 )
        .style("text-anchor", "middle")
        .text("Time");
    svg.append("text")      
        .attr("x", 20)
        .attr("y", 240 )
        .attr("transform", "rotate(-90, 20, 240)")
        .style("text-anchor", "middle")
        .text("Price");

    // Title
    svg.append("text")     
        .attr("x", 150 )
        .attr("y", 15 )
        .style("text-anchor", "left")
        .text("Actual Price");
    svg.append("text")     
        .attr("x", 150 )
        .attr("y", 40 )
        .style("text-anchor", "left")
        .text("Price Without Fraud");
    svg.append("line")
      .attr("x1", 110)
      .attr("x2", 140)
      .attr("y1", 10)         
      .attr("y2", 10)     
      .attr("stroke", price_color)
      .attr("stroke-width", 2)
    svg.append("line")
      .attr("x1", 110)
      .attr("x2", 140)
      .attr("y1", 34)         
      .attr("y2", 34)     
      .attr("stroke", price_color_counter)
      .attr("stroke-dasharray", "6,2") 
      .attr("stroke-width", 2)

    // Counterfactual price
    svg.append("path")
      .datum(PC)
      .attr("fill", "none")
      .attr("stroke", price_color_counter)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6,2") 
      .attr("d", line);

    // Actual price
    svg.append("path")
      .datum(PA)
      .attr("fill", "none")
      .attr("stroke", price_color)
      .attr("stroke-width", 2)
      .attr("d", line);

    // fraud disclosure lines
    svg.selectAll(".fraud-line")
      .data(fd_lines.slice(0,fd))
      .enter()
      .append("line")
      .attr("class", "vline")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", height - shift + 10)
      .attr("y2", shift)
      .attr("stroke", fraud_color)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4"); 

    // corrective disclosure lines
    svg.selectAll(".corrective-line")
      .data(cd_lines.slice(0,cd))
      .enter()
      .append("line")
      .attr("class", "vline")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", height - shift + 10)
      .attr("y2", shift)
      .attr("stroke", corrective_color)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4"); 

    // 90 days after revelation
    svg.append("line")
      .attr("x1", xScale(310))
      .attr("x2", xScale(310))
      .attr("y1", height - shift + 10)         
      .attr("y2", shift)     
      .attr("stroke", "grey") 
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4"); 

        /**
         * Draws a complex curly brace (like in LaTeX) using four chained Cubic Bezier curves.
         * The control points have been adjusted to create a sharper concave curl at the endpoints.
         * * @param {object} svgSelection - The D3 selection for the SVG group.
         * @param {number} x1 - The starting X coordinate (screen space).
         * @param {number} x2 - The ending X coordinate (screen space).
         * @param {number} y - The Y coordinate of the endpoints (the baseline).
         * @param {number} depth - The maximum vertical displacement of the brace (e.g., 30).
         * @param {string} label - Optional text label for the brace.
         * @param {boolean} isOverbrace - If true, the brace opens upward (cup shape).
         */
        function drawCurlyBrace(svgSelection, x1, x2, y, depth, label = "", isOverbrace = false) {
            const W = x2 - x1; // Total width
            
            // Safety check for zero width
            if (W <= 0) {
                console.error("Brace width (x2 - x1) must be positive.");
                return;
            }

            // Adjust depth to be negative for overbrace (opening up)
            const D = isOverbrace ? -depth : depth; 
            const midX = x1 + W / 2;

            // --- USER-DEFINED CONTROL POINTS (Left Side) ---
            const C1L_X = x1;
            const C1L_Y = y + D/2;
            const C2L_X = x1 + W/3;
            const C2L_Y = y + D/8;
            
            // Apex/Nadir Point
            const ApexX = midX;
            const ApexY = y + D;

            // 1. CP1 (Right): Controls the tangent LEAVING the apex. 
            //    Must be a reflection of C2L across the vertical line at midX.
            //    MidX - (C2L_X - MidX) = 2*MidX - C2L_X
            const C1R_X = 2 * midX - C2L_X; 
            const C1R_Y = C2L_Y; // Y-coordinate remains the same
            
            // 2. CP2 (Right): Controls the tangent ARRIVING at the end point (x2, y).
            //    Must be a reflection of C1L across the vertical line at midX.
            const C2R_X = 2 * midX - C1L_X; 
            const C2R_Y = C1L_Y; // Y-coordinate remains the same

            // --- CONSTRUCT PATH DATA ---
            const pathData = 
                // Move to Start Point
                `M${x1},${y} ` +
                
                // Segment 1 (Left): Start -> Apex/Nadir
                // C C1L_X, C1L_Y C2L_X, C2L_Y ApexX, ApexY
                `C${C1L_X},${C1L_Y} ${C2L_X},${C2L_Y} ${ApexX},${ApexY} ` +
                
                // Segment 2 (Right): Apex/Nadir -> End
                // C C1R_X, C1R_Y C2R_X, C2R_Y x2, y
                `C${C1R_X},${C1R_Y} ${C2R_X},${C2R_Y} ${x2},${y}`;

            svgSelection.append("path")
                .attr("d", pathData)
                .attr("fill", "none")
                .attr("class", "custom-brace")
                .attr("stroke", "black");

            if (label) {
                // Label position is outside the brace
                const labelY = isOverbrace ? y - depth - 10 : y + depth + 15;

                svgSelection.append("text")
                    .attr("x", midX)
                    .attr("y", labelY)
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text(label);
            }
        }

      drawCurlyBrace(
            svg,
            xScale(219),
            xScale(310),
            height- shift + 10,
            20,
            "90 days after final corrective disclosure",
            false // isOverbrace = false (Underbrace)
        );

  ////////////////// buy/sell lines /////////////////////

  // Initial draggable line positions
  let dragBuy = 120;
  let dragSell = 260;

  // BUY LINE
  // label
  svg.append("text")
    .attr("id", "labelBuy")
    .attr("x", xScale(dragBuy)-35)
    .attr("y", 70)
    .attr("fill", buy_color)
    .text("\u2B05 Buy \u27A1")
    .on("mouseover", function() {
      d3.select("#buy-line")
        .transition()
        .duration(100)
        .attr("stroke-width", 4)
        .attr("stroke-opacity", 0.8);
      d3.select(this)
        .transition()
        .duration(100)
        .attr("font-weight", "bold");
    })
    .on("mouseout", function() {
      d3.select("#buy-line")
        .transition()
        .duration(100)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1);
      d3.select(this)
        .transition()
        .duration(100)
        .attr("font-weight", "normal");
    })
    .call(
      d3.drag()
        .on("drag", function(event) {
          const t = Math.round(xScale.invert(event.x));
          const clampedT = Math.max(0, Math.min(n - 1, t));

          d3.select("#buy-line").attr("x1", xScale(clampedT)).attr("x2", xScale(clampedT));

          d3.select(this).attr("x", xScale(clampedT) -35);

          let average = null;
          if (clampedT > 119) {
            if (clampedT <= 310) {
              average = PA.slice(220, clampedT).reduce((a, b) => a + b, 0) / (clampedT - 220);
            } else {
              average = PA.slice(220, 310).reduce((a, b) => a + b, 0) / (310 - 220);
            }
          }

          setDragValues(prev => ({
            ...prev,
            t_buy: clampedT,
            PA_buy: PA[clampedT],
            PC_buy: PC[clampedT],
            average_buy: average
          }));
        })
    );

  // Append the line
  svg.append("line")
    .attr("id", "buy-line")
    .attr("x1", xScale(dragBuy))
    .attr("x2", xScale(dragBuy))
    .attr("y1", height - shift + 20)
    .attr("y2", shift)
    .attr("stroke", buy_color)
    .attr("stroke-width", 2)
    .style("cursor", "ew-resize")
    .on("mouseover", function() {
      d3.select("#labelBuy")
        .transition()
        .duration(100)
        .attr("font-weight", "bold");
      d3.select(this)
        .transition()
        .duration(100)
        .attr("stroke-width", 4)
        .attr("stroke-opacity", 0.8);
    })
    .on("mouseout", function() {
      d3.select("#labelBuy")
        .transition()
        .duration(100)
        .attr("font-weight", "normal");
      d3.select(this)
        .transition()
        .duration(100)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1);
    })
    .call(
      d3.drag()
        .on("drag", function(event) {
          const t = Math.round(xScale.invert(event.x));
          const clampedT = Math.max(0, Math.min(n - 1, t));

          d3.select("#labelBuy").attr("x", xScale(clampedT) -35);

          d3.select(this)
            .attr("x1", xScale(clampedT))
            .attr("x2", xScale(clampedT));

          let average = null;
          if (clampedT > 119) {
            if (clampedT <= 310) {
              average = PA.slice(220, clampedT).reduce((a, b) => a + b, 0) / (clampedT - 220);
            } else {
              average = PA.slice(220, 310).reduce((a, b) => a + b, 0) / (310 - 220);
            }
          }

          setDragValues(prev => ({
            ...prev,
            t_buy: clampedT,
            PA_buy: PA[clampedT],
            PC_buy: PC[clampedT],
            average_buy: average
          }));
        })
    );

  // SELL LINE
  // label
  svg.append("text")
    .attr("id", "labelSell")
    .attr("x", xScale(dragSell)-35)
    .attr("y", 70)
    .attr("fill", sell_color)
    .text("\u2B05 Sell \u27A1")
    .on("mouseover", function() {
      d3.select("#sell-line")
        .transition()
        .duration(100)
        .attr("stroke-width", 4)
        .attr("stroke-opacity", 0.8);
      d3.select(this)
        .transition()
        .duration(100)
        .attr("font-weight", "bold");
    })
    .on("mouseout", function() {
      d3.select("#sell-line")
        .transition()
        .duration(100)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1);
      d3.select(this)
        .transition()
        .duration(100)
        .attr("font-weight", "normal");
    })
    .call(
      d3.drag()
        .on("drag", function(event) {
          const t = Math.round(xScale.invert(event.x));
          const clampedT = Math.max(0, Math.min(n - 1, t));

          d3.select("#sell-line").attr("x1", xScale(clampedT)).attr("x2", xScale(clampedT));

          d3.select(this).attr("x", xScale(clampedT) -35);

          let average = null;
          if (clampedT > 119) {
            if (clampedT <= 310) {
              average = PA.slice(220, clampedT).reduce((a, b) => a + b, 0) / (clampedT - 220);
            } else {
              average = PA.slice(220, 310).reduce((a, b) => a + b, 0) / (310 - 220);
            }
          }

          setDragValues(prev => ({
            ...prev,
            t_sell: clampedT,
            PA_sell: PA[clampedT],
            PC_sell: PC[clampedT],
            average_sell: average
          }));
        })
    );

  // Append the line
  svg.append("line")
    .attr("id", "sell-line")
    .attr("x1", xScale(dragSell))
    .attr("x2", xScale(dragSell))
    .attr("y1", height - shift + 20)
    .attr("y2", shift)
    .attr("stroke", sell_color)
    .attr("stroke-width", 2)
    .style("cursor", "ew-resize")
    .on("mouseover", function() {
      d3.select("#labelSell")
        .transition()
        .duration(100)
        .attr("font-weight", "bold");
      d3.select(this)
        .transition()
        .duration(100)
        .attr("stroke-width", 4)
        .attr("stroke-opacity", 0.8);
    })
    .on("mouseout", function() {
      d3.select("#labelSell")
        .transition()
        .duration(100)
        .attr("font-weight", "normal");
      d3.select(this)
        .transition()
        .duration(100)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1);
    })
    .call(
      d3.drag()
        .on("drag", function(event) {
          const t = Math.round(xScale.invert(event.x));
          const clampedT = Math.max(0, Math.min(n - 1, t));

          d3.select("#labelSell").attr("x", xScale(clampedT) -35);

          d3.select(this)
            .attr("x1", xScale(clampedT))
            .attr("x2", xScale(clampedT));

          let average = null;
          if (clampedT > 119) {
            if (clampedT <= 310) {
              average = PA.slice(220, clampedT).reduce((a, b) => a + b, 0) / (clampedT - 220);
            } else {
              average = PA.slice(220, 310).reduce((a, b) => a + b, 0) / (310 - 220);
            }
          }

          setDragValues(prev => ({
            ...prev,
            t_sell: clampedT,
            PA_sell: PA[clampedT],
            PC_sell: PC[clampedT],
            average_sell: average
          }));
        })
    );


  // Initialize values
  setDragValues({
    t_buy: dragBuy,
    PA_buy: PA[dragBuy],
    PC_buy: PC[dragBuy],
    t_sell: dragSell,
    PA_sell: PA[dragSell],
    PC_sell: PC[dragSell],
    average_sell: PA.slice(220, dragSell).reduce((a, b) => a + b, 0) / (dragSell - 220),
    average_buy: null
  });
    

  }, [mu, sigma, val, fd, cd, maintenance, setDragValues]); // Recalculate when sliders change

  return <svg ref={svgRef} width={800} height={500}></svg>;
};

export default DamageViz;
