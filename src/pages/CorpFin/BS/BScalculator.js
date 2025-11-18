import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";

const BlackScholesCalculator = () => {
  const [S, setS] = useState(100); // Stock price
  const [K, setK] = useState(100); // Strike price
  const [r, setR] = useState(0.05); // Risk-free rate
  const [sigma, setSigma] = useState(0.2); // Volatility
  const [T, setT] = useState(1); // Time to expiration (years)
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

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

  const calculateOptionPrice = () => {
    setError(""); // Reset errors

    if (
      isNaN(S) || isNaN(K) || isNaN(r) || isNaN(sigma) || isNaN(T) ||
      S <= 0 || K <= 0 || sigma <= 0 || T <= 0
    ) {
      setError("Inputs must be positive numbers.");
      return;
    }

    if (
      S > 1000000 || K > 1000000 
    ) {
      setError("Price too high.");
      return;
    }

    if (
      r > 1
    ) {
      setError("Risk-free rate too high.");
      return;
    }

    if (
      sigma > 10
    ) {
      setError("Volatility too high.");
      return;
    }

    if (
      T > 100
    ) {
      setError("Time to expiration too high.");
      return;
    }

    // Black-Scholes Formula
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const callPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
    setPrice(callPrice.toFixed(4));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto", border: "1px solid black", borderRadius: "10px" }}>
      <h2>Black-Scholes Call Option Calculator</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <label>
          Stock Price (<MathJax inline>{"\\( S \\)"}</MathJax>): 
          <input type="number" value={S} onChange={(e) => setS(parseFloat(e.target.value))} min="0.01" step="1" />
        </label>

        <label>
          Strike Price (<MathJax inline>{"\\( K \\)"}</MathJax>): 
          <input type="number" value={K} onChange={(e) => setK(parseFloat(e.target.value))} min="0.01" step="1" />
        </label>

        <label>
          Annual Risk-Free Rate (<MathJax inline>{"\\( r \\)"}</MathJax>) (as decimal): 
          <input type="number" value={r} onChange={(e) => setR(parseFloat(e.target.value))} min="0.0001" max="1" step="0.01" />
        </label>

        <label>
          Annual Volatility (<MathJax inline>{"\\( \\sigma \\)"}</MathJax>) (as decimal): 
          <input type="number" value={sigma} onChange={(e) => setSigma(parseFloat(e.target.value))} min="0.01" max="10" step="0.01" />
        </label>

        <label>
          Time to Expiration (<MathJax inline>{"\\( T-t \\)"}</MathJax>) (years): 
          <input type="number" value={T} onChange={(e) => setT(parseFloat(e.target.value))} min="0.01" step="0.01" />
        </label>

        <button onClick={calculateOptionPrice} style={{ marginTop: "10px", padding: "5px", cursor: "pointer" }}>
          Calculate Price
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {price !== null && <p>Option Price: <strong>{price}</strong></p>}
      </div>
    </div>
  );
};

export default BlackScholesCalculator;
