import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BrownianMotion2D = ({ width = 250, height = 250, duration = 50000, stepSize = 10 }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous content

        const margin = 20;
        const xScale = d3.scaleLinear().domain([-width / 2, width / 2]).range([margin, width - margin]);
        const yScale = d3.scaleLinear().domain([-height / 2, height / 2]).range([height - margin, margin]);
        
        const g = svg.append("g");
        const path = g.append("path").attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 2);
        const dot = g.append("circle").attr("r", 5).attr("fill", "red");
        
        let points = [{ x: 0, y: 0 }];
        
        function simulateBrownianMotion() {
            points = [{ x: 0, y: 0 }];
            path.attr("d", null);
            
            function step(i) {
                if (i >= duration / 100) return; // Stop after set number of steps
                
                const lastPoint = points[points.length - 1];
                const newPoint = {
                    x: lastPoint.x + stepSize * (Math.random() * 2 - 1),
                    y: lastPoint.y + stepSize * (Math.random() * 2 - 1)
                };
                points.push(newPoint);
                
                path.attr("d", d3.line()
                    .x(d => xScale(d.x))
                    .y(d => yScale(d.y))
                    (points));
                
                dot.attr("cx", xScale(newPoint.x)).attr("cy", yScale(newPoint.y));
                
                setTimeout(() => step(i + 1), duration / 400); // Delay each step
            }
            
            step(0);
            setTimeout(simulateBrownianMotion, duration);
        }
        
        simulateBrownianMotion();
    }, [width, height, duration, stepSize]);

    return <svg ref={svgRef} width={width} height={height} style={{ border: "1px solid black" }}></svg>;
};

export default BrownianMotion2D;
