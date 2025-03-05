import React, { useState } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";
import BlackScholesCalculator from "./BScalculator";
import PriceGraph from "./priceViz";

function BS7() {
  // State for K, r, sigma, S0
  const [S0, setS0] = useState(100);  // initial stock price
  const [K, setK] = useState(100);  // strike price
  const [r, setr] = useState(0.05);  // strike price
  const [sigma, setSigma] = useState(0.5);  // Volatility
  return (
    	<div className='BlackScholes'>
    	<PageNavigator group="BS"/>
    	<MathJaxContext>
    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px"}}>
    		<BlackScholesCalculator />
    	</div>
			<div className='graph-container' style={{ paddingTop: "80px"}}>
			  <PriceGraph K={K} r={r} sigma={sigma} S0={S0} />
			  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
			    
			    <div className="input-bars">
			      <label>
			        <MathJax inline>{"\\( S_0 \\)"}</MathJax> (Initial Stock Price)
			      </label>
			      <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
			        <button onClick={() => setS0((prev) => Math.max(50, prev - 5))}>◀</button>
			        <span style={{ margin: "0 10px" }}>{S0.toFixed(0)}</span>
			        <button onClick={() => setS0((prev) => Math.min(200, prev + 5))}>▶</button>
			      </div>
			    </div>

			    <div className="input-bars">
			      <label>
			        <MathJax inline>{"\\( K \\)"}</MathJax> (Strike Price)
			      </label>
			      <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
			        <button onClick={() => setK((prev) => Math.max(50, prev - 5))}>◀</button>
			        <span style={{ margin: "0 10px" }}>{K.toFixed(0)}</span>
			        <button onClick={() => setK((prev) => Math.min(200, prev + 5))}>▶</button>
			      </div>
			    </div>

			    <div className="input-bars">
			      <label>
			        <MathJax inline>{"\\( \\sigma \\)"}</MathJax> (Volatility)
			      </label>
			      <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
			        <button onClick={() => setSigma((prev) => Math.max(0, prev - 0.05))}>◀</button>
			        <span style={{ margin: "0 10px" }}>{sigma.toFixed(2)}</span>
			        <button onClick={() => setSigma((prev) => Math.min(1, prev + 0.05))}>▶</button>
			      </div>
			    </div>

			    <div className="input-bars">
			      <label>
			        <MathJax inline>{"\\( r \\)"}</MathJax> (Risk-Free Rate)
			      </label>
			      <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
			        <button onClick={() => setr((prev) => Math.max(0, prev - 0.01))}>◀</button>
			        <span style={{ margin: "0 10px" }}>{r.toFixed(2)}</span>
			        <button onClick={() => setr((prev) => Math.min(1, prev + 0.01))}>▶</button>
			      </div>
			    </div>
			  </div>
			</div>
		<p>
		In the graph above, the stock price evolves according to geometric brownian motion with zero drift. Try varying the initial stock price, the strike price, and the risk-free rate with volatility set to zero. 
		Then see how things change as you increase volatility. Pay attention to how the gap between the stock price and the derivative price changes at the end points.
		</p>
    	</MathJaxContext>
    	<PageNavigator group="BS"/>
    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
        </div>
  );
}

export default BS7;