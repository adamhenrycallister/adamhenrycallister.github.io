import React, { useState, useEffect} from 'react';
import './TimeDiscounting.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";
import ExampleBox from "../../../components/ExampleBox";

function TD4() {
  const [r, setR] = useState("0.05");
  const [T, setT] = useState(3);
  const MAX_ABS_VALUE = 1e12; // example: 1 trillion


  const [cashFlows, setCashFlows] = useState(
    Array(T + 1).fill("")
  );

  const [terminalType, setTerminalType] =
    useState("single"); 
  // "single" | "annuity" | "perpetuity" | "growingAnnuity" | "growingPerpetuity"

  const [terminalInputs, setTerminalInputs] = useState({
    value: "",   // single value or A
    N: "",       // for annuities
    g: ""    // for growth cases
  });

  useEffect(() => {
    setCashFlows(prev => {
      const next = [...prev];
      if (next.length < T + 1) {
        return next.concat(Array(T + 1 - next.length).fill(""));
      }
      return next.slice(0, T + 1);
    });
  }, [T]);

  function parseNumber(input) {
    if (input === null || input === undefined) {
      return { value: 0, isValid: true };
    }

    let str = String(input).trim();
    if (str === "") return { value: 0, isValid: true };

    // Remove commas
    str = str.replace(/,/g, "");

    // Add leading zero if starts with "."
    if (str.startsWith(".")) str = "0" + str;
    if (str.startsWith("-.")) str = "-0" + str.slice(1);

    // Remove leading zeros (but keep "0." or "-0.")
    str = str.replace(/^(-?)0+(?=\d)/, "$1");

    // Format validation
    const formatIsValid = /^-?\d*(\.\d*)?$/.test(str);
    if (!formatIsValid) {
      return { value: 0, isValid: false };
    }

    const n = parseFloat(str);

    // NaN / Infinity guard
    if (!Number.isFinite(n)) {
      return { value: 0, isValid: false };
    }

    // Size check (NEW)
    if (Math.abs(n) > MAX_ABS_VALUE) {
      return { value: 0, isValid: false };
    }

    return {
      value: n,
      isValid: true
    };
  }



  function calculateNPV({
    cashFlows,
    r,
    T,
    terminalType,
    terminalInputs
  }) {
    let rate = parseNumber(r);
    if (rate.isValid === true) {
      rate = rate.value;
    } else {
      return "\\\\&\\text{Error: Invalid Discount Rate}";
    }
    if (rate <= 0) {
      return "\\\\&\\text{Error: } r \\leq 0";
    }

    // 1. Present value of forecast cash flows
    let npv = 0;


    for (let t = 0; t < cashFlows.length; t++) {
      const cf = cashFlows[t];
      const parsed = parseNumber(cf);

      if (!parsed.isValid) {
        return "\\\\&\\text{Error: Invalid Cash Flow}";
        // OR return "\\text{Error: Invalid Cash Flow}" if you want LaTeX string
      }

      npv += parsed.value / Math.pow(1 + rate, t);
    }

    // 2. Terminal value at time T
    let terminalValueAtT = 0;

    let A = parseNumber(terminalInputs.value);
    if (A.isValid === true) {
      A = A.value;
    } else {
      return "\\\\&\\text{Error: Invalid Terminal Value}";
    }

    let N = parseNumber(terminalInputs.N);
    if ((terminalType === "annuity") || (terminalType === "growingAnnuity") ) {
        if (N.isValid === true) {
          N = N.value;
        } else {
          return "\\\\&\\text{Error: Invalid Period}";
        }
    }

    let g = parseNumber(terminalInputs.g);
    if ((terminalType === "growingPerpetuity") || (terminalType === "growingAnnuity") ) {
        if (g.isValid === true) {
          g = g.value;
        } else {
          return "\\\\&\\text{Error: Invalid Growth Rate}";
        }
    }

    switch (terminalType) {
      case "single":
        terminalValueAtT = A;
        break;

      case "annuity":
        terminalValueAtT =
          A * (1 - Math.pow(1 + rate, -N)) / rate;
        break;

      case "perpetuity":
        terminalValueAtT =
          A / rate;
        break;

      case "growingAnnuity":
        if (rate <= g) {
          return "\\\\&\\text{Error: } r \\leq g"
        }
        terminalValueAtT =
          A *
          (1 - Math.pow((1 + g) / (1 + rate), N)) /
          (rate - g);
        break;

      case "growingPerpetuity":
        if (rate <= g) {
          return "\\\\&\\text{Error: } r \\leq g"
        }
        terminalValueAtT =
          A / (rate - g);
        break;

      default:
        terminalValueAtT = 0;
    }

    // 3. Discount terminal value back to t=0
    npv += terminalValueAtT / Math.pow(1 + rate, T);
    if (npv < 0) {
      return "&= -$" + (-1*npv).toFixed(2);
    }

    return "&= $" + npv.toFixed(2);
  }


function NPV(
  cashFlows,   // number[]
  r,           // number
  T,
  A,
  N,
  g,
  terminalType
) {
  let npv = 0;

  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + r, t);
  }

  let terminalValueAtT = 0;

  switch (terminalType) {
    case "single":
      terminalValueAtT = A;
      break;

    case "annuity":
      terminalValueAtT =
        A * (1 - Math.pow(1 + r, -N)) / r;
      break;

    case "perpetuity":
      terminalValueAtT = A / r;
      break;

    case "growingAnnuity":
      if (r <= g) return NaN;
      terminalValueAtT =
        A * (1 - Math.pow((1 + g) / (1 + r), N)) / (r - g);
      break;

    case "growingPerpetuity":
      if (r <= g) return NaN;
      terminalValueAtT = A / (r - g);
      break;
  }

  npv += terminalValueAtT / Math.pow(1 + r, T);
  return npv;
}


  const npv_answer = calculateNPV({
      cashFlows,
      r,
      T,
      terminalType,
      terminalInputs
    });

  function terminalLatex(type) {
    switch (type) {
      case "single":
        return `\\frac{TV}{(1+r)^T}`;

      case "annuity":
        return `\\frac{A}{(1+r)^T}
          \\left( \\frac{1 - (1+r)^{-N}}{r} \\right)`;

      case "perpetuity":
        return `\\frac{A}{r(1+r)^T}`;

      case "growingAnnuity":
        return `\\frac{A}{(1+r)^T}
          \\left( \\frac{1 - \\left(\\frac{1+g}{1+r}\\right)^N}{r-g} \\right)`;

      case "growingPerpetuity":
        return `\\frac{A}{(r-g)(1+r)^T}`;
    }
  }
  const latex = `
    NPV &=
    \\sum_{t=0}^{T}
    \\frac{C_t}{(1+r)^t}
    +
    ${terminalLatex(terminalType)} \\\\` + npv_answer;


