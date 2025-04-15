import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import DynamicTable from "../../components/DynamicTable";

const WIDTH = 500;
const HEIGHT = 400;
const MARGIN = { top: 20, right: 30, bottom: 50, left: 50 };
const N = 252;
const S0 = 100;
const r = 0.1;
const sigma = .2;
const I = 100;
const T = 1;
const K = 100;

function getRandomElement(array) {
  if (!array || array.length === 0) {
    return undefined; // Handle empty or null arrays
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generateGBM(n, S0, sigma, mu = .1) {
  const dt = 1 / n;
  const seeds = [2,4,6,8,9,10,11,13,14,15,16,17,19,20,21,22,23,25,28,29,30,37,40,42,43,46,49,50,58,61,66,68,77,85,95,106,114,117,123,124];
  const path = [S0];
  const seededRandom = d3.randomLcg(getRandomElement(seeds));
  for (let i = 1; i < n; i++) {
    const prev = path[i - 1];
    const rand = d3.randomNormal.source(seededRandom)(0, 1)();
    const next = prev * Math.exp((mu - 0.5 * sigma ** 2) * dt + sigma * Math.sqrt(dt) * rand);
    path.push(next);
  }
  return path;
}

function bsCall(S, K, r, T, sigma) {
  // Approximate Error Function (Abramowitz & Stegun, Handbook of Mathematical Functions)
  const erf = (x) => {
    const a1 = 0.254829592,
      a2 = -0.284496736,
      a3 = 1.421413741,
      a4 = -1.453152027,
      a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);
    const t = 1 / (1 + p * absX);
    const y =
      1 -
      (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX));

    return sign * y;
  };

  // Cumulative Normal Distribution Function
  const normCDF = (x) => {
    return (1 + erf(x / Math.sqrt(2))) / 2;
  };
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const delta = normCDF(d1);
  const callPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);

  return [callPrice, delta];
}

function valueCalc(I, prices, points, callPrices, deltas) {
  const S0 = prices[0];
  const values = [[0, I]];
  // const [V0, delta0] = bsCall(S0, K, r, T, sigma);
  const V0 = callPrices[0];
  const delta0 = deltas[0];

  let n_opt = I/(delta0*S0 - V0);
  let n_share = (I*delta0)/(delta0*S0 - V0);
  const n_opts = [n_opt];
  const n_shares = [n_share];
  const share_prices = [S0];
  const option_prices = [V0];
  const days = [T*252];

  for (let i = 0; i < points.length; i++) {
    let index = points[i];
    let S = prices[index];
    // let [V, delta] = bsCall(S, K, r, T - points[i]/N, sigma);
    let V = callPrices[index];
    let delta = deltas[index];
    values.push([index, n_share*S - n_opt*V]);

    n_opt = I/(delta*S - V);
    n_share = (I*delta)/(delta*S - V);
    n_opts.push(n_opt);
    n_shares.push(n_share);
    share_prices.push(S);
    option_prices.push(V);
    days.push(T*252 - index);
  }

  const Sf = prices.slice(-1)[0];
  if (K < Sf) {
    values.push([N, K*n_opt - (n_opt-n_share)*Sf]);
    option_prices.push(Sf-K);
  } else{
    values.push([N, n_share*Sf]);
    option_prices.push(0);
  }
  share_prices.push(Sf);
  days.push(0);

  let sum = 0;
  const values1 = values.map(x => [x[0], x[1] - 100]);
  const cumulativeSumList = values1.map(number => {
      sum += number[1];
      return [number[0], sum];
    });

  return [cumulativeSumList.map(x => [x[0], x[1] + 100]), values1, n_opts, n_shares, share_prices, option_prices, days]
}

