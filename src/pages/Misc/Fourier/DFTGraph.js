import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";


function generateGBM(N = 39, S0 = 1, mu = 0.1, sigma = 0.2, dt = 1 / 100) {
  const data = [S0];
  for (let i = 1; i < N; i++) {
    const dW = Math.sqrt(dt) * (Math.random() * 2 - 1); // Brownian increment
    const prev = data[i - 1];
    const next = prev * Math.exp((mu - 0.5 * sigma ** 2) * dt + sigma * dW);
    data.push(next);
  }
  return data;
}

// function computeDFT(x) {
//   const N = x.length;
//   const F = Array(N).fill(0).map((_, k) => {
//     let re = 0, im = 0;
//     for (let n = 0; n < N; n++) {
//       const angle = (-2 * Math.PI * k * n) / N;
//       re += x[n] * Math.cos(angle);
//       im += x[n] * Math.sin(angle);
//     }
//     return { re: re / N, im: im / N };
//   });
//   return F;
// }

// function inverseDFT(F, terms) {
//   const N = F.length;
//   const y = Array(N).fill(0);

//   for (let n = 0; n < N; n++) {
//     let sum = 0;
//     for (let k = 0; k < terms; k++) {
//       const angle = (2 * Math.PI * k * n) / N;
//       const { re, im } = F[k];
//       sum += re * Math.cos(angle) - im * Math.sin(angle);
//     }
//     y[n] = sum;
//   }
//   return y;
// }

function inverseDFT(x, terms) {
  const N = x.length;
  const y = Array(N).fill(0);
  if ((N % 2) === 0) {
      for (let n = 0; n < N; n++) {
        let total = 0;
        for (let m = 0; m < N; m++) {
          let sum = 1;
          for (let k = 1; k <= Math.min(terms-1, N/2 -1); k++) {
            sum += 2*Math.cos((2*Math.PI*k*(n-m))/N);
          }
          if (terms > (N/2 -1)) {
            sum += (-1)**(n-m);
          }
          total += x[m]*sum;
        }
        y[n] = total/N;
      }
  } else {
      for (let n = 0; n < N; n++) {
        let total = 0;
        for (let m = 0; m < N; m++) {
          let sum = 1;
          for (let k = 1; k < terms; k++) {
            sum += 2*Math.cos((2*Math.PI*k*(n-m))/N);
          }
          total += x[m]*sum;
        }
        y[n] = total/N;
      }
  }
  return y;
}

function DFTGraph({terms}) {
  const svgRef = useRef();
  const [data, setData] = useState(generateGBM());

  useEffect(() => {
    const width = 600;
    const height = 350;
    const margin = 40;

    const approx = inverseDFT(data, terms);

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([margin, width - margin]);
    const yScale = d3.scaleLinear().domain([d3.min(data), d3.max(data)]).range([height - margin, margin]);

    const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .style("overflow", "visible");
      svg.selectAll("*").remove();

    const line = d3.line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d));

    const xAxis = d3.axisBottom(xScale).ticks(39).tickFormat("");
    const yAxis = d3.axisLeft(yScale).ticks(10).tickFormat("");

    svg.append("g")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(${margin}, 0)`)
      .call(yAxis);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5") 
      .attr("d", line);

    svg.append("path")
      .datum(approx)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // line labels/title
    svg.append("line")          
      .style("stroke", "red")
      .attr("stroke-width", 2) 
      .attr("stroke-dasharray", "5,5") 
      .attr("x1", 150)     
      .attr("y1", 0)     
      .attr("x2", 165) 
      .attr("y2", 0);
    svg.append("line")          
      .style("stroke", "steelblue") 
      .attr("stroke-width", 2)
      .attr("x1", 150)     
      .attr("y1", 20)     
      .attr("x2", 165) 
      .attr("y2", 20);
    svg.append("text")
      .attr("x", 170)
      .attr("y", 0)
      .text("Data")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")
    svg.append("text")
      .attr("x", 170)
      .attr("y", 20)
      .text("Approximation")
      .style("font-size", "15px")
      .attr("alignment-baseline","middle")

  }, [data, terms]);

  return <svg ref={svgRef}></svg>;
}

export default DFTGraph;