function irrBinarySearch(
  cashFlows,
  terminalInputs,
  T,
  terminalType,
  minRate = 0.0001,
  maxRate = 0.50,
  tolerance = 1e-6,
  maxIterations = 200
) {

  if (!npv_answer.includes('$')) {
    return null;
  }

  // Parse cash flows
  const parsedCashFlows = cashFlows.map(cf => {
    const p = parseNumber(cf);
    return p.isValid ? p.value : NaN;
  });

  if (parsedCashFlows.some(Number.isNaN)) {
    return null;
  }

  // Parse terminal inputs
  const A = parseNumber(terminalInputs.value);
  const N = parseNumber(terminalInputs.N);
  const g = parseNumber(terminalInputs.g);

  if (!A.isValid) return null;
  if (
    (terminalType === "annuity" || terminalType === "growingAnnuity") &&
    !N.isValid
  ) return null;

  if (
    (terminalType === "growingAnnuity" || terminalType === "growingPerpetuity") &&
    !g.isValid
  ) return null;

  if (terminalType === "growingAnnuity" || terminalType === "growingPerpetuity") {
    if (g.value >= maxRate) {
      return null;
    } else {
      minRate += g.value;
    }
  }

  const npvMin = NPV(
    parsedCashFlows,
    minRate,
    T,
    A.value,
    N.value,
    g.value,
    terminalType
  );

  const npvMax = NPV(
    parsedCashFlows,
    maxRate,
    T,
    A.value,
    N.value,
    g.value,
    terminalType
  );

  if (npvMin === 0 && npvMax === 0) return null;

  if (npvMin * npvMax > 0) return null;

  let low = minRate;
  let high = maxRate;

  for (let i = 0; i < maxIterations; i++) {
    const mid = (low + high) / 2;
    const midNPV = NPV(
      parsedCashFlows,
      mid,
      T,
      A.value,
      N.value,
      g.value,
      terminalType
    );

    if (Math.abs(midNPV) < tolerance) return mid;

    if (midNPV * npvMin > 0) low = mid;
    else high = mid;
  }

  return (low + high) / 2;
}


  const irr_answer = irrBinarySearch(
    cashFlows, 
    terminalInputs, 
    T,
    terminalType);

  return (
    	<div className='TimeDiscounting'>
    	<PageNavigator group="TD" />
    		<p className='heading1'>Investment Decision Rules</p>
    	<MathJaxContext>
      <p>
      Suppose you are given the opportunity to invest in a project that offers a series of cash flows&mdash;some positive and some negative&mdash;over time. How do you know whether you should invest in the project? 
      Two common ways of evaluating investment opportunities are the net present value (NPV) rule and the internal rate of return (IRR) rule.
      </p>
    	<p className='heading2'>Net Present Value</p>
      <p>
      To find the net present value of a project, we discount each future cash flow back to present value and then sum up all present values. If the NPV is positive, you should take on the project; if the NPV is negative, you shouldn't take on the project. When you must pick among projects, you should choose the one with the highest NPV. 
      </p>
      <p>
      How do you know what rate to use when discounting the cash flows back to present value? Your choice of rate depends on your other investment opportunities. 
      Suppose you always have the option of investing in an account that offers a 5% return. If an investment in the account and an investment in the project have similar risk, you should not take on the project if a 5% discount rate results in a negative NPV. 

      We call your choice of discount rate the required rate of return. 
      The required rate of return can be thought of as the return on your next best investment opportunity with similar risk.
      </p>
      <p className='heading2'>Internal Rate of Return</p>
      <p>
      Another way to evaluate an investment opportunity is to calculate its internal rate of return. The IRR on a project is the discount rate that will result in an NPV equal to zero. 
      If the IRR is greater than the required rate of return, you should take on the project; if the IRR is less than the required rate of return, you shouldn't take on the project. In this context, the required rate of return is sometimes called the "hurdle rate."
      </p>
      <p>
      The IRR rule has the advantage of showing which range of discount rates will result in a positive NPV for the project. This can be harder to see with the NPV rule. However, there are a few limitations to the IRR rule to keep in mind: (1) some projects may create multiple IRRs, (2) IRRs are scale invariant, and 
      (3) actually achieving the future value implied by the IRR depends on whether interim cash flows can be reinvested at the IRR. To build some intutition about these limitations and to see the relationship between the NPV and the IRR, let's consider a project with an initial payment today followed by two periods of cash flows:
      </p>
        <div className="table-wrapper">
        <table className="my-table">
          <tbody>
            <tr className="table-row">
              <td className="table-entry">Year</td>
              <td className="table-entry">0</td>
              <td className="table-entry">1</td>
              <td className="table-entry">2</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Cash Flow</td>
              <td className="table-entry"><MathJax inline>{"\\( C_0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( C_1 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( C_2 \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
      <p>
      Given a discount rate <MathJax inline>{"\\( r \\)"}</MathJax>, the NPV of this project is 
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
          NPV = C_0 + \\frac{C_1}{1 + r} + \\frac{C_2}{(1+r)^2}
          \\end{aligned}
        \\]`}
      </MathJax> 
      We can find the IRR for this project by setting the NPV equal to zero and solving for <MathJax inline>{"\\( r \\)"}</MathJax>.
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
          &0 = C_0 + \\frac{C_1}{1 + r} + \\frac{C_2}{(1+r)^2} \\\\
          &\\Leftrightarrow C_0(1+r)^2 + C_1(1+r) + C_2 = 0 
          \\end{aligned}
        \\]`}
      </MathJax>
      In general, solving for <MathJax inline>{"\\( r \\)"}</MathJax> by hand can quickly become intractable, so we typically rely on numerical methods to find <MathJax inline>{"\\( r \\)"}</MathJax>. 
      For this simple example, we can find a closed-form solution for <MathJax inline>{"\\( r \\)"}</MathJax> using the quadratic formula. Recall that a second degree polynomial of the form <MathJax inline>{"\\( ax^2 + bx + c \\)"}</MathJax> has roots given by <MathJax inline>{"\\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\)"}</MathJax>. 
      Here, if we let <MathJax inline>{"\\( x = 1+r \\)"}</MathJax>, <MathJax inline>{"\\( a = C_0 \\)"}</MathJax>, <MathJax inline>{"\\( b =  C_1\\)"}</MathJax>, and <MathJax inline>{"\\( c = C_2\\)"}</MathJax>, we can solve for <MathJax inline>{"\\( r \\)"}</MathJax> as 
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
          &1 + r = \\frac{- C_1 \\pm \\sqrt{C_1^2 -4C_0C_2}}{2C_0} \\\\
          &\\Leftrightarrow r = \\frac{-C_1 \\pm \\sqrt{C_1^2 - 4C_0C_2}}{2C_0} - 1
          \\end{aligned}
        \\]`}
      </MathJax> 
      If the expression in the square root is negative (<MathJax inline>{"\\( C_1^2 < 4C_0C_2 \\)"}</MathJax>), then there is no real solution. Thus, not every project has an IRR. If the inside of the square root is positive (<MathJax inline>{"\\( C_1^2 \\geq 4C_0C_2 \\)"}</MathJax>), we run into a different problem: the plus or minus sign creates two real solutions. 
      Sometimes this isn't a problem because one of the solutions is not economically meaningful, and we can discard it. If a solution results in <MathJax inline>{"\\( r \\leq -1\\)"}</MathJax>, we can safely discard it since NPV loses economic meaning when <MathJax inline>{"\\( 1 + r \\leq 0\\)"}</MathJax>. But, if both solutions are greater than -1, then we have two valid IRRs. 
      </p>
      <p>
      In the example we're considering, both solutions are greater than -1 if <MathJax inline>{"\\( C_1^2 \\geq 4C_0C_2 \\)"}</MathJax> and
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
          \\frac{-C_1 \\pm \\sqrt{C_1^2 - 4C_0C_2}}{2C_0} > 0
          \\end{aligned}
        \\]`}
      </MathJax>  
      which happens if <MathJax inline>{"\\( C_0, C_2 > 0 \\)"}</MathJax> and <MathJax inline>{"\\( C_1 < 0 \\)"}</MathJax> OR <MathJax inline>{"\\( C_0, C_2 < 0 \\)"}</MathJax> and <MathJax inline>{"\\( C_1 >0\\)"}</MathJax>. In general, we may run into multiple IRRs whenever cash flows change sign and then revert back (i.e., from negative to positive to negative again or from positive to negative to positive again).
      </p>
      <p>
      Even if we have only one economically meaningful IRR, using IRRs to compare projects may not result in the optimal investment decision. This happens because IRRs are scale invariant. Consider the equation we started with to find the IRR. 
       If we multiply each cash flow in the equation by any arbitrary non-zero number, we will not have changed the IRR. 
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
          0 &= C_0 + \\frac{C_1}{1 + r} + \\frac{C_2}{(1+r)^2} \\\\
          \\Leftrightarrow 0 &= AC_0 + \\frac{AC_1}{1 + r} + \\frac{AC_2}{(1+r)^2} 
          \\end{aligned}
        \\]`}
      </MathJax>
      Because of this scale invariance, it is possible for one project to have a higher IRR and a lower NPV than another project. Thus, you should use the NPV rule to choose among different projects, not the IRR rule.
      </p>
      <p>
      Finally, the IRR does not, in general, tell you the actual return that you will achieve if you invest in the project. To achieve the IRR in practice, you must be able to reinvest cash flows that pay out before the final period at the IRR. 
      To see this, suppose <MathJax inline>{"\\( C_0 < 0 \\)"}</MathJax> and <MathJax inline>{"\\( C_1, C_2 >0 \\)"}</MathJax> in the example above (i.e., you make an initial payment of <MathJax inline>{"\\(-$C_0 \\)"}</MathJax> today and 
        receive <MathJax inline>{"\\( $C_1 \\)"}</MathJax> in one year and <MathJax inline>{"\\( $C_2 \\)"}</MathJax> in two years). In this case, the IRR is given by <MathJax inline>{"\\( r = \\frac{-C_1 - \\sqrt{C_1^2 - 4C_0C_2}}{2C_0} - 1\\)"}</MathJax>. 
      If you had invested the inital payment in an account offering the same rate as the IRR, you would have the following amount in two years: 
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
          -C_0(1+r)^2 &= -C_0\\left(\\frac{-C_1 - \\sqrt{C_1^2 - 4C_0C_2}}{2C_0}\\right)^2 \\\\
          &= C_1(1+r) + C_2
          \\end{aligned}
        \\]`}
      </MathJax>
      However, if you take on the project and don't reinvest the money you receive at the end of the first year, you will have only <MathJax inline>{"\\( C_1 + C_2 \\)"}</MathJax> at the end of two years. 
      </p>
      <p className='heading2'>Discounted Cash Flow Analysis</p>
      <p>
      The NPV and IRR rules are both forms of DCF analysis, or a broader methodology that seeks to determine the value of an asset based on the present value of its future cash flows. 
      When using DCF analysis as a valuation tool, it is common to forecast cash flows for a set period and then assign a terminal value to the asset (at the end of the forecasting period). This terminal value could be a single number or a (growth) annuity/perpetuity. In this way, the value of the asset can be broken down into 
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
          \\text{Value} = \\overbrace{\\sum^T_{t=1}\\frac{C_t}{(1+r)^t}}^{\\text{Forecasted Cash Flows}} + \\frac{\\text{Terminal Value}}{(1 + r)^T}
          \\end{aligned}
        \\]`}
      </MathJax> 
      </p>
      <p>
      Use the calculator below to calculate the NPV of different cash flow schedules. Choose up to 10 forecasted cash flow periods and a terminal value method. The IRR is shown if it exists and is less than 50%. 
      </p>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{padding: "10px", fontWeight: "600", fontSize: "1.2rem"}}>NPV Calculator</div>
      <div className="calc_button_container">
        <div>
        <div className="input-bars">
          <label>
            <strong>Forecasted Periods (<MathJax inline>{"\\( T \\)"}</MathJax>)</strong>
          </label>
          <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
            <button onClick={() => setT((prev) => Math.max(0, prev - 1))}>◀</button>
            <span style={{ margin: "0 10px" }}>{T}</span>
            <button onClick={() => setT((prev) => Math.min(10, prev + 1))}>▶</button>
          </div>
        </div>
        <div className="cashflow-grid">
          <div className="row header">
            <span>Period (<MathJax inline>{"\\( t \\)"}</MathJax>)</span>
            <span>Cash Flow (<MathJax inline>{"\\( C_t \\)"}</MathJax>)</span>
          </div>
          {cashFlows.map((val, t) => (
            <div key={t} className="row">
              <span>{t}</span>
              <input
              type="text"
              inputMode="decimal"
              value={val}
              onFocus={e => e.target.select()}
              onChange={e => {
                const copy = [...cashFlows];
                copy[t] = e.target.value;
                setCashFlows(copy);
                }}
              />
            </div>
          ))}
        </div>
        </div>

        <div className="terminal-side">
        <strong>Terminal Value Method:</strong>
          <div className="terminal-button-choice-container">
            <div className="terminal-buttons">
              {[
                ["single", "Single Value"],
                ["annuity", "Annuity"],
                ["perpetuity", "Perpetuity"],
                ["growingAnnuity", "Growing Annuity"],
                ["growingPerpetuity", "Growing Perpetuity"]
              ].map(([key, label]) => (
                <label
                  key={key}
                  className={`terminal-radio ${
                    terminalType === key ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="terminalType"
                    value={key}
                    checked={terminalType === key}
                    onChange={() => setTerminalType(key)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="terminal-choices">
              <div className="row">
                <label>
                  Discount Rate (<MathJax inline>{"\\( r \\)"}</MathJax>) (as decimal):
                </label>
                <input
                type="text"
                value={r}
                inputMode="decimal"
                onFocus={e => e.target.select()}
                onChange={e => {
                  setR(e.target.value);
                  }}
                />
              </div>
            {terminalType === "single" && (
              <div className="row">
                <label>
                  Terminal Value (<MathJax inline>{"\\( TV \\)"}</MathJax>):
                </label>
                <input
                type="text"
                value={terminalInputs.value}
                inputMode="decimal"
                onFocus={e => e.target.select()}
                onChange={e =>
                  setTerminalInputs({ ...terminalInputs, value: e.target.value })
                }
                />
              </div>
            )}

            {["annuity", "growingAnnuity"].includes(terminalType) && (
              <>
              <div className="row">
                <label>
                  Payment (<MathJax inline>{"\\( A \\)"}</MathJax>):
                </label>
                <input
                type="text"
                value={terminalInputs.value}
                inputMode="decimal"
                onFocus={e => e.target.select()}
                onChange={e =>
                  setTerminalInputs({ ...terminalInputs, value: e.target.value })
                }
                />
              </div>
              <div className="row">
                <label>
                  Periods (<MathJax inline>{"\\( N \\)"}</MathJax>):
                </label>
                <input
                type="text"
                value={terminalInputs.N}
                inputMode="decimal"
                onFocus={e => e.target.select()}
                onChange={e =>
                  setTerminalInputs({ ...terminalInputs, N: e.target.value })
                }
                />
              </div>
              </>
            )}

            {["perpetuity", "growingPerpetuity"].includes(terminalType) && (
              <div className="row">
                <label>
                  Payment (<MathJax inline>{"\\( A \\)"}</MathJax>):
                </label>
                <input
                type="text"
                value={terminalInputs.value}
                inputMode="decimal"
                onFocus={e => e.target.select()}
                onChange={e =>
                  setTerminalInputs({ ...terminalInputs, value: e.target.value })
                }
                />
              </div>
            )}

            {terminalType.includes("growing") && (
              <div className="row">
                <label>
                  Growth Rate (<MathJax inline>{"\\( g \\)"}</MathJax>):
                </label>
                <input
                type="text"
                value={terminalInputs.g}
                inputMode="decimal"
                onFocus={e => e.target.select()}
                onChange={e =>
                  setTerminalInputs({ ...terminalInputs, g: e.target.value })
                }
                />
              </div>
            )}
            </div>
          </div>
          <div style={{ paddingTop: "10px" }}>
            {irr_answer === null && (
              <MathJax dynamic className="math-container">
                {`\\[
                  \\begin{aligned}
                  ${latex}
                  \\end{aligned}
                \\]`}
              </MathJax>
            )}

            {irr_answer !== null && (
              <MathJax dynamic className="math-container">
                {`\\[
                  \\begin{aligned}
                  ${latex} \\\\ \\\\
                  IRR &= ${(irr_answer * 100).toFixed(2)}\\%
                  \\end{aligned}
                \\]`}
              </MathJax>
            )}
          </div>
        </div>
      </div>
      </div>
      <p>
      Note that the discount rate should be the effective rate that matches the cash flow period. See the "Time Units" subsection on the previous page for an explanation of how to 
      ensure the rate matches the standard formulas.
      </p>
          <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              The NPV of each project is given by  
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                NPV_1 &= -100 + \\frac{10}{1+r} + \\frac{40}{(1+r)^2} + \\frac{20}{(1+r)^3} + \\frac{30}{(1+r)^4} + \\frac{50}{(1+r)^5} \\\\
                NPV_2 &= -1000 + \\frac{100}{1+r} + \\frac{300}{(1+r)^2} + \\frac{100}{(1+r)^3} + \\frac{200}{(1+r)^4} + \\frac{500}{(1+r)^5} 
                \\end{aligned}
              \\]`}
            </MathJax> 
            Using numerical methods, we can find the IRRs for these projects. Project 1 has an IRR of 12.85%. Project 2 has an IRR of 5.3%. Thus, project 1 has the higher IRR. 
              </p>
              <p>
              However, using a discount rate of 4%, project 1 has an NPV of $31.12, and project 2 has an NPV of $44.34. Thus, you should choose project 2. 
              </p>
            </>
          }>
            <p>
            <strong>Example 1:</strong> You have the option of taking on one of two projects. Project 1 requires an initial an investment of $100 today, project 2 requires an inital investment of $1,000 today. The projects pay out the following cash flows over the next five years:
            </p>
            <div className="table-wrapper">
            <table className="my-table">
              <tbody>
                <tr className="table-row">
                  <td className="table-entry">Year</td>
                  <td className="table-entry">1</td>
                  <td className="table-entry">2</td>
                  <td className="table-entry">3</td>
                  <td className="table-entry">4</td>
                  <td className="table-entry">5</td>
                </tr>
                <tr className="table-row">
                  <td className="table-entry">Project 1</td>
                  <td className="table-entry">10</td>
                  <td className="table-entry">40</td>
                  <td className="table-entry">20</td>
                  <td className="table-entry">30</td>
                  <td className="table-entry">50</td>
                </tr>
                <tr className="table-row">
                  <td className="table-entry">Project 2</td>
                  <td className="table-entry">100</td>
                  <td className="table-entry">300</td>
                  <td className="table-entry">100</td>
                  <td className="table-entry">200</td>
                  <td className="table-entry">500</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>
            Which project has the higher IRR? Which project should you choose if your only other investment option has an annual return of 4% (compounded annually)?
            </p>
          </ExampleBox>
    	</MathJaxContext>
    	<PageNavigator group="TD"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/time_discounting">Contents</NavLink></div>
        </div>
  );
}

export default TD4;