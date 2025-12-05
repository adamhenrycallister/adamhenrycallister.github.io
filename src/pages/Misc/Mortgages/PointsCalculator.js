import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";

const PointsCalculator = () => {
  const [tau, setTau] = useState(0); // marginal tax rate
  const [delta, setDelta] = useState(25); // basis point reduction 
  const [r, setR] = useState(6); // annual mortgage rate
  const [m, setM] = useState(1); // number of points
  const [T, setT] = useState(30); // loan term
  const [time, setTime] = useState(null);
  const [error, setError] = useState("");

  // Newton-Raphson root finder
function hybridRoot(f, df, a, b, tol = 1e-4, maxIter = 500) {
  let fa = f(a);
  let fb = f(b);

  if ((fa > 0) & (fb > 0)) {
    setError("Never Buy Points");
    return -1;
  }

  if ((fa < 0) & (fb < 0)) {
    setError("Always Buy Points");
    return -1;
  }

  let x = (a + b) / 2; // start mid
  let fx = f(x);

  for (let i = 0; i < maxIter; i++) {
    let dfx = df(x);
    let newtonStep;

    // Try Newton if derivative is not tiny
    if (Math.abs(dfx) > 1e-12) {
      newtonStep = x - fx / dfx;
    } else {
      newtonStep = NaN; // disable Newton this iteration
    }

    // If Newton went outside [a, b], fallback to bisection
    if (isNaN(newtonStep) || newtonStep <= a || newtonStep >= b) {
      newtonStep = (a + b) / 2; // bisection
    }

    const xNext = newtonStep;
    const fxNext = f(xNext);

    // Update interval
    if (fa * fxNext < 0) {
      b = xNext;
      fb = fxNext;
    } else {
      a = xNext;
      fa = fxNext;
    }

    // Check convergence
    if (Math.abs(xNext - x) < tol) {
      return xNext;
    }

    x = xNext;
    fx = fxNext;
  }

  return x;
}


  // Cumulative Normal Distribution Function
  const M = (r1,T1) => {
    return r1/(1 - (1 + r1)**(-T1));
  };

  const calculateTime = () => {
    setError(""); // Reset errors

    if (
      isNaN(tau) || isNaN(delta) || isNaN(r) || isNaN(m) || isNaN(T) ||
      tau < 0 || delta <= 0 || r <= 0 || m <= 0 || T <= 0
    ) {
      setError("Inputs must be non-negative numbers.");
      return;
    }

    if (
      r > 100 || tau > 100
    ) {
      setError("Rate too high.");
      return;
    }

    if (
      delta > 9999 
    ) {
      setError("Basis point reduction too high.");
      return;
    }

    if (
      m > 99
    ) {
      setError("Number of points too high.");
      return;
    }

    const T_ = T*12;
    const rp = ((r/100)/12 - m*((delta/10000)/12))*(1-tau/100);
    const rd = ((r/100)/12)*(1-tau/100);

    if (
      rp <= 0 || rd <= 0
    ) {
      setError("Negative effective rate.");
      return;
    }

    const guess = (m/100)/(M(rd, T_) - M(rp, T_));

    function f(x) {
      const payment = (1 - m/100)*M(rd, T_);
      const Bp = (1 + rp)**x - payment*(((1 + rp)**x - 1)/(rp));
      const Bd = ((1+rd)**x)*(1 - m/100) - payment*(((1 + rd)**x - 1)/rd);
      return Bp - Bd;
    }   

    function df(x) {
      const payment = (1 - m/100)*M(rd, T_);
      const first = Math.log(1 + rp)*((1 + rp)**x)*(1 - payment/(rp));
      const second = Math.log(1 + rd)*((1 + rd)**x)*(payment/rd - (1-m/100));
      return first - second;
    }

    const minMonths = hybridRoot(f, df, 0, T_);
    if (minMonths != -1) {
      setTime(minMonths.toFixed(2));
    }
    
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto", border: "1px solid black", borderRadius: "10px" }}>
      <h2>Mortgage Points Decision Calculator</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <label>
          Annual Interest Rate (percent): 
          <input type="number" value={r} onChange={(e) => setR(parseFloat(e.target.value))} min="0.1" max="99" step=".1" />
        </label>

        <label>
          Basis Point Reduction in Rate: 
          <input type="number" value={delta} onChange={(e) => setDelta(parseFloat(e.target.value))} min="1" max="9999" step="1" />
        </label>

        <label>
          Number of Mortgage Points: 
          <input type="number" value={m} onChange={(e) => setM(parseFloat(e.target.value))} min="0.1" max="99" step="0.1" />
        </label>

        <label>
          Loan Term (years): 
          <input type="number" value={T} onChange={(e) => setT(parseFloat(e.target.value))} min="5" max="100" step="5" />
        </label>

        <label>
          Marginal Tax Rate (percent): 
          <input type="number" value={tau} onChange={(e) => setTau(parseFloat(e.target.value))} min="0" max="99" step="0.1" />
        </label>

        <button onClick={calculateTime} style={{ marginTop: "10px", padding: "5px", cursor: "pointer" }}>
          Calculate Minimum Time
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && time !== null && <p><strong>{time} months ({(time/12).toFixed(1)} years)</strong></p>}
      </div>
    </div>
  );
};

export default PointsCalculator;
