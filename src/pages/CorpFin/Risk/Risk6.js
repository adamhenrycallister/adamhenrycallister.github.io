import React, { useState } from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
// import ExampleBox from "../../../components/ExampleBox";

const tableData = [
  {
    month: "December 2017",
    google: 51.93,
    sp500: 2673.61,
    tbill: 1.14,
  },
  {
    month: "January 2018",
    google: 58.06,
    sp500: 2823.81,
    tbill: 1.29,
  },
  {
    month: "February 2018",
    google: 54.83,
    sp500: 2713.83,
    tbill: 1.41,
  },
  {
    month: "March 2018",
    google: 51.21,
    sp500: 2640.87,
    tbill: 1.5,
  },
  {
    month: "April 2018",
    google: 50.49,
    sp500: 2648.05,
    tbill: 1.68,
  },
  {
    month: "May 2018",
    google: 53.85,
    sp500: 2705.27,
    tbill: 1.68,
  },
  {
    month: "June 2018",        
    google: 55.37,
    sp500: 2718.37,
    tbill: 1.74,
  },
  {
    month: "July 2018",    
    google: 60.41,  
    sp500: 2816.29,   
    tbill: 1.9,
  },
  {
    month: "August 2018",        
    google: 60.46,
    sp500: 2901.52,
    tbill: 1.93,
  },
  {
    month: "September 2018",          
    google: 59.23,
    sp500: 2913.98,
    tbill: 1.95,
  },
  {
    month: "October 2018",        
    google: 53.44,
    sp500: 2711.74,
    tbill: 2.13,
  },
  {
    month: "November 2018",          
    google: 54.31,
    sp500: 2760.17,
    tbill: 2.21,
  },
  {
    month: "December 2018",           
    google: 51.40,
    sp500: 2506.85,
    tbill: 2.3,
  },
  {
    month: "January 2019",        
    google: 55.40,
    sp500: 2704.10,
    tbill: 2.4,
  },
  {
    month: "February 2019",    
    google: 55.58,   
    sp500: 2784.49,  
    tbill: 2.41,
  },
  {
    month: "March 2019",          
    google: 58.23,
    sp500: 2834.40,
    tbill: 2.44,
  },
  {
    month: "April 2019",         
    google: 58.98,
    sp500: 2945.83,
    tbill: 2.42,
  },
  {
    month: "May 2019",       
    google: 54.77,
    sp500: 2752.06,
    tbill: 2.42,
  },
  {
    month: "June 2019",           
    google: 53.64,
    sp500: 2941.76,
    tbill: 2.36,
  },
  {
    month: "July 2019",           
    google: 60.38,
    sp500: 2980.38,
    tbill: 2.17,
  },
  {
    month: "August 2019",         
    google: 58.96,
    sp500: 2926.74,
    tbill: 2.11,
  },
  {
    month: "September 2019",          
    google: 60.50,
    sp500: 2976.74,
    tbill: 2.06,
  },
  {
    month: "October 2019",        
    google: 62.54,
    sp500: 3037.56,
    tbill: 1.79,
  },
  {
    month: "November 2019",           
    google: 64.76,
    sp500: 3140.98,
    tbill: 1.58,
  },
  {
    month: "December 2019",         
    google: 66.35,
    sp500: 3230.78,
    tbill: 1.6,
  },
];

const computedTableData = tableData.map((row, index) => {
  const prevRow = tableData[index - 1];

  const googleReturn = prevRow
    ? (row.google - prevRow.google) / prevRow.google
    : null;

  const sp500Return = prevRow
    ? (row.sp500 - prevRow.sp500) / prevRow.sp500
    : null;

  const monthlyTbill = row.tbill / 12 / 100;

  return {
    month: row.month,

    googlePrice: row.google,
    googleReturn,

    sp500Price: row.sp500,
    sp500Return,

    tbillMonthly: monthlyTbill,

    // Optional: keep excess returns here too
    googleExcess:
      googleReturn !== null ? googleReturn - monthlyTbill : null,

    sp500Excess:
      sp500Return !== null ? sp500Return - monthlyTbill : null,
  };
});