const Volatility = () => {
  const topRef = useRef();
  const bottomRef = useRef();
  const [clickPoints, setClickPoints] = useState([]);
  const [tableStockPrices, setTableStockPrices] = useState([]);
  const [tableOptionPrices, setTableOptionPrices] = useState([]);
  const [tableShares, setTableShares] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);
  const [tableAddedValues, setTableAddedValues] = useState([]);
  const [tableCumulativeValues, setTableCumulativeValues] = useState([]);
  const [tableDays, setTableDays] = useState([]);
  const [gbmData] = useState(() => generateGBM(N, S0, sigma));
  const callPricesDeltas = gbmData.map((value, index) => bsCall(value, K, r, T - index/N, sigma));
  const callPrices = callPricesDeltas.map(x => x[0]);

  const xScale = d3.scaleLinear().domain([0, N - 1]).range([MARGIN.left, WIDTH - MARGIN.right]);

  useEffect(() => {
    const svg = d3.select(topRef.current);
    svg.selectAll("*").remove();

    const yScale = d3.scaleLinear().domain([d3.min(gbmData) - 5, d3.max(gbmData) + 5]).range([HEIGHT - MARGIN.bottom, MARGIN.top]);

    svg.append("g")
      .attr("transform", `translate(0,${HEIGHT - MARGIN.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d => T*252-d));

    svg.append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(yScale));


    const line1 = d3.line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

    svg.append("path")
      .datum([[0, K],[N, K]])
      .attr("fill", "none")
      .attr("stroke", "purple")
      .attr("stroke-dasharray", "4")
      .attr("stroke-width", 2)
      .attr("d", line1);

    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));

    svg.append("path")
      .datum(gbmData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // axis labels
    svg.append("text")     
        .attr("x", 265 )
        .attr("y", 385 )
        .style("text-anchor", "middle")
        .text("Days to Expiration");
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("x", -160)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Price");
      // line labels
      svg.append("line")          
        .style("stroke", "steelblue")
        .attr("stroke-width", 2) 
        .attr("x1", 50)     
        .attr("y1", 10)     
        .attr("x2", 65) 
        .attr("y2", 10);
      svg.append("line")          
        .attr("stroke", "purple")
        .attr("stroke-dasharray", "4")
        .attr("stroke-width", 2)
        .attr("x1", 200)     
        .attr("y1", 10)     
        .attr("x2", 215) 
        .attr("y2", 10);
      svg.append("line")       
        .attr("stroke", "red")
        .attr("x1", 350)     
        .attr("y1", 14)     
        .attr("x2", 350) 
        .attr("y2", 2);
      svg.append("text")
        .attr("x", 70)
        .attr("y", 10)
        .text("Stock Price")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
      svg.append("text")
        .attr("x", 220)
        .attr("y", 10)
        .text("Strike Price")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
      svg.append("text")
        .attr("x", 360)
        .attr("y", 10)
        .text("Readjustment")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")

    const hoverLine = svg.append("line")
      .attr("stroke", "red")
      .attr("stroke-dasharray", "4")
      .style("visibility", "hidden");

    svg.on("mousemove", (event) => {
      const [x] = d3.pointer(event);
      const xVal = Math.round(xScale.invert(x));
      if (xVal >= 0 && xVal < N) {
        hoverLine
          .attr("x1", xScale(xVal))
          .attr("x2", xScale(xVal))
          .attr("y1", MARGIN.top)
          .attr("y2", HEIGHT - MARGIN.bottom)
          .style("visibility", "visible");
      } else {
        hoverLine.style("visibility", "hidden");
      }
    });

    svg.on("mouseleave", () => hoverLine.style("visibility", "hidden"));
  }, [gbmData]);

  useEffect(() => {
    const svg = d3.select(topRef.current);
    svg.selectAll(".solid-line").remove();

    clickPoints.forEach(xVal => {
      svg.append("line")
        .attr("class", "solid-line")
        .attr("x1", xScale(xVal))
        .attr("x2", xScale(xVal))
        .attr("y1", MARGIN.top)
        .attr("y2", HEIGHT - MARGIN.bottom)
        .attr("stroke", "red");
    });
  }, [clickPoints]);

  useEffect(() => {
    const svg = d3.select(bottomRef.current);
    svg.selectAll("*").remove();

    const roundArray = arr => arr.map(x => typeof x === 'number' ? Number(x.toFixed(4)) : x);

    const compoundGrowth = Array.from({ length: N }, (_, i) => S0 * Math.exp(r * i / N));
    const functionValues = clickPoints.sort((a, b) => a - b);
    const [optionValues, addedValues, n_opts, n_shares, share_prices, option_prices, days] = valueCalc(I, gbmData, functionValues, callPricesDeltas.map(x => x[0]), callPricesDeltas.map(x => x[1]));
    setTableOptions(roundArray(n_opts));
    setTableShares(roundArray(n_shares));
    setTableStockPrices(roundArray(share_prices));
    setTableOptionPrices(roundArray(option_prices));
    setTableAddedValues(addedValues.map(x => Number(x[1].toFixed(2))));
    setTableCumulativeValues(optionValues.map(x => Number(x[1].toFixed(2))));
    setTableDays(days);

    const yScale = d3.scaleLinear().domain([S0 -30, S0 + 30])
      .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

    svg.append("g")
      .attr("transform", `translate(0,${HEIGHT - MARGIN.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d => T*252-d));

    svg.append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(yScale));

    const growthLine = d3.line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d));

    svg.append("path")
      .datum(compoundGrowth)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", growthLine);

    // Define the line generator
    const line = d3.line()
      .x(d => xScale(d[0])) // Access the x-value from the inner array
      .y(d => yScale(d[1])); // Access the y-value from the inner array

    // Add the line path
    svg.append("path")
      .datum(optionValues) // Bind the data to the path
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line); // Generate the SVG path string

    // axis labels
    svg.append("text")     
        .attr("x", 265 )
        .attr("y", 385 )
        .style("text-anchor", "middle")
        .text("Days to Expiration");
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("x", -120)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Value of Investment");
      // line labels
      svg.append("line")          
        .style("stroke", "red")
        .attr("stroke-width", 2) 
        .attr("x1", 150)     
        .attr("y1", 10)     
        .attr("x2", 165) 
        .attr("y2", 10);
      svg.append("line")          
        .style("stroke", "green") 
        .attr("stroke-width", 2)
        .attr("x1", 300)     
        .attr("y1", 10)     
        .attr("x2", 315) 
        .attr("y2", 10);
      svg.append("text")
        .attr("x", 170)
        .attr("y", 10)
        .text("Hedged-Option")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
      svg.append("text")
        .attr("x", 320)
        .attr("y", 10)
        .text("Risk-Free")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")

  }, [clickPoints]);


  const handleSvgClick = (event) => {
    const svg = d3.select(topRef.current);
    const [x] = d3.pointer(event, svg.node());
    const xVal = Math.round(xScale.invert(x));
    if (xVal >= 0 && xVal < N && !clickPoints.includes(xVal)) {
      setClickPoints(prev => [...prev, xVal].slice(0, N));
    }
  };

  const handleReset = () => {
    setClickPoints([]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: 'column' }}>
      <div style={{ paddingBottom: "10px" }}><button onClick={handleReset}>Reset Graph</button></div>
      <div className='graph-container1'>
        <svg ref={topRef} width={WIDTH} height={HEIGHT} onClick={handleSvgClick}></svg>
        <svg ref={bottomRef} width={WIDTH} height={HEIGHT}></svg>
      </div>
      <DynamicTable
        columns={[
          "Days Before Expiration",
          "Shares Purchased",
          "Stock Price",
          "Options Sold",
          "Option Price",
          "Value Added",
          "Cumulative Value"
        ]}
        dataArrays={[
          tableDays,
          tableShares,
          tableStockPrices,
          tableOptions,
          tableOptionPrices,
          tableAddedValues,
          tableCumulativeValues
        ]}
      />
    </div>
  );
};

export default Volatility;
