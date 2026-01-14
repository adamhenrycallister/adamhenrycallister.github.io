import React, { useState } from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
// import ExampleBox from "../../../components/ExampleBox";

const spotData = [
    {
    month: "December 2018",
    spotify: 113.5,
    mktrf: -9.57,
    smb: -2.37,
    hml: -1.88,
    rf: 0.2,
    },
    {
    month: "January 2019",
    spotify: 135.45,
    mktrf: 8.4,
    smb: 2.88,
    hml: -0.45,
    rf: 0.21,
    },
    {
    month: "February 2019",
    spotify: 140.14,
    mktrf: 3.4,
    smb: 2.06,
    hml: -2.71,
    rf: 0.18,
    },
    {
    month: "March 2019",
    spotify: 138.8,
    mktrf: 1.1,
    smb: -3.05,
    hml: -4.12,
    rf: 0.19,
    },
    {
    month: "April 2019",
    spotify: 135.77,
    mktrf: 3.97,
    smb: -1.72,
    hml: 2.16,
    rf: 0.21,
    },
    {
    month: "May 2019",
    spotify: 125.58,
    mktrf: -6.94,
    smb: -1.31,
    hml: -2.37,
    rf: 0.21,
    },
    {
    month: "June 2019",
    spotify: 146.22,
    mktrf: 6.93,
    smb: 0.28,
    hml: -0.7,
    rf: 0.18,
    },
    {
    month: "July 2019",
    spotify: 154.94,
    mktrf: 1.19,
    smb: -1.93,
    hml: 0.47,
    rf: 0.19,
    },
    {
    month: "August 2019",
    spotify: 134.95,
    mktrf: -2.58,
    smb: -2.39,
    hml: -4.79,
    rf: 0.16,
    },
    {
    month: "September 2019",
    spotify: 114.0,
    mktrf: 1.43,
    smb: -0.97,
    hml: 6.77,
    rf: 0.18,
    },
    {
    month: "October 2019",
    spotify: 144.3,
    mktrf: 2.06,
    smb: 0.29,
    hml: -1.9,
    rf: 0.16,
    },
    {
    month: "November 2019",
    spotify: 142.55,
    mktrf: 3.88,
    smb: 0.78,
    hml: -1.99,
    rf: 0.12,
    },
    {
    month: "December 2019",
    spotify: 149.55,
    mktrf: 2.77,
    smb: 0.73,
    hml: 1.78,
    rf: 0.14,
    },
    {
    month: "January 2020",
    spotify: 141.3,
    mktrf: -0.11,
    smb: -3.13,
    hml: -6.25,
    rf: 0.13,
    },
    {
    month: "February 2020",
    spotify: 137.12,
    mktrf: -8.13,
    smb: 1.07,
    hml: -3.8,
    rf: 0.12,
    },
    {
    month: "March 2020",
    spotify: 121.44,
    mktrf: -13.39,
    smb: -4.79,
    hml: -13.88,
    rf: 0.13,
    },
    {
    month: "April 2020",
    spotify: 151.57,
    mktrf: 13.65,
    smb: 2.45,
    hml: -1.34,
    rf: 0.0,
    },
    {
    month: "May 2020",
    spotify: 180.93,
    mktrf: 5.58,
    smb: 2.49,
    hml: -4.85,
    rf: 0.01,
    },
    {
    month: "June 2020",
    spotify: 258.19,
    mktrf: 2.46,
    smb: 2.69,
    hml: -2.23,
    rf: 0.01,
    },
    {
    month: "July 2020",
    spotify: 257.82,
    mktrf: 5.77,
    smb: -2.3,
    hml: -1.44,
    rf: 0.01,
    },
    {
    month: "August 2020",
    spotify: 282.16,
    mktrf: 7.63,
    smb: -0.28,
    hml: -2.88,
    rf: 0.01,
    },
    {
    month: "September 2020",
    spotify: 242.57,
    mktrf: -3.63,
    smb: -0.03,
    hml: -2.65,
    rf: 0.01,
    },
    {
    month: "October 2020",
    spotify: 239.89,
    mktrf: -2.1,
    smb: 4.27,
    hml: 4.31,
    rf: 0.01,
    },
    {
    month: "November 2020",
    spotify: 291.37,
    mktrf: 12.47,
    smb: 5.72,
    hml: 2.15,
    rf: 0.01,
    },
    {
    month: "December 2020",
    spotify: 314.66,
    mktrf: 4.63,
    smb: 4.79,
    hml: -1.34,
    rf: 0.01,
    },
];