const excessReturns = tableData.slice(1).map((row, index) => {
  const prevRow = tableData[index];

  const googleReturn =
    (row.google - prevRow.google) / prevRow.google;

  const sp500Return =
    (row.sp500 - prevRow.sp500) / prevRow.sp500;

  const monthlyTbill = row.tbill / 12 / 100;

  return {
    month: row.month,
    googleExcess: googleReturn - monthlyTbill,
    sp500Excess: sp500Return - monthlyTbill,
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


const googleExcessArr = excessReturns.map(r => r.googleExcess);
const sp500ExcessArr = excessReturns.map(r => r.sp500Excess);

const googleExcessMean = mean(googleExcessArr);
const sp500ExcessMean = mean(sp500ExcessArr);

const covGSP = covariance(googleExcessArr, sp500ExcessArr);
const varSP = variance(sp500ExcessArr);

const beta = covGSP / varSP;
const alpha = googleExcessMean - sp500ExcessMean*beta;

function Risk6() {
  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
        <p className='heading1'>CAPM and Regression</p>
        <MathJaxContext>
        <p className='heading2'>Estimating Beta</p>
        <p>
        So far, we have used the assumption that all investors are mean-variance optimizers to derive a relationship between the expected return on the market portfolio <MathJax inline>{"\\( E[R_m] \\)"}</MathJax>, the risk-free return <MathJax inline>{"\\( R_f \\)"}</MathJax>, and 
        the expected return on any other asset <MathJax inline>{"\\( E[R_k] \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                E[R_k] - R_f = \\overbrace{\\frac{\\text{cov}(R_m, R_k)}{\\text{var}(R_m)}}^{\\beta_k}(E[R_m] - R_f)
            \\end{aligned}
          \\]`}   
        </MathJax> 
        Recall that beta measures how much an asset’s return tends to move when the market moves. A beta of 1 means the asset moves one-for-one with the market; a beta greater than 1 means it amplifies market movements; a beta less than 1 means it dampens them.
        </p>
        <p>
        If we think back to the lesson on <NavLink className='inline-link' to="/stats/regression">Linear Regression</NavLink>, the expression <MathJax inline>{"\\( \\beta_k = \\frac{\\text{cov}(R_m, R_k)}{\\text{var}(R_m)} \\)"}</MathJax> should look familiar. Recall that in the regression model 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                y_i = \\alpha + \\beta x_i + \\varepsilon_i
            \\end{aligned}
          \\]`}   
        </MathJax> 
        we have <MathJax inline>{"\\( \\beta = \\frac{\\text{cov}(x_i,y_i)}{\\text{var}(x_i)} \\)"}</MathJax>. If we plug in <MathJax inline>{"\\( y_i = R_k - R_f \\)"}</MathJax> and <MathJax inline>{"\\( x_i = R_m - R_f \\)"}</MathJax>, <MathJax inline>{"\\( \\beta \\)"}</MathJax> becomes 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                \\beta = \\frac{\\text{cov}(R_m - R_f, R_k - R_f)}{\\text{var}(R_m - R_f)} = \\frac{\\text{cov}(R_m, R_k)}{\\text{var}(R_m)} = \\beta_k
            \\end{aligned}
          \\]`}   
        </MathJax> 
        Thus, the coefficient from a regression of <MathJax inline>{"\\( R_k - R_f \\)"}</MathJax> on <MathJax inline>{"\\( R_m - R_f \\)"}</MathJax> should produce the same <MathJax inline>{"\\( \\beta_k \\)"}</MathJax> from the CAPM. 
        This relationship allows us to use linear regression to estimate <MathJax inline>{"\\( \\beta_k \\)"}</MathJax> empirically.
        </p>
        <p className='heading2'>What about Alpha?</p>
        <p>
        Let's revisit the CAPM equation with the structure of a linear regression model in mind. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                \\overbrace{E[R_k] - R_f}^{y_i} = \\overbrace{\\frac{\\text{cov}(R_m, R_k)}{\\text{var}(R_k)}}^{\\beta}\\overbrace{(E[R_m] - R_f)}^{x_i}
            \\end{aligned}
          \\]`}   
        </MathJax> 
        You'll notice that the linear regression model has an intercept term <MathJax inline>{"\\( \\alpha \\)"}</MathJax> that is missing from the CAPM equation. 
        This means that if the CAPM holds, the intercept term on a linear regression of the above form should be zero. 
        </p>
        <p>
        If <MathJax inline>{"\\( \\alpha > 0 \\)"}</MathJax>, then the asset earns abnormally high returns relative to what the CAPM predicts. 
        If <MathJax inline>{"\\( \\alpha < 0 \\)"}</MathJax>, then the asset earns abnormally low returns relative to what the CAPM predicts.
        </p>
        <p className='heading2'>Testing the CAPM</p>
        <p>
        The fact that the CAPM predicts <MathJax inline>{"\\( \\alpha = 0 \\)"}</MathJax> in a linear regression creates an empirical test of the CAPM. Let's go through the process of testing this for a single asset. 
        </p>
        <p>
        First, we need to choose a time interval over which to measure returns. For this example, we'll use monthly data.
        We'll use <a className='inline-link' href="https://finance.yahoo.com/quote/GOOG/history/" target="_blank" rel="noopener noreferrer">Google</a> stock as our asset. We can proxy for the market portfolio with a market stock price index like <a className='inline-link' href="https://finance.yahoo.com/quote/%5EGSPC/history/" target="_blank" rel="noopener noreferrer">the S&P 500</a>, which includes the top 500 companies listed on U.S. stock exchanges. 
        We'll use the yield-to-maturity on <a className='inline-link' href="https://fred.stlouisfed.org/series/DGS1MO" target="_blank" rel="noopener noreferrer">1-month Treasury Bills</a> as the risk-free rate. 
        </p>
        <div className="table-wrapper">
          <table className="my-table">
            <thead>
              <tr>
                <th className="table-entry-head">Month</th>
                <th className="table-entry-head">Google Stock Price</th>
                <th className="table-entry-head">S&P 500 Price</th>
                <th className="table-entry-head">1-Month T-Bill YTM</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr className="table-row" key={index}>
                  <td className="table-entry">{row.month}</td>
                  <td className="table-entry">{row.google}</td>
                  <td className="table-entry">{row.sp500.toLocaleString()}</td>
                  <td className="table-entry">{row.tbill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
        First, we need to calculate the monthly return of Google stock and the S&P 500 during 2018 and 2019. Recall that the period <MathJax inline>{"\\( t \\)"}</MathJax> return is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                R_t = \\frac{P_t - P_{t-1}}{P_{t-1}}
            \\end{aligned}
          \\]`}   
        </MathJax> 
        We also need to adjust the T-Bill yield. The FRED website reports an annual percentage rate, so we must divide by 100 and then divide by 12.
        </p>
        <div className="table-wrapper">
          <table className="my-table">
            <thead>
              <tr>
                <th className="table-entry-head">Month</th>
                <th className="table-entry-head">Google Price</th>
                <th className="table-entry-head">Google Monthly Return</th>
                <th className="table-entry-head">S&P 500 Price</th>
                <th className="table-entry-head">S&P 500 Monthly Return</th>
                <th className="table-entry-head">Monthly T-Bill Rate</th>
              </tr>
            </thead>

            <tbody>
              {computedTableData.map((row, index) => (
                <tr className="table-row" key={index}>
                  <td className="table-entry">{row.month}</td>

                  <td className="table-entry">{row.googlePrice}</td>
                  <td className="table-entry">
                    {row.googleReturn !== null
                      ? row.googleReturn.toFixed(6)
                      : "—"}
                  </td>

                  <td className="table-entry">
                    {row.sp500Price.toLocaleString()}
                  </td>
                  <td className="table-entry">
                    {row.sp500Return !== null
                      ? row.sp500Return.toFixed(6)
                      : "—"}
                  </td>

                  <td className="table-entry">
                    {row.tbillMonthly.toFixed(6)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
        Finally, we'll calculate excess returns as the monthly return on the asset minus the risk-free return for that month. 
        </p>
        <div className="table-wrapper">
        <table className="my-table">
        <thead>
          <tr>
            <th className="table-entry-head">Month</th>
            <th className="table-entry-head">Google Excess Return</th>
            <th className="table-entry-head">S&P 500 Excess Return</th>
          </tr>
        </thead>
        <tbody>
          {excessReturns.map((row, index) => (
            <tr className="table-row" key={index}>
              <td className="table-entry">{row.month}</td>
              <td className="table-entry">{row.googleExcess.toFixed(6)}</td>
              <td className="table-entry">{row.sp500Excess.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
        <p>
        Now, using the Google excess return as our <MathJax inline>{"\\( y \\)"}</MathJax> variable and the S&P 500 excess return as our <MathJax inline>{"\\( x \\)"}</MathJax> variable, we can 
        find the slope and intercept parameters in a linear regression.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat \\beta &= \\frac{s_{x,y}}{s_x^2} \\approx \\frac{${covGSP.toFixed(6)}}{${varSP.toFixed(6)}} \\approx ${beta.toFixed(4)} \\\\
            \\hat \\alpha &= \\bar y - \\hat \\beta \\bar x \\approx ${sp500ExcessMean.toFixed(6)} - (${beta.toFixed(4)})${googleExcessMean.toFixed(6)} \\approx ${alpha.toFixed(4)}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        The estimated beta for Google is close to one, indicating that its excess returns tend to move roughly one-for-one with the excess returns of the overall market. 
        In other words, Google exhibits a level of systematic risk that is similar to that of the market portfolio, neither consistently amplifying nor dampening broad market movements.
        </p>
        <p>
        The estimated alpha is small and close to zero, which is consistent with the CAPM prediction that <MathJax inline>{"\\( \\alpha = 0 \\)"}</MathJax>. 
        Under the CAPM, expected excess returns are fully explained by exposure to market risk, so securities should not earn persistent abnormal returns after adjusting for beta.
        This suggests that Google’s return behavior is well described by its sensitivity to market-wide fluctuations. 
        </p>
        <p className='heading2'>Limitations</p>
        <p>
        Estimating alpha for a single stock is not, by itself, a strong test of the CAPM. 
        Finding that Google's alpha is close to zero is consistent with the model, but it does not provide decisive evidence in its favor. 
        The CAPM makes a joint prediction: all assets should have zero alpha when expected returns are measured relative to the true market portfolio. 
        As a result, testing the model properly requires a joint test that all alphas are simultaneously equal to zero across a broad set of assets. 
        Rejecting or failing to reject the CAPM therefore depends on the collective behavior of many securities, not the estimate for any one stock in isolation.
        </p>
        <p>
        Implenting such a joint test also forces us to decide on a single "market portfolio."
        In theory, the CAPM market portfolio includes all investable assets in the economy, weighted by their market values. 
        This includes not only publicly traded equities, but also bonds, real estate, private businesses, and other forms of wealth. 
        In practice, empirical tests typically use a stock market index, such as the S&P 500, as a proxy for the market portfolio. 
        </p>
        <p>
        Whether or not the CAPM is actually "correct," it is widely used in practice. 
        The model is transparent, well-established, and grounded in economic theory. 
        Thus, even though the CAPM is an imperfect description of reality, it continues to serve as a common reference point for translating risk into expected return in applied financial analysis.
        </p>
        </MathJaxContext>
        <PageNavigator group="Risk"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/risk">Contents</NavLink></div>
        </div>
  );
}

export default Risk6;