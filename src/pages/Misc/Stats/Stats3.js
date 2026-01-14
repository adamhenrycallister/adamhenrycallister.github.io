import React, { useState } from 'react';
import './Stats.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
// import ExampleBox from "../../../components/ExampleBox";


function Stats3() {
  return (
        <div className='Stats'>
        <PageNavigator group="Stats" />
        <p className='heading1'>Samples</p>
        <MathJaxContext>
        <p className='heading2'>Population vs. Sample</p>
        <p>
        Up to this point, we have assumed that we know how the data is generated. 
        That is, we know the full probability distribution of the random variables we are studying, which allows us to compute expected values, variances, covariances, and correlations exactly.
        </p>
        <p>
        In many real situations, however, the data-generating process is unknown. 
        Instead, we essentially observe outputs from a black box: on each trial, the box produces an outcome, but the mechanism inside is hidden from us.
        </p>
        <p>
        When the data-generating process is known, we can work with population quantities. 
        When it is unknown, we must estimate those quantities using only the data we observe.
        </p>
        <p className='heading2'>Probabilities and Observations</p>
        <p>
        When we know the entire distribution of a random variable, we know the probability of each outcome. When we don't know the data-generating process, we estimate the underlying probability of an outcome based on how frequently we actually see it occur. 
        Suppose we observe the following values drawn from some unknown distribution of <MathJax inline>{"\\( \\tilde x \\)"}</MathJax>: 1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 6.
        We can estimate the probability of each outcome using its frequency. Given 12 total observations, we have the following frequencies:
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head">Outcome</th>
              <th className="table-entry-head"># of Observations</th>
              <th className="table-entry-head">Frequency</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">1</td>
              <td className="table-entry">3</td>
              <td className="table-entry">3/12</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">2</td>
              <td className="table-entry">1</td>
              <td className="table-entry">1/12</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">3</td>
              <td className="table-entry">2</td>
              <td className="table-entry">2/12</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">4</td>
              <td className="table-entry">2</td>
              <td className="table-entry">2/12</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">5</td>
              <td className="table-entry">1</td>
              <td className="table-entry">1/12</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">6</td>
              <td className="table-entry">3</td>
              <td className="table-entry">3/12</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        If we use these frequencies as our probabilities, we can estimate the expected value and variance of the distribution.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             E[\\tilde x] \\approx&\\; 1\\left(\\frac{3}{12}\\right) + 2\\left(\\frac{1}{12}\\right) + 3\\left(\\frac{2}{12}\\right)
             + 4\\left(\\frac{2}{12}\\right) + 5\\left(\\frac{1}{12}\\right) + 6\\left(\\frac{3}{12}\\right) \\\\
             =&\\; 3.5 \\\\ \\\\
             \\text{var}(\\tilde x) \\approx&\\; (1-3.5)^2\\left(\\frac{3}{12}\\right) + (2-3.5)^2\\left(\\frac{1}{12}\\right) + (3-3.5)^2\\left(\\frac{2}{12}\\right) \\\\
             &+ (4-3.5)^2\\left(\\frac{2}{12}\\right) + (5-3.5)^2\\left(\\frac{1}{12}\\right) + (6-3.5)^2\\left(\\frac{3}{12}\\right) \\\\
             \\approx&\\; 3.58
            \\end{aligned}
          \\]`}
        </MathJax>  
        Instead of estimating each probability individually, we could arrive at the same result for the expected value by simply summing up each observation and dividing by the total number of observations. 
        </p>
        <p>
        We can use a similar strategy for the variance by treating each individual observation as having probability one divided by the number of observations.
        However, in practice, we actually treat each observation as having probability one over one less than the total number of observations when estimating variance. This adjustment accounts for the fact that the expected value itself is estimated from the data. 
        </p>
        <p className='heading2'>Sample Statistics</p>
        <p>
        Suppose we observe <MathJax inline>{"\\( N \\)"}</MathJax> draws over time from two unknown distributions: <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y \\)"}</MathJax>. We'll label each observation by the period it was drawn. This gives us <MathJax inline>{"\\( x_1, x_2, \\dots, x_N \\)"}</MathJax> and <MathJax inline>{"\\( y_1, y_2, \\dots, y_N \\)"}</MathJax>.
        The following table compares the population-level statistics we coverd in the last two sections to their sample analogues: 
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head">Statistic</th>
              <th className="table-entry-head">Population</th>
              <th className="table-entry-head">Sample</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">Mean</td>
              <td className="table-entry"><MathJax inline>{"\\( E[\\tilde x] \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\bar x = \\frac{1}{N}\\sum^N_{t=1}x_t\\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Variance</td>
              <td className="table-entry">        
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                     \\text{var}(\\tilde x) &= E\\left[\\left(\\tilde x - E[\\tilde x]\\right)^2\\right] \\\\
                     &= E\\left[\\tilde x^2\\right] - \\left(E[\\tilde x]\\right)^2
                    \\end{aligned}
                  \\]`}
                </MathJax>  
              </td>
              <td className="table-entry"><MathJax inline>{"\\( s_x^2 = \\frac{1}{N-1}\\sum^N_{t=1}(x_t-\\bar x)^2\\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Standard Deviation</td>
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                     \\text{std}(\\tilde x) &= \\sqrt{E\\left[\\left(\\tilde x - E[\\tilde x]\\right)^2\\right]} \\\\
                     &= \\sqrt{E\\left[\\tilde x^2\\right] - \\left(E[\\tilde x]\\right)^2}
                    \\end{aligned}
                  \\]`}
                </MathJax>  
              <td className="table-entry"><MathJax inline>{"\\( s_x = \\sqrt{\\frac{1}{N-1}\\sum^N_{t=1}(x_t-\\bar x)^2} \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Covariance</td>
              <td className="table-entry">        
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                     \\text{cov}(\\tilde x, \\tilde y) &= E\\left[\\left(\\tilde x - E[\\tilde x]\\right)\\left(\\tilde y-E[\\tilde y]\\right)\\right] \\\\
                     &= E[\\tilde x\\tilde y] - E[\\tilde x]E[\\tilde y]
                    \\end{aligned}
                  \\]`}
                </MathJax>  
              </td>
              <td className="table-entry"><MathJax inline>{"\\( s_{x,y}= \\frac{1}{N-1}\\sum^N_{t=1}(x_t-\\bar x)(y_t - \\bar y)\\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Correlation</td>
              <td className="table-entry"><MathJax inline>{"\\( \\text{corr}(\\tilde x, \\tilde y) = \\frac{\\text{cov}(\\tilde x, \\tilde y)}{\\sqrt{\\text{var}(\\tilde x)\\text{var}(\\tilde y)}}\\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( r_{x,y}= \\frac{s_{x,y}}{s_x s_y}\\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        </MathJaxContext>
      <PageNavigator group="Stats"/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/stats">Contents</NavLink></div>
        </div>
  );
}
export default Stats3;