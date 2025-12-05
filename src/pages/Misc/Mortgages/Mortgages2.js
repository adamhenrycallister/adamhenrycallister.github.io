import React, { useState } from 'react';
import './Mortgages.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import PointsCalculator from "./PointsCalculator";
// import ExampleBox from "../../../components/ExampleBox";


function Mortgages2() {
  // State for K, r, sigma, S0
  const [S0, setS0] = useState(100);  // initial stock price
  const [K, setK] = useState(100);  // strike price
  const [r, setr] = useState(0.05);  // strike price
  const [sigma, setSigma] = useState(0.5);  // Volatility
  return (
      <div className='Mortgages'>
      <PageNavigator group="Mortgages"/>
      <MathJaxContext>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px"}}>
        <PointsCalculator />
      </div>
    <p>
    Use the calculator above to determine the minimum amount of time you must stay with your mortgage to justify buying points. The decision rule weighs the following options: (1) purchase points and (2) use the amount of money that you would have spent on points to increase your down payment. 
    The decision rule also assumes that if you do buy points, you voluntarily increase your monthly payment to match what you would have been required to pay each month had you not bought points.
    </p>
      </MathJaxContext>
      <PageNavigator group="Mortgages"/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/mortgages">Contents</NavLink></div>
        </div>
  );
}

export default Mortgages2;