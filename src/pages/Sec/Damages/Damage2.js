import React, { useEffect, useState } from 'react';
import './Damage.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import DamageViz from "./DamageViz";
import ToggleSwitch from "./ToggleSwitch";
// import ExampleBox from "../../components/ExampleBox";

function ValueSelector({ value, onChange, color }) {
  const values = [1, 2, 3];

  return (
    <div style={{ display: "flex", gap: "10px", cursor: "pointer" }}>
      {values.map((v) => (
        <div
          key={v}
          onClick={() => onChange(v)}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "2px solid #555",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: v <= value ? color : "transparent",
            color: v <= value ? "white" : "#555",
            fontWeight: "bold",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
        >
          {v}
        </div>
      ))}
    </div>
  );
}


function Damage2() {
  // State for mu, sigma, S0
  const [mu, setMu] = useState(0.1);  // Drift
  const [sigma, setSigma] = useState(0.5);  // Volatility
  const [val, setVal] = useState(50);  // Value of false information
  const [fd, setfd] = useState(1); // fraud disclosures
  const [cd, setcd] = useState(1); // corrective disclosures
  const fraud_color = "#D55E00";
  const corrective_color = "#009E73";
  const [maintenance, setMaintenance] = useState(false);
  const [dragValues, setDragValues] = useState({
    t_buy: 0,
    PA_buy: 0,
    PC_buy: 0,
    t_sell: 0,
    PA_sell: 0,
    PC_sell: 0,
    average_sell: 0,
    average_buy: 0
  });

  const L = (dragValues.PA_buy.toFixed(2) - dragValues.PA_sell.toFixed(2)).toFixed(2);
  const Lf = (L - (dragValues.PC_buy.toFixed(2) - dragValues.PC_sell.toFixed(2)).toFixed(2)).toFixed(2);
  let L90_buy = false;
  let L90_sell = false;
  let L90 = null;

  if ((dragValues.average_sell > 0) && !(dragValues.average_buy > 0)) {
    L90_sell = true;
    L90 = (dragValues.PA_buy.toFixed(2) - dragValues.average_sell.toFixed(2)).toFixed(2);
  }
  if ((dragValues.average_buy > 0) && !(dragValues.average_sell > 0)) {
    L90_buy = true;
    L90 = (dragValues.average_buy.toFixed(2) - dragValues.PA_sell.toFixed(2)).toFixed(2);
  }

  const [visible, setVisible] = useState(false);

  return (
  	<div className='Damage'>
    <PageNavigator group="Damages" />
      <MathJaxContext>
          <p className='heading1'>Rule 10b-5 Damage Graph</p>

      <div className='graph-container'>

        <DamageViz 
          mu={mu} 
          sigma={sigma} 
          val={val} 
          fd={fd} 
          cd={cd} 
          maintenance={maintenance} 
          setDragValues={setDragValues}
        />


        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          
          <div className="input-bars"> 
            <ToggleSwitch onToggle={setMaintenance} />
          </div>
          <div className="input-bars">
            <label>Fraud Events</label>
            <div style={{paddingTop: "2px"}}>
              <ValueSelector value={fd} onChange={setfd} color={fraud_color}/>
            </div>
          </div>

          <div className="input-bars">
            <label>Corrective Disclosures</label>
            <div style={{paddingTop: "2px"}}>
              <ValueSelector value={cd} onChange={setcd} color={corrective_color}/>
            </div>
          </div>

          <div className="input-bars">
            <label>
              Value of Information
            </label>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
              <button onClick={() => setVal((prev) => Math.max(-60, prev - 5))}>◀</button>
              <span style={{ margin: "0 10px" }}>{val.toFixed(0)}</span>
              <button onClick={() => setVal((prev) => Math.min(60, prev + 5))}>▶</button>
            </div>
          </div>

          <div className="input-bars">
            <label>
              <MathJax inline>{"\\( \\bar \\mu \\)"}</MathJax> (Drift)
            </label>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
              <button onClick={() => setMu((prev) => Math.max(-0.5, prev - 0.1))}>◀</button>
              <span style={{ margin: "0 10px" }}>{mu.toFixed(2)}</span>
              <button onClick={() => setMu((prev) => Math.min(0.5, prev + 0.1))}>▶</button>
            </div>
          </div>

          <div className="input-bars">
            <label>
              <MathJax inline>{"\\( \\bar \\sigma \\)"}</MathJax> (Volatility)
            </label>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
              <button onClick={() => setSigma((prev) => Math.max(0, prev - 0.1))}>◀</button>
              <span style={{ margin: "0 10px" }}>{sigma.toFixed(2)}</span>
              <button onClick={() => setSigma((prev) => Math.min(1, prev + 0.1))}>▶</button>
            </div>
          </div>
        </div>
      </div>
      <div>
      {val === 0 ? (<p>Description: There is no fraud. Choose a nonzero number for the "Value of Information."</p>) :
      dragValues.t_buy <= dragValues.t_sell ? (
        <p>
          <b>Description:</b> Managers&nbsp;
          {maintenance === false ? "disseminate false" : "hide true"} 
          {` ${val < 0 ? "bad" : "good"} news about the company`}
          {fd > 1 ? ` on ${fd === 2 ? "two" : "three"} separate occasions` : ""}
          . This causes the stock price to{" "}
            {maintenance === true
              ? `stay at a ${val < 0 ? "higher" : "lower"} level than what it would have been at had managers released the true information.`
              : `${val < 0 ? "decrease below" : "increase above"} the level it would have been at had managers not released the false news.`}
          &nbsp;Later, the company makes {cd === 1 ? "a single corrective disclosure,": cd === 2 ? "two separate corrective disclosures, gradually": "three separate corrective disclosures, gradually"} revealing the truth to the market.
          &nbsp;You purchase stock&nbsp;
          {dragValues.t_buy < 20 
            ? `${19 - dragValues.t_buy} ${19 - dragValues.t_buy === 1 ? "day" : "days"} before the first fraud event`
            : dragValues.t_buy < 220
            ? `${dragValues.t_buy - 20} ${dragValues.t_buy - 20 === 1 ? "day" : "days"} after the first fraud event`
            : `${dragValues.t_buy - 219} ${dragValues.t_buy - 219 === 1 ? "day" : "days"} after the last corrective disclosure`}
          &nbsp;and sell stock&nbsp;
          {dragValues.t_sell < 20 
            ? `${19 - dragValues.t_sell} ${19 - dragValues.t_sell === 1 ? "day" : "days"} before the first fraud event.`
            : dragValues.t_sell < 220
            ? `${dragValues.t_sell - 20} ${dragValues.t_sell - 20 === 1 ? "day" : "days"} after the first fraud event.`
            : `${dragValues.t_sell - 219} ${dragValues.t_sell - 219 === 1 ? "day" : "days"} after the last corrective disclosure.`}
          &nbsp;The actual purchase price is ${dragValues.PA_buy.toFixed(2)}, and the actual sale price is ${dragValues.PA_sell.toFixed(2)}. The 
          counterfactual purchase price without fraud is ${dragValues.PC_buy.toFixed(2)}, and the counterfactual sale price without fraud is ${dragValues.PC_sell.toFixed(2)}.
          {dragValues.average_buy > 0 && dragValues.t_buy < 310 && ` The average closing price between the last corrective disclosure date and the date of purchase is $${dragValues.average_buy.toFixed(2)}.`}
          {dragValues.average_sell > 0 && dragValues.t_sell < 310 && ` The average closing price between the last corrective disclosure date and the date of sale is $${dragValues.average_sell.toFixed(2)}.`}
          {dragValues.average_buy > 0 && dragValues.t_buy >= 310 && ` The average closing price for the 90 days immediately following the last corrective disclosure is $${dragValues.average_buy.toFixed(2)}.`}
          {dragValues.average_sell > 0 && dragValues.t_sell >= 310 && dragValues.t_buy < 310 &&` The average closing price for the 90 days immediately following the last corrective disclosure is $${dragValues.average_sell.toFixed(2)}.`}
        </p>
      ) : (
        <p>
          <b>Description:</b> Managers&nbsp;
          {maintenance === false ? "disseminate false" : "hide true"} 
          {` ${val < 0 ? "bad" : "good"} news about the company`}
          {fd > 1 ? ` on ${fd === 2 ? "two" : "three"} separate occasions` : ""}
          . This causes the stock price to{" "}
            {maintenance === true
              ? `stay at a ${val < 0 ? "higher" : "lower"} level than what it would have been at had managers released the true information.`
              : `${val < 0 ? "decrease below" : "increase above"} the level it would have been at had managers not released the false news.`}
          &nbsp;Later, the company makes {cd === 1 ? "a single corrective disclosure,": cd === 2 ? "two separate corrective disclosures, gradually": "three separate corrective disclosures, gradually"} revealing the truth to the market.
          &nbsp;You short the stock&nbsp;
          {dragValues.t_sell < 20 
            ? `${19 - dragValues.t_sell} ${19 - dragValues.t_sell === 1 ? " day" : " days"} before the first fraud event`
            : dragValues.t_sell < 220
            ? `${dragValues.t_sell - 20} ${dragValues.t_sell - 20 === 1 ? " day" : " days"} after the first fraud event`
            : `${dragValues.t_sell - 219} ${dragValues.t_sell - 219 === 1 ? " day" : " days"} after the last corrective disclosure`}
          &nbsp;and close the short position by purchasing stock&nbsp;
          {dragValues.t_buy < 20 
            ? `${19 - dragValues.t_buy} ${19 - dragValues.t_buy === 1 ? " day" : " days"} before the first fraud event.`
            : dragValues.t_buy < 220
            ? `${dragValues.t_buy - 20} ${dragValues.t_buy - 20 === 1 ? " day" : " days"} after the first fraud event.`
            : `${dragValues.t_buy - 219} ${dragValues.t_buy - 219 === 1 ? " day" : " days"} after the last corrective disclosure.`}
          &nbsp;The actual price at the time you short the stock is ${dragValues.PA_sell.toFixed(2)}, and the actual price at the time you purchase to cover your short position is ${dragValues.PA_buy.toFixed(2)}. The 
          counterfactual price without fraud at the time you short the stock is ${dragValues.PC_sell.toFixed(2)}, and the 
          counterfactual price without fraud at the time you purchase to cover your short position is ${dragValues.PC_buy.toFixed(2)}.
          {dragValues.average_buy > 0 && dragValues.t_buy < 310 && ` The average closing price between the last corrective disclosure date and the date of purchase is $${dragValues.average_buy.toFixed(2)}.`}
          {dragValues.average_sell > 0 && dragValues.t_sell < 310 && ` The average closing price between the last corrective disclosure date and the date of shorting the stock is $${dragValues.average_sell.toFixed(2)}.`}
          {dragValues.average_buy > 0 && dragValues.t_buy >= 310 && ` The average closing price for the 90 days immediately following the last corrective disclosure is $${dragValues.average_buy.toFixed(2)}.`}
          {dragValues.average_sell > 0 && dragValues.t_sell >= 310 && dragValues.t_buy < 310 &&` The average closing price for the 90 days immediately following the last disclosure is $${dragValues.average_sell.toFixed(2)}.`}
        </p>
      )}
      </div>
      <div>
        <div style={{paddingBottom:"20px"}}>
          <span
            className="toggle-button"
            onClick={() => setVisible(!visible)}
          >
            {visible ? "Hide Damage Calculation" : "Show Damage Calculation"}
          </span>
        </div>
        {visible && (
        <div>
          <div className="table-wrapper">
          <table className="my-table">
            <thead>
              <tr>
                <th></th>
                <th className="table-entry-head" colSpan={2}>Price</th>
              </tr>
              <tr>
                <th></th>
                <th className="table-entry-head">Actual</th>
                <th className="table-entry-head">Without Fraud</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-entry-head">Purchase</td>
                <td className="table-entry">{dragValues.PA_buy.toFixed(2)}</td>
                <td className="table-entry">{dragValues.PC_buy.toFixed(2)}</td>
              </tr>
              <tr className="table-row">
                <td className="table-entry-head">Sale</td>
                <td className="table-entry">{dragValues.PA_sell.toFixed(2)}</td>
                <td className="table-entry">{dragValues.PC_sell.toFixed(2)}</td>
              </tr>
              <tr className="table-row">
                <td className="table-entry-head">Loss</td>
                <td className="table-entry">{L}</td>
                <td className="table-entry">{(dragValues.PC_buy.toFixed(2) - dragValues.PC_sell.toFixed(2)).toFixed(2)}</td>
                <td className="table-entry">{Lf}</td>
              </tr>
            </tbody>
          </table>
          </div>
          {
            Lf > 0 ?
            <p>
            You have a loss attributable to fraud of ${Lf} 
            {(L <= 0) ? `. However, you have an actual gain of $${Math.abs(L)}. Therefore, you have no damage claim.` :
            ` and an actual loss of $${L}.`}
            </p> :
            <p>You have a gain attributable to fraud of ${Math.abs(Lf)}. Therefore, you have no damage claim.</p>
          }
          {
            ((Lf > 0) && (L > 0)) ?
            L90_buy ?
              <p>The 90-day lookback limitation applies. The average purchase price less the actual sale price is {dragValues.average_buy.toFixed(2)} - {dragValues.PA_sell.toFixed(2)} = {L90 < 0 ? "-": ""}${Math.abs(L90)}.</p> :
              L90_sell ? 
              <p>The 90-day lookback limitation applies. The actual purchase price less the average sale price is {dragValues.PA_buy.toFixed(2)} - {dragValues.average_sell.toFixed(2)} = {L90 < 0 ? "-": ""}${Math.abs(L90)}.</p>
              : <p>The 90-day lookback limitation does not apply.</p>
            : null
          }
          {
            ((Lf > 0) && (L > 0)) ?
              ((L90 == null) ? 
                <p>Damages are the lesser of the fraud loss and the actual loss: ${Math.min(Lf, L)}.</p> :
                (L90 < 0) ? 
                  <p>The 90-day lookback limitation is negative. Therefore, you have no damage claim.</p> :
                  <p>Damages are the least of the fraud loss, the actual loss, and the 90-day lookback limitation: ${Math.min(Lf, L, L90)}.</p>
              )
            : null
          }
        </div> )}
      </div>
      </MathJaxContext>
      <PageNavigator group="Damages"/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/sec_reg/damages">Contents</NavLink></div>
    </div>
  );
}

export default Damage2;