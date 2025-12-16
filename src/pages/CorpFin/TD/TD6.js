import React from 'react';
import './TimeDiscounting.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";
import ExampleBox from "../../../components/ExampleBox";

function TD6() {
  return (
    	<div className='TimeDiscounting'>
    	<PageNavigator group="TD" />
    		<p className='heading1'>Time Conversion</p>
    	<MathJaxContext>
    	 <p>
        Suppose we have a nominal monthly interset rate that is compounded daily. What is the equivalent nominal annual interest rate compounded quarterly? 
       </p>
       <p className='heading2'>Nominal vs. Effective Rate</p>
       <p>
       Before we make this conversion, let's think about nominal rates and effective rates. 
       A nominal rate does not take into account the effect of compounding multiple times per rate period. 
       An effective rate is the rate that would give the same total return as the nominal rate if compounding happened only once per rate period.
       </p>
       <p>
       Suppose we invest $<MathJax inline>{"\\( PV \\)"}</MathJax> in two accounts: The first offers a nominal rate (<MathJax inline>{"\\( r \\)"}</MathJax>) that compounds <MathJax inline>{"\\( n \\)"}</MathJax> times per rate period. The second offers an effective rate (<MathJax inline>{"\\( r_e \\)"}</MathJax>) with the same time units as the nominal rate. 
       What is the future value after one rate period?
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\overbrace{FV = PV\\left(1 + \\frac{r}{n}\\right)^n}^{\\text{Account \#1}} \\quad\\quad \\overbrace{FV = PV\\left(1 + r_e \\right)}^{\\text{Account \#2}}  \\\\
            \\end{aligned}
          \\]`}
        </MathJax>
        These accounts should have the same future value at the end of the rate period. If we set them equal, we can solve for the effective rate in terms of the nominal rate as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             r_e = \\left(1 + \\frac{r}{n}\\right)^n - 1
            \\end{aligned}
          \\]`}
        </MathJax>
        We can also solve for the nominal rate in terms of the effective rate as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             r = n\\left[(1 + r_e)^{\\frac{1}{n}} - 1\\right] 
            \\end{aligned}
          \\]`}
        </MathJax>
       </p>
       <p className='heading2'>Changing Time Units</p>
       <p>
       With the ability to move between nominal and effective rates, we are halfway there. We still need to figure out how to change the time units on an effective rate. For example, how 
       can we go from a monthly effective rate to an annual effective rate? Suppose we want to change the time units on an effective rate (<MathJax inline>{"\\( r_{e1} \\)"}</MathJax>) to get a new effective rate (<MathJax inline>{"\\( r_{e2} \\)"}</MathJax>).
       Let's say that <MathJax inline>{"\\( m \\)"}</MathJax> current rate periods occur every one new rate period. In this case, the following equations should yield the same future value:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             FV = PV(1 + r_{e1})^m \\quad\\quad FV = PV(1 + r_{e2}) 
            \\end{aligned}
          \\]`}
        </MathJax>
        If we set these equations equal, we can solve for the new effective rate in terms of our current effective rate.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             r_{e2} = (1+r_{e1})^m - 1
            \\end{aligned}
          \\]`}
        </MathJax>  
        <p>
        Changing the time units on a nominal rate is even simpler. Given a current nominal rate <MathJax inline>{"\\( r \\)"}</MathJax> with compounding <MathJax inline>{"\\( n \\)"}</MathJax> times per rate period, we can change to a nominal rate in which <MathJax inline>{"\\( m \\)"}</MathJax> current rate periods occur every one new rate period 
        by multiplying by <MathJax inline>{"\\( m \\)"}</MathJax>. For example, to change from a 1% nominal monthly rate with daily compounding to a nominal yearly rate with daily compounding, we multiply by 12 to get a new rate of 12%. 
        </p>
       </p>
       <p className='heading2'>Process</p>
       <p>
       Now that we can change between nominal and effective rates and adjust the time units on an effective rate, we are ready to tackle the rate conversion problem at the beginning. 
       The process looks like this
       </p>
      <div className="flow-container">
        <div className="flow-step">Current Nominal Rate (<MathJax inline>{"\\( r_1 \\)"}</MathJax>)</div>
        <div className="flow-arrow">➜</div>

        <div className="flow-step">Current Effective Rate (<MathJax inline>{"\\( r_{e1} \\)"}</MathJax>)</div>
        <div className="flow-arrow">➜</div>

        <div className="flow-step">New Effective Rate (<MathJax inline>{"\\( r_{e2} \\)"}</MathJax>)</div>
        <div className="flow-arrow">➜</div>

        <div className="flow-step">New Nominal Rate (<MathJax inline>{"\\( r_2 \\)"}</MathJax>)</div>
      </div>
      <p>
      First, we change the nominal monthly rate into an effective monthly rate, using the fact that we have compounding 30 times per month (<MathJax inline>{"\\( n_1=30 \\)"}</MathJax>).
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             r_{e1} = \\left(1 + \\frac{r_1}{n_1}\\right)^{n_1} - 1
            \\end{aligned}
          \\]`}
        </MathJax>  
        Next, we change the monthly effective rate to an annual effective rate, using the fact that there are 12 months per year (<MathJax inline>{"\\( m=12 \\)"}</MathJax>).
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             r_{e2} = (1+r_{e1})^m - 1
            \\end{aligned}
          \\]`}
        </MathJax>   
        Finally, we change the annual effective rate into an annual nominal rate, using the fact that we have compounding 4 times per year (<MathJax inline>{"\\( n_2=4 \\)"}</MathJax>).
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             r_2 = n_2\\left[(1 + r_{e2})^{\\frac{1}{n_2}} - 1\\right] 
            \\end{aligned}
          \\]`}
        </MathJax>
        Let's see what this looks like with a starting rate of <MathJax inline>{"\\( r_1=0.01 \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             r_{e1} &= \\left(1 + \\frac{0.01}{30}\\right)^{30} - 1 \\approx 0.010048 \\\\
             r_{e2} &= (1+0.010048)^{12} - 1 \\approx 0.127474 \\\\
             r_2 &= 4\\left[(1 + 0.127474)^{\\frac{1}{4}} - 1\\right] \\approx 0.121798
            \\end{aligned}
          \\]`}
        </MathJax> 
        We can verify that we have done the conversion correctly by calculating the future value after one year of $100 placed in an account with a 1% monthly interest rate compounded daily and $100 placed in an 
        account with a 12.1798% annual interest rate compounded quarterly. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             FV &= 100\\left(1 + \\frac{0.01}{30}\\right)^{12\\times 30} \\approx \\$112.75 \\\\
             FV &= 100\\left(1 + \\frac{0.121798}{4}\\right)^{1\\times 4} \\approx \\$112.75
            \\end{aligned}
          \\]`}
        </MathJax>
        Here, we see that both rates yield the same future value. 
      </p>
      <p className='heading2'>Single Equation</p>
      <p>
      If we plug in <MathJax inline>{"\\( r_{e1} \\)"}</MathJax> to our equation for <MathJax inline>{"\\( r_{e2} \\)"}</MathJax> and then plug in <MathJax inline>{"\\( r_{e2} \\)"}</MathJax> to our equation for <MathJax inline>{"\\( r_2 \\)"}</MathJax>, we can 
      find <MathJax inline>{"\\( r_2 \\)"}</MathJax> in terms of <MathJax inline>{"\\( r_1 \\)"}</MathJax>.
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
           r_2 = n_2\\left[\\left(1 + \\frac{r_1}{n_1}\\right)^{m\\frac{n_1}{n_2}} - 1\\right] 
          \\end{aligned}
        \\]`}
      </MathJax>
      where
      <ul>
        <li><MathJax inline>{"\\( r_1 \\)"}</MathJax> is the current nominal rate;</li>
        <li><MathJax inline>{"\\( r_2 \\)"}</MathJax> is the new nominal rate;</li>
        <li><MathJax inline>{"\\( n_1 \\)"}</MathJax> is the number of times the current nominal rate is compounded per current rate period;</li>
        <li><MathJax inline>{"\\( n_2 \\)"}</MathJax> is the number of times the new nominal rate is compounded per new rate period; and</li>
        <li><MathJax inline>{"\\( m \\)"}</MathJax> is the number of current rate periods in one new rate period.</li>
      </ul>
      </p>
      <p>
      We can write this another way if we consider the units on <MathJax inline>{"\\( m \\times n_1 \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             m \\times n_1 &= \\frac{\\text{\# of current rate periods}}{\\text{new rate period}} \\times \\frac{\\text{\# of current compounding periods}}{\\text{current rate period}}  \\\\
             &= \\frac{\\text{\# of current compounding periods}}{\\text{new rate period}} = k
            \\end{aligned}
          \\]`}
        </MathJax> 
      This gives us 
      <MathJax className='math-container'>
        {`\\[
          \\begin{aligned}
           r_2 = n_2\\left[\\left(1 + \\frac{r_1}{n_1}\\right)^{\\frac{k}{n_2}} - 1\\right] 
          \\end{aligned}
        \\]`}
      </MathJax>
      where
      <ul>
        <li><MathJax inline>{"\\( r_1 \\)"}</MathJax> is the current nominal rate;</li>
        <li><MathJax inline>{"\\( r_2 \\)"}</MathJax> is the new nominal rate;</li>
        <li><MathJax inline>{"\\( n_1 \\)"}</MathJax> is the number of times the current nominal rate is compounded per current rate period;</li>
        <li><MathJax inline>{"\\( n_2 \\)"}</MathJax> is the number of times the new nominal rate is compounded per new rate period; and</li>
        <li><MathJax inline>{"\\( k \\)"}</MathJax> is the number of current compounding periods in one new rate period.</li>
      </ul>
      Note that if we set <MathJax inline>{"\\( n_2=1 \\)"}</MathJax>, this reduces to the same formula we used to convert rates in the annuity and perpetuity setting. This makes sense because the target rate in that case is 
      an effective rate that compounds once per cash flow period. 
      </p>
        <p className='heading2'>Examples</p>
        <ExampleBox solution={
            <>
              <p>
              Let's convert the first rate into an annual rate compounded daily to make a valid comparison. In this case, we have <MathJax inline>{"\\( n_1 = 3 \\)"}</MathJax>, <MathJax inline>{"\\( n_2 = 360 \\)"}</MathJax>, and <MathJax inline>{"\\( k = 12 \\)"}</MathJax>. 
            <MathJax className='math-container'>
              {`\\[
                r_2 = 360\\left[\\left(1 + \\frac{0.03}{3}\\right)^{\\frac{12}{360}} - 1\\right]  \\approx 11.94\\%
              \\]`}              
            </MathJax> 
              Since 11.94 is less than 11.95, you should choose to invest in the account with 11.95% annual interest compounded daily.
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> Would you rather invest in an account that pays 3% quarterly interest compounded monthly or an account that pays 11.95% annual interest compounded daily? (Assume a 360-day year)</p>
        </ExampleBox>
        <ExampleBox solution={
            <>
              <p>
              We need to convert the discount rate to a semi-annual effective rate before we can use it in our bond pricing equation. Here, we have <MathJax inline>{"\\( n_1 = 12 \\)"}</MathJax>, <MathJax inline>{"\\( n_2 = 1 \\)"}</MathJax>, and <MathJax inline>{"\\( k = 6 \\)"}</MathJax>. 
            <MathJax className='math-container'>
              {`\\[
                r_2 = \\left(1 + \\frac{0.05}{12}\\right)^{6} - 1 \\approx 0.025262
              \\]`}              
            </MathJax> 
              Now, we can use this new rate in our equation for a coupon bond with <MathJax inline>{"\\( FV = 100 \\)"}</MathJax>, <MathJax inline>{"\\( C = 3\\)"}</MathJax>, and <MathJax inline>{"\\( T=20\\times2=40 \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                 P &= \\frac{100}{(1 + 0.025262)^{40}} + 3\\left(\\frac{1 - (1+0.025262)^{-40}}{0.025262}\\right) \\\\
                 &\\approx $111.84
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> Suppose we have a 20-year bond with a face value of $100 that pays a semi-annual (twice per year) coupon of $3. Assuming we hold to maturity, how much is the bond worth given a 5% annual discount rate compounded monthly?</p>
        </ExampleBox>
    	</MathJaxContext>
    	<PageNavigator group="TD"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/time_discounting">Contents</NavLink></div>
        </div>  
  );
}

export default TD6;