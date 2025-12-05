import React, { useState } from 'react';
import './Mortgages.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
// import ExampleBox from "../../components/ExampleBox";


function Mortgages1() {
  return (
        <div className='Mortgages'>
        <PageNavigator group="Mortgages" />
        <p className='heading1'>Mortgage Points</p>
        <MathJaxContext>
        <p>
        Mortgage points allow borrowers to reduce their mortgage rate by a specified amount (usually 12 to 25 basis points per mortgage point) in exchange for an upfront fee. 
        Each point costs 1% of the loan amount. 
        </p> 
        <p>
        Suppose you have a $100,000 loan with a 5% interest rate. If each point reduces your rate by 15 basis points, then purchasing one point would cost <MathJax inline>{"\\( \\frac{\\$100,000}{100} = \\$1,000 \\)"}</MathJax> and 
        reduce your rate to <MathJax inline>{"\\( 0.05 - 0.0015 = 4.85\\% \\)"}</MathJax>. 
        </p>
        <p>
        Lenders typically allow borrowers to purchase fractional points, but borrowers cannot buy unlimited points. Suppose you could buy unlimited points. Using the above example, you could 
        buy <MathJax inline>{"\\( 33\\frac{1}{3} \\)"}</MathJax> points for <MathJax inline>{"\\( 33\\frac{1}{3}\\times \\frac{100000}{100} = $33,333.33 \\)"}</MathJax> and walk away with a zero-interest loan <MathJax inline>{"\\( \\left(0.05 - \\left(33\\frac{1}{3}\\right)(0.0015) = 0\\right)\\)"}</MathJax>. 
        </p>
        <p>
        In general, purchasing points is only a good idea if you plan on staying with your mortgage for a long time. If you think you might sell your house or refinance within a few years, you probably shouldn't buy points. However, the exact amount of time you must stay with your mortgage to justify purchasing points 
        depends on a number of different factors. Let's think through a few ways to formulate the problem.
        </p>
        <p>
        Before we jump in, let's set some notation. We'll consider a <MathJax inline>{"\\( T \\)"}</MathJax>-month loan of $<MathJax inline>{"\\( P \\)"}</MathJax> at a monthly rate of <MathJax inline>{"\\( (r\\times100)\\% \\)"}</MathJax>. We'll consider buying <MathJax inline>{"\\( m \\)"}</MathJax> points that each reduce the monthly rate by <MathJax inline>{"\\( ((\\delta\\times 100)\\times 100) \\)"}</MathJax> basis points. 
        Finally, let's say that you actually stay with the mortgage for <MathJax inline>{"\\( T' \\)"}</MathJax> months.
        </p>
        <p className='heading2'>Monthly Payment Savings</p>
        <p>
        One way to decide whether to buy points is to compare the total cost of the points to the total monthly payment savings during the period you stay with the mortgage. If you don't purchase points, the monthly payment is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             M = \\frac{Pr}{1 - (1+r)^{-T}}
            \\end{aligned}
          \\]`}
        </MathJax> 
        If you do purchase points, your new rate is given by <MathJax inline>{"\\( r - m\\delta \\)"}</MathJax>, which leads to the following monthly payment
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             M' = \\frac{P(r-m\\delta)}{1 - (1+r - m\\delta)^{-T}}
            \\end{aligned}
          \\]`}
        </MathJax> 
        The decision rule here is to purchase points if the total savings is greater than the cost of the points, or if
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              T'(M - M') > \\frac{mP}{100} \\quad\\quad\\quad  &\\text{(1)} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        The threshold point, or the minimum number of months you must stay with the mortgage to justify purchasing points, is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              T' = \\frac{m\\left[1 - (1+r)^{-T}\\right]\\left[1 - (1+r-m\\delta)^{-T}\\right]}{100\\left[m\\delta +(1+r)^{-T}(r-m\\delta) - r(1+r-m\\delta)^{-T}\\right]} 
            \\end{aligned}
          \\]`}
        </MathJax>  
        This rule is fairly simple and gives a nice, closed-form solution for the minimum number of months we need to justify purchasing points, but it has some drawbacks. 
        This rule does not account for (1) equity, (2) time discounting, or (3) taxes.
        </p>
        <p className='heading2'>Home Equity</p>
        <p>
        Buying points not only reduces the monthly payment but also changes the amortization path of the loan. In other words, you may build equity over time differently in a world where you purchase points than in a world where you don't purchase points. To account for this, let's 
        first find a formula for the remaining balance of the loan at month <MathJax inline>{"\\( t \\)"}</MathJax>:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                B_0 &= P \\\\
                B_1 &= (1+r)B_0 - M = (1+r)P - M \\\\
                B_2 &= (1+r)B_1 - M = (1+r)^2P - M[(1+r) + 1]\\\\
                B_3 &= (1+r)B_2 - M = (1+r)^3P - M[(1+r)^2 + (1+r) + 1]\\\\
                \\vdots \\\\
                B_t &= (1+r)^tP - M[(1+r)^{t-1} + \\dots + (1+r) + 1]\\\\
                &= (1+r)^tP - M\\sum^{t-1}_{j=0} (1+r)^j \\\\
                &= (1+r)^tP - M\\left(\\frac{(1+r)^t-1}{r}\\right)
            \\end{aligned}
          \\]`}
        </MathJax> 
        If <MathJax inline>{"\\(  M = \\frac{Pr}{1 - (1+r)^{-T}} \\)"}</MathJax>, this further reduces to 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                B_t = P\\left(\\frac{(1+r)^T - (1+r)^t}{(1+r)^T - 1}\\right)
            \\end{aligned}
          \\]`}
        </MathJax>  
        The difference in equity is given by the difference between the balance without points and the balance with points at the time of exit <MathJax inline>{"\\( (B_{T'} - B'_{T'}) \\)"}</MathJax>. 
        Including this in the decision rule, it is better to buy points if 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              T'(M - M') + (B_{T'} - B'_{T'}) > \\frac{mP}{100}  \\quad\\quad\\quad  &\\text{(2)} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Time Discounting</p>
        <p>
        Up to this point, we have ignored the fact that the savings from purchasing points occurs at later points in time than the initial fee to purchase points. 
        To make a valid comparison, we must discount everything back to its present value at the beginning of the mortgage. Let's assume the borrower has a discount rate of <MathJax inline>{"\\( (i\\times100)\\% \\)"}</MathJax>. 
        The decision rule now becomes to buy points if 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\sum^{T'}_{t=1}\\frac{M - M'}{(1+i)^t} + \\frac{B_{T'} - B'_{T'}}{(1+i)^{T'}} > \\frac{mP}{100}
            \\end{aligned}
          \\]`}
        </MathJax>
        or if 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              (M - M')\\left(\\frac{1-(1+i)^{-T'}}{i}\\right) + \\frac{B_{T'} - B'_{T'}}{(1+i)^{T'}} > \\frac{mP}{100} \\quad\\quad\\quad  &\\text{(3)} 
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>
        <p className='heading2'>Alternative Setup</p>
        <p>
        Time discounting gives us a more accurate decision rule, but it comes at the cost of a more complicated setup. It also forces us to decide on a discount rate for the borrower. 
        The mortgage rate seems like a natural choice for the borrower's discount rate, but which mortgage rate? The before-points rate or the after-points rate? 
        </p>
        <p>
        Let's consider a more intuitive setup that will simplify some things. Instead of deciding whether to purchase points or not purchase points, suppose the borrower is deciding between (1) purchasing points and (2) 
        increasing their down payment by the exact amount that they would have spent on points. In other words, the borrower can either (1) reduce their rate to <MathJax inline>{"\\( r - m\\delta \\)"}</MathJax> or (2) reduce the 
        loan principal to <MathJax inline>{"\\( P - m\\frac{P}{100}\\)"}</MathJax>.
        </p>
        <p>
        In addition, let's assume that, under either choice, the borrower makes the same monthly payment. To do this, we'll say that the borrower slightly increases the amount they are required to pay if they purchase points to match the 
        amount that they would have been required to pay had they not purchased points (the extra goes toward paying down the principal).
        </p>
        <p>
        With these assumptions in place, we've eliminated the need for time discounting. The borrower makes the same initial payment (either toward points or an increased down payment) and the same monthly payments. 
        The only meaningful difference is the amount of equity the borrower has when they exit the mortgage. Thus, the decision rule is to buy points if the remaining balance with points is less than the remaining balance without points, or if 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              B^p_{T'} < B^d_{T'} \\quad\\quad\\quad  &\\text{(4)} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        where 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              B^p_{T'} &= (1+r-m\\delta)^{T'}P - M\\left(\\frac{(1+r-m\\delta)^{T'}-1}{r-m\\delta}\\right) \\\\
              B^d_{T'} &= (1+r)^{T'}P\\left(1 - \\frac{m}{100}\\right) - M\\left(\\frac{(1+r)^{T'}-1}{r}\\right)  \\\\
                M &= \\frac{P\\left(1 - \\frac{m}{100}\\right)r}{1 - (1+r)^{-T}}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Decision Rule Comparisons</p>
        <p>
        Let's compare the four decision rules given by inequalities (1)-(4). To recap, decision rule #1 says to buy points if the total nominal monthly payment savings is greater than the cost of the points. Decision rule #2 says to buy points if the total nominal monthly payment savings plus the total increase in home equity is greater 
        than the cost of the points. Decision rule #3 adds time discounting to move the nominal monthly payment savings and increased home equity back to present value at the time of point purchase. For this decision rule, we'll assume that the borrower uses a discount rate equal to the mortgage rate without purchasing points. 
        Finally, decision rule #4 assumes that, if the borrower doesn't buy points, they instead put that money toward an increased down payment. In addition, if the borrower does buy points, they voluntarily increase their monthly payment to match what they would have paid had they not purchased the points. Under this decision rule, the borrower 
        should purchase points if the remaining loan balance with points is less than the remaining loan balance without points at the time of exit. 
        </p>
        <p>
        We'll assume the borrower is taking on a 30-year mortgage and deciding whether to purchase a single point. Note that <MathJax inline>{"\\( P \\)"}</MathJax> cancels out of each decision rule, 
        so the initial loan amount does not matter. The table entries below give the minimum number of months you would have to stay with the mortgage to justify buying a single point given an initial annual rate, basis point rate reduction, and decision rule.
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr className="table-row table-group-header">
              <th className="table-entry-head-empty" colSpan={2}></th>
              <th className="table-entry-head">Rule 1</th>
              <th className="table-entry-head">Rule 2</th>
              <th className="table-entry-head">Rule 3</th>
              <th className="table-entry-head">Rule 4</th>
            </tr>
            <tr className="table-row table-column-label">
              <th className="table-entry-head">Annual Rate</th>
              <th className="table-entry-head">Basis Point Reduction</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">15</td>
              <td className="table-entry">134.12</td>
              <td className="table-entry">85.70</td>
              <td className="table-entry">96.45</td>
              <td className="table-entry">96.69</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">2%</td>
              <td className="table-entry">20</td>
              <td className="table-entry">100.80</td>
              <td className="table-entry">63.01</td>
              <td className="table-entry">68.44</td>
              <td className="table-entry">68.63</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">25</td>
              <td className="table-entry">80.80</td>
              <td className="table-entry">49.86</td>
              <td className="table-entry">53.16</td>
              <td className="table-entry">53.30</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-new"></td>
              <td className="table-entry-new">15</td>
              <td className="table-entry-new">116.18</td>
              <td className="table-entry-new">82.09</td>
              <td className="table-entry-new">102.72</td>
              <td className="table-entry-new">103.03</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">4%</td>
              <td className="table-entry">20</td>
              <td className="table-entry">87.28</td>
              <td className="table-entry">61.07</td>
              <td className="table-entry">71.40</td>
              <td className="table-entry">71.62</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">25</td>
              <td className="table-entry">69.93</td>
              <td className="table-entry">48.65</td>
              <td className="table-entry">54.88</td>
              <td className="table-entry">55.06</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-new"></td>
              <td className="table-entry-new">15</td>
              <td className="table-entry-new">104.06</td>
              <td className="table-entry-new">80.02</td>
              <td className="table-entry-new">111.32</td>
              <td className="table-entry-new">111.70</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">6%</td>
              <td className="table-entry">20</td>
              <td className="table-entry">78.14</td>
              <td className="table-entry">59.95</td>
              <td className="table-entry">75.16</td>
              <td className="table-entry">75.43</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">25</td>
              <td className="table-entry">62.59</td>
              <td className="table-entry">47.95</td>
              <td className="table-entry">57.02</td>
              <td className="table-entry">57.23</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-new"></td>
              <td className="table-entry-new">15</td>
              <td className="table-entry-new">95.88</td>
              <td className="table-entry-new">78.94</td>
              <td className="table-entry-new">123.55</td>
              <td className="table-entry-new">124.02</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">8%</td>
              <td className="table-entry">20</td>
              <td className="table-entry">71.97</td>
              <td className="table-entry">59.37</td>
              <td className="table-entry">79.98</td>
              <td className="table-entry">80.30</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">25</td>
              <td className="table-entry">57.63</td>
              <td className="table-entry">47.63</td>
              <td className="table-entry">59.63</td>
              <td className="table-entry">59.87</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-new"></td>
              <td className="table-entry-new">15</td>
              <td className="table-entry-new">90.38</td>
              <td className="table-entry-new">78.50</td>
              <td className="table-entry-new">142.29</td>
              <td className="table-entry-new">142.88</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">10%</td>
              <td className="table-entry">20</td>
              <td className="table-entry">67.83</td>
              <td className="table-entry">59.14</td>
              <td className="table-entry">86.23</td>
              <td className="table-entry">86.61</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">25</td>
              <td className="table-entry">54.30</td>
              <td className="table-entry">47.45</td>
              <td className="table-entry">62.82</td>
              <td className="table-entry">63.10</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        Note that rule #3 and rule #4 give almost the same answer in each case. Because rule #4 has a more intuitive setup and is considerably simpler than rule #3, I use rule #4 in the decision calculator on the following page. 
        Also note that rule #2 will always overstate the value of points relative to the other rules. Rule #1 will tend to understate the value of points if the initial interest rate is low and overstate the value of points if the initial interest rate is high (as compared with rules #3 and #4). Although rule #1 is relatively easy to implement, 
        it may give an answer that is considerably different from rules #3 and #4. For example, with an initial 8% interest rate and a 15 basis point reduction, rule #1 would tell you that buying a point is worth it as long as you stay with the mortgage for at least 8 years while rules #3 and #4 suggest that you would have to stay with the mortgage for over 10 years to justify purchasing a point.
        </p>
        <p className='heading2'>Taxes</p>
        <p>
        If you itemize deductions, mortgage interest payments reduce your taxable income. Suppose your marginal tax rate is <MathJax inline>{"\\( \\tau \\)"}</MathJax>. 
        If you pay <MathJax inline>{"\\( Ar \\)"}</MathJax> in mortgage interest, you have a tax savings of <MathJax inline>{"\\( (Ar)\\tau \\)"}</MathJax>. This makes your net, after-tax
        loss only <MathJax inline>{"\\( Ar - (Ar)\\tau = Ar(1-\\tau)\\)"}</MathJax>. Thus, we can account for taxes by using the effective, after-tax rate <MathJax inline>{"\\( r(1-\\tau) \\)"}</MathJax>.
        </p>
        </MathJaxContext>
        <PageNavigator group="Mortgages"/>
        </div>
  );
}

export default Mortgages1;