const excessSpotReturns = spotData.slice(1).map((row, index) => {
  const prevRow = spotData[index];

  const spotReturn =
    (row.spotify - prevRow.spotify) / prevRow.spotify;

  return {
    month: row.month,
    spotExcess: spotReturn - row.rf/100,
    mktrf: row.mktrf/100,
    smb: row.smb/100,
    hml: row.hml/100,
  };
});

const mean = arr =>
  arr.reduce((sum, val) => sum + val, 0) / arr.length;

const covariance = (x, y) => {
  const meanX = mean(x);
  const meanY = mean(y);

  return (
    x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0) /
    (x.length - 1)
  );
};

const variance = x => {
  const meanX = mean(x);
  return (
    x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0) /
    (x.length - 1)
  );
};

const spotExcessArr = excessSpotReturns.map(r => r.spotExcess);
const mktrfExcessArr = excessSpotReturns.map(r => r.mktrf);
const smbArr = excessSpotReturns.map(r => r.smb);
const hmlArr = excessSpotReturns.map(r => r.hml);

const y = mean(spotExcessArr);
const x1 = mean(mktrfExcessArr);
const x2 = mean(smbArr);
const x3 = mean(hmlArr);

const cov1y = covariance(spotExcessArr, mktrfExcessArr);
const cov2y = covariance(spotExcessArr, smbArr);
const cov3y = covariance(spotExcessArr, hmlArr);
const cov12 = covariance(mktrfExcessArr, smbArr);
const cov13 = covariance(mktrfExcessArr, hmlArr);
const cov23 = covariance(smbArr, hmlArr);
const var1 = variance(mktrfExcessArr);
const var2 = variance(smbArr);
const var3 = variance(hmlArr);


const beta = cov1y / var1;
const alpha = y - x1*beta;

const denominator = var1*var2*var3 - var3*(cov12**2) - var2*(cov13**2) - var1*(cov23**2) + 2*cov12*cov13*cov23;
const beta1 = (cov1y*(var3*var2 - cov23**2) + cov2y*(cov13*cov23 - var3*cov12) + cov3y*(cov12*cov23-var2*cov13))/denominator;
const beta2 = (cov2y*(var3*var1 - cov13**2) + cov1y*(cov23*cov13 - var3*cov12) + cov3y*(cov12*cov13-var1*cov23))/denominator;
const beta3 = (cov3y*(var1*var2 - cov12**2) + cov2y*(cov13*cov12 - var1*cov23) + cov1y*(cov23*cov12-var2*cov13))/denominator;
const beta0 = y - x1*beta1 - x2*beta2 - x3*beta3;


function Risk7() {
  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
        <p className='heading1'>Factor Models</p>
        <MathJaxContext>
        <p>
        In the last section, we found that the CAPM predicts that the intercept term in a regression of the excess return of an asset on the excess market return should be zero (<MathJax inline>{"\\( \\alpha = 0\\)"}</MathJax>). 
        However, in practice, we often observe nonzero alphas under CAPM.
        </p>
        <p>
          One way to interpret a nonzero alpha is that the asset is exposed to sources of risk that are not captured by the market as a whole. 
          If investors care about these additional risks, they will demand compensation for bearing them, and that compensation will show up as a positive or negative alpha when we estimate the CAPM.
        </p>

        <p>
          Factor models build on this idea by expanding the CAPM to include more than one source of systematic risk. 
          Instead of assuming that the market portfolio is the only thing that matters for expected returns, factor models allow multiple "factors" to influence asset prices.
        </p>

        <p>
          A <em>factor</em> can be thought of as a common economic force that affects many firms at the same time. 
          Examples might include firm size, the firm’s level of debt, exposure to interest rates, or sensitivity to broader economic conditions. 
          If an asset tends to perform poorly when a particular factor performs poorly, investors will generally require a higher expected return to hold that asset.
        </p>

        <p>
          In a multi-factor model, we use <NavLink className='inline-link' to="/stats/multivariate_regression">Multivariate Regression</NavLink> to regress an asset’s excess return on several factor returns rather than just the market return. 
          Each coefficient measures how sensitive the asset is to a particular factor, and the intercept term represents the portion of returns that is not explained by any of the included factors.
          As we add relevant factors to the model, alphas should shrink toward zero. 
          When a factor model produces intercepts that are close to zero across many assets, we say that the model does a good job of explaining returns.
        </p>
        <p className='heading2'>Fama-French Three-Factors</p>
        <p>
          One of the most influential multi-factor models is the Fama–French three-factor model. 
          This model starts with the CAPM and adds two additional factors that capture patterns in stock returns that the market factor alone does not explain.
        </p>

        <p>
          The Fama–French model includes the following three factors:
        </p>

        <p>
          <strong>1. The Market Factor (MKT). </strong>  
          This is the same factor used in the CAPM: the excess return on the overall stock market. 
          It captures the idea that when the market does well, most stocks tend to do well, and when the market performs poorly, most stocks tend to decline.
        </p>

        <p>
          <strong>2. The Size Factor (SMB, or "Small Minus Big"). </strong> 
          This factor reflects the historical tendency of smaller firms to earn higher average returns than larger firms. 
          Economically, smaller firms are often riskier: they may have less access to capital, more volatile earnings, and a higher likelihood of financial distress. 
          Stocks of smaller companies tend to perform especially poorly during economic downturns, so investors demand higher expected returns to hold them.
        </p>

        <p>
          <strong>3. The Value Factor (HML, or "High Minus Low"). </strong> 
          This factor captures the tendency of firms with high book-to-market ratios (often called "value" firms) to earn higher average returns than firms with low book-to-market ratios ("growth" firms). 
          Value firms are frequently more mature, more leveraged, or facing business challenges, making them riskier in bad economic states. 
          Growth firms, by contrast, tend to have more flexible business models and stronger growth prospects.
        </p>

        <p className='heading2'>Constructing Factors</p>
        <p>
        SMB and HML are not firm characteristics but factor-mimicking portfolio returns that capture how small firms and value firms perform relative to their counterparts in a given
         period. <a className='inline-link' href="https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/Data_Library/six_portfolios.html" target="_blank" rel="noopener noreferrer">Fama-French</a> construct these measures 
        by first dividing firms up by their size and value. Size is measured using market equity, which is the total market value of a firm’s common stock.
        Value is measured using the ratio of book equity to market equity. 
        Book equity is an accounting measure based on the firm’s balance sheet and reflects the historical value of the firm’s net assets (assets minus liabilities) recorded under accounting rules. 
        </p>
        <p>
          The book-to-market ratio compares what the firm is worth on paper to what the market believes the firm is worth today. 
          A high book-to-market ratio indicates that the firm’s market value is low relative to its accounting value, which is why such firms are often described as "value" firms.
          Economically, firms with high book-to-market ratios are frequently more mature, more leveraged, or facing business or financial distress. 
          These firms tend to perform especially poorly in bad economic times, making them riskier from an investor’s perspective. 
          As a result, investors generally require higher expected returns to hold them, which shows up as the value premium captured by HML.
        </p>
        <p>
        Using these measures of size and value, <a className='inline-link' href="https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/Data_Library/six_portfolios.html" target="_blank" rel="noopener noreferrer">Fama-French</a> divide firms into six groups: Small Value, Small Neutral, Small Growth, Big Value, Big Neutral, and Big Growth. 
        Then <a className='inline-link' href="https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/Data_Library/f-f_factors.html" target="_blank" rel="noopener noreferrer">Fama-French</a> calculate returns for each group and construct SMB and HML as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                SMB =&\\; \\frac{1}{3}(\\text{Small Value} + \\text{Small Neutral} + \\text{Small Growth}) \\\\
                &- \\frac{1}{3}(\\text{Big Value} + \\text{Big Neutral} + \\text{Big Growth}) \\\\ \\\\
                HML =&\\; \\frac{1}{2} (\\text{Small Value} + \\text{Big Value}) \\\\
                &- \\frac{1}{2}(\\text{Small Growth} + \\text{Big Growth})
            \\end{aligned}
          \\]`}   
        </MathJax> 
        </p>
        <p className='heading2'>Interpreting Model Coefficients</p>
        <p>
        For an asset with return <MathJax inline>{"\\( R \\)"}</MathJax>, the Fama-French three factor model establishes the following relationship:
          <MathJax className="math-container">
            {`\\[
            \\begin{aligned}
            R_{t} - R_{f,t}
            &= \\alpha 
            + \\beta_{MKT}\\,(MKT_{t} - R_{f,t}) + \\beta_{SMB}\\,SMB_t
            + \\beta_{HML}\\,HML_t
            + \\varepsilon_{t}
            \\end{aligned}
            \\]`}
          </MathJax>
        Here, for period <MathJax inline>{"\\( t \\)"}</MathJax>, <MathJax inline>{"\\( R_t \\)"}</MathJax> is 
        the return of the asset; <MathJax inline>{"\\( R_{f,t} \\)"}</MathJax> is the risk-free return; <MathJax inline>{"\\( MKT_t \\)"}</MathJax> is 
        the market return; <MathJax inline>{"\\( SMB_t \\)"}</MathJax> is the size factor; <MathJax inline>{"\\( HML_t \\)"}</MathJax> is the value factor; and <MathJax inline>{"\\( \\varepsilon_t \\)"}</MathJax> is the error term.
        </p>
        <p>
        Market beta (<MathJax inline>{"\\( \\beta_{MKT} \\)"}</MathJax>) measures overall volatility, <MathJax inline>{"\\( \\beta_{SMB} \\)"}</MathJax> captures firm size characteristics, <MathJax inline>{"\\( \\beta_{HML} \\)"}</MathJax> captures value versus growth, and alpha measures what remains unexplained.
        </p>
        <div className="table-wrapper">
          <table className="my-table">
            <thead>
              <tr>
                <th className="table-entry-head">Coefficient</th>
                <th className="table-entry-head">Value</th>
                <th className="table-entry-head">Interpretation</th>
                <th className="table-entry-head">Example Firms</th>
              </tr>
            </thead>
            <tbody>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( \\beta_{MKT} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\approx 0 \\)"}</MathJax></td>
              <td className="table-entry">Little exposure to overall market movements</td>
              <td className="table-entry">Regulated utilities, some consumer staples</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 < \\beta_{MKT} < 1 \\)"}</MathJax></td>
              <td className="table-entry">Moves with the market, but less volatile than the market</td>
              <td className="table-entry">Coca-Cola, Procter & Gamble</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( \\approx 1 \\)"}</MathJax></td>
              <td className="table-entry">Roughly as volatile as the market</td>
              <td className="table-entry">Broad market ETFs, diversified industrials</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( > 1 \\)"}</MathJax></td>
              <td className="table-entry">More volatile than the market; amplified response to market movements</td>
              <td className="table-entry">Airlines, cyclical technology firms</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"></td>
              <td className="table-entry"></td>
              <td className="table-entry"></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( \\beta_{SMB} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( < 0 \\)"}</MathJax></td>
              <td className="table-entry">Behaves more like a large-cap firm</td>
              <td className="table-entry">Apple (recent years), ExxonMobil</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( \\approx 0 \\)"}</MathJax></td>
              <td className="table-entry">Little systematic exposure to firm size</td>
              <td className="table-entry">Johnson & Johnson</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( > 0 \\)"}</MathJax></td>
              <td className="table-entry">Behaves more like a small-cap firm</td>
              <td className="table-entry">Recently public firms, regional banks</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"></td>
              <td className="table-entry"></td>
              <td className="table-entry"></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( \\beta_{HML} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( < 0 \\)"}</MathJax></td>
              <td className="table-entry">Growth-oriented firm (low book-to-market)</td>
              <td className="table-entry">Netflix, Salesforce</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( \\approx 0 \\)"}</MathJax></td>
              <td className="table-entry">Neutral with respect to value vs. growth</td>
              <td className="table-entry">Microsoft (recent years)</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( > 0 \\)"}</MathJax></td>
              <td className="table-entry">Value-oriented firm (high book-to-market)</td>
              <td className="table-entry">Ford, traditional manufacturing firms</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"></td>
              <td className="table-entry"></td>
              <td className="table-entry"></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( \\alpha \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\approx 0 \\)"}</MathJax></td>
              <td className="table-entry">Returns are well explained by the included factors</td>
              <td className="table-entry">Most diversified firms</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( > 0 \\)"}</MathJax></td>
              <td className="table-entry">Returns exceed what the model predicts</td>
              <td className="table-entry">Firms during speculative booms</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry"><MathJax inline>{"\\( < 0 \\)"}</MathJax></td>
              <td className="table-entry">Returns fall short of what the model predicts</td>
              <td className="table-entry">Firms in prolonged decline</td>
            </tr>
            </tbody>
          </table>
        </div>
        <p className='heading2'>Example</p>
        <p>
        Let's use the Fama-French three-factor model to predict returns of <a className='inline-link' href="https://finance.yahoo.com/quote/SPOT/history/" target="_blank" rel="noopener noreferrer">Spotify</a> stock during 2019 and 2020 (Spotify <a className='inline-link' href="https://corpgov.law.harvard.edu/2018/04/26/a-look-under-the-hood-of-spotifys-direct-listing/" target="_blank" rel="noopener noreferrer">went public</a> in April 2018). 
        We have following stock price values and <a className='inline-link' href="https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library_202412_archive.html" target="_blank" rel="noopener noreferrer">Fama-French factors</a> during the time period: 
        </p>
        <div className="table-wrapper">
          <table className="my-table">
            <thead>
              <tr>
                <th className="table-entry-head">Month</th>
                <th className="table-entry-head">Spotify Stock Price</th>
                <th className="table-entry-head">Mkt-RF</th>
                <th className="table-entry-head">SMB</th>
                <th className="table-entry-head">HML</th>
                <th className="table-entry-head">RF</th>
              </tr>
            </thead>
            <tbody>
              {spotData.map((row, index) => (
                <tr className="table-row" key={index}>
                  <td className="table-entry">{row.month}</td>
                  <td className="table-entry">{row.spotify}</td>
                  <td className="table-entry">{row.mktrf}</td>
                  <td className="table-entry">{row.smb}</td>
                  <td className="table-entry">{row.hml}</td>
                  <td className="table-entry">{row.rf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
        "Mkt-RF" is the market excess return as calculated by Fama-French, or the return on the market portfolio minus the risk-free return; "SMB" is the size factor; "HML" is the value factor; and "RF" is the risk-free return. 
        The Fama-French data is in percentage terms, so we'll divide "Mkt-RF," "SMB," "HML," and "RF" by 100. Next, we'll calculate the return on the Spotify stock and subtract the risk-free return to get the excess return. 
        </p>
        <div className="table-wrapper">
          <table className="my-table">
            <thead>
              <tr>
                <th className="table-entry-head">Month</th>
                <th className="table-entry-head">Spotify Excess Return</th>
                <th className="table-entry-head">Mkt-RF</th>
                <th className="table-entry-head">SMB</th>
                <th className="table-entry-head">HML</th>
              </tr>
            </thead>
            <tbody>
              {excessSpotReturns.map((row, index) => (
                <tr className="table-row" key={index}>
                  <td className="table-entry">{row.month}</td>
                  <td className="table-entry">{row.spotExcess.toFixed(4)}</td>
                  <td className="table-entry">{row.mktrf.toFixed(4)}</td>
                  <td className="table-entry">{row.smb.toFixed(4)}</td>
                  <td className="table-entry">{row.hml.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Under the CAPM, an asset’s excess return is explained entirely by its exposure to the market portfolio. 
          If the model successfully captures the relevant sources of risk, the intercept term should be close to zero.
          <MathJax className="math-container">
            {`\\[
            \\begin{aligned}
            R_{t} - R_{f,t} &= \\alpha + \\beta_{MKT}\\,(MKT_{t} - R_{f,t}) + \\varepsilon_{t}
            \\end{aligned}
            \\]`}
          </MathJax>
          Here, <MathJax inline>{"\\( R \\)"}</MathJax> is the return on the Spotify stock indexed by months <MathJax inline>{"\\( t \\)"}</MathJax>.
        </p>
        <p>
        Using the data, we have the following estimates for <MathJax inline>{"\\( \\alpha \\)"}</MathJax> and <MathJax inline>{"\\( \\beta_{MKT} \\)"}</MathJax>:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat \\alpha &= \\bar R - \\hat \\beta_{MKT} (\\overline{MKT}) \\approx ${y.toFixed(6)} - (${beta.toFixed(4)})${x1.toFixed(6)} \\approx ${alpha.toFixed(4)} \\\\
            \\hat \\beta_{MKT} &= \\frac{s_{MKT,R}}{s_{MKT}^2} \\approx \\frac{${cov1y.toFixed(6)}}{${var1.toFixed(6)}} \\approx ${beta.toFixed(4)} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
          In the Fama–French model, an asset’s excess return is explained by its sensitivity to each factor. 
          As before, if the model successfully captures the relevant sources of risk, the intercept term should be close to zero.
          <MathJax className="math-container">
            {`\\[
            \\begin{aligned}
            R_{t} - R_{f,t}
            &= \\alpha
            + \\beta_{MKT}\\,(MKT_{t} - R_{f,t}) + \\beta_{SMB}\\,SMB_t
            + \\beta_{HML}\\,HML_t
            + \\varepsilon_{t}
            \\end{aligned}
            \\]`}
          </MathJax>
        </p>
        <p>
        Adding in variables for size and value gives us the following coefficient estimates:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat \\beta = \\begin{bmatrix} \\hat \\alpha \\\\ \\hat \\beta_{MKT} \\\\ \\hat \\beta_{SMB} \\\\ \\hat \\beta_{HML} \\end{bmatrix} &= (X'X)^{-1}X'Y \\\\
            &= \\left(\\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ MKT_1 & MKT_2 & \\dots & MKT_T \\\\ SMB_1 & SMB_2 & \\dots & SMB_T \\\\ HML_1 & HML_2 & \\dots & HML_T \\end{bmatrix}  \\begin{bmatrix} 1 & MKT_1 & SMB_1 & HML_1 \\\\ 1 & MKT_2 & SMB_2 & HML_2 \\\\ \\vdots & \\vdots & \\vdots & \\vdots \\\\ 1 & MKT_T & SMB_T & HML_T \\end{bmatrix} \\right)^{-1}
            \\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ MKT_1 & MKT_2 & \\dots & MKT_T \\\\ SMB_1 & SMB_2 & \\dots & SMB_T \\\\ HML_1 & HML_2 & \\dots & HML_T \\end{bmatrix}  \\begin{bmatrix} R_1 \\\\ R_2 \\\\ \\vdots \\\\ R_T \\end{bmatrix} \\\\
            &\\approx \\begin{bmatrix} ${beta0.toFixed(4)} \\\\ ${beta1.toFixed(4)}  \\\\ ${beta2.toFixed(4)} \\\\ ${beta3.toFixed(4)} \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>

        <p>
          Under the CAPM, Spotify’s market beta is about 1.48, indicating that the stock is considerably more volatile than the market as a whole.
          When we introduce the size and value factors, the market beta falls to about 1.31.
          This tells us that part of what looked like market exposure in the CAPM regression was actually exposure to other systematic risks.
        </p>

        <p>
          The size coefficient (<MathJax inline>{"\\( \\beta_{SMB} \\approx 2.48 \\)"}</MathJax>) is large and positive,
          indicating that Spotify’s returns closely track the performance of small-cap stocks relative to large-cap stocks.
          Although Spotify is a well-known company, during this period it behaved more like a riskier, growth-oriented firm whose returns co-moved with smaller-cap stocks, reflecting higher volatility and sensitivity to economic conditions.
        </p>

        <p>
          The value coefficient (<MathJax inline>{"\\( \\beta_{HML} \\approx -1.31 \\)"}</MathJax>) is large and negative.
          This reflects Spotify’s growth-oriented characteristics: low book equity, limited current profitability, and high expectations about future growth.
          When growth stocks outperform value stocks, Spotify tends to perform well; when value stocks outperform, Spotify tends to lag.
        </p>

        <p>
          Most importantly, the intercept term changes sign and magnitude.
          Under the CAPM, Spotify appears to earn a positive alpha of about 0.02.
          Under the three-factor model, alpha becomes slightly negative and close to zero.
          This suggests that what initially looked like abnormal performance is largely explained by Spotify’s exposure to size and growth risk.
        </p>

        <p>
          In other words, the Fama–French model reframes Spotify’s returns over this period not as evidence of superior performance or mispricing, but as compensation for bearing systematic risks associated with small, growth-oriented firms.
        </p>
        <p className='heading2'>Other Factors</p>
        <p>
          The Fama–French three-factor model is only one example of a broader approach to asset pricing.
          Over time, researchers have identified many other variables that appear to help explain differences in stock returns.
          These variables are often referred to as <em>factors</em> and, like SMB and HML, are typically constructed as portfolio returns that isolate exposure to a particular characteristic.
        </p>

        <p>
          One commonly used extension is the <strong>momentum factor</strong>, which captures the tendency of stocks that have performed well in the recent past to continue performing well in the short term.
          Firms with strong recent returns tend to outperform firms with weak recent returns, even after controlling for market, size, and value risk.
        </p>

        <p>
          Another widely studied factor is <strong>profitability</strong>.
          Firms with high operating profits relative to their assets tend to earn higher average returns than less profitable firms.
          Similarly, an <strong>investment factor</strong> captures the tendency of firms that invest aggressively to earn lower future returns than firms that invest more conservatively.
        </p>

        <p>
          More broadly, researchers have proposed factors based on a wide range of firm characteristics, including leverage, liquidity, volatility, payout policy, and accounting accruals.
          In principle, any characteristic that is correlated with returns across many firms could be turned into a factor-mimicking portfolio.
        </p>

        <p>
          This proliferation of proposed factors has led to what is often called the "<a className='inline-link' href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3341728" target="_blank" rel="noopener noreferrer">factor zoo</a>."
          While many factors appear statistically significant in sample, not all of them reflect true sources of systematic risk.
          Distinguishing meaningful factors from spurious ones remains an active area of research.
        </p>

        </MathJaxContext>
        <PageNavigator group="Risk"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/risk">Contents</NavLink></div>
        </div>
  );
}

export default Risk7;