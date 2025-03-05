import React from 'react';
import './TimeDiscounting.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";
import ExampleBox from "../../components/ExampleBox";

function TD3() {
  return (
    	<div className='TimeDiscounting'>
    	<PageNavigator group="TD" />
    		<p className='heading1'>Annuities</p>
    	<MathJaxContext>
    	<p className='heading2'>Preliminaries</p>
    	<p>
        An annuity is a financial instrument that provides a series of payments over time. Our goal here will be to determine how much we should pay today for the promise of these future payments given a 
        discount rate <MathJax inline>{"\\( r \\)"}</MathJax>. We'll label the present time period relative to these future payments <MathJax inline>{"\\( t = 0\\)"}</MathJax> and consider future payments <MathJax inline>{"\\( C_1, C_2, \\dots, C_T \\)"}</MathJax> for <MathJax inline>{"\\( t \\in \\{1, 2, \\dots, T\\} \\)"}</MathJax>. 
        </p>
        <p>
        We'll assume that our discount rate compounds every period. Recall from the previous section that we can find the initial value of an investment (<MathJax inline>{"\\( X_0\\)"}</MathJax>) with interest that compounds every period given the final value (<MathJax inline>{"\\( X_t \\)"}</MathJax>) and the interest rate (<MathJax inline>{"\\( r\\)"}</MathJax>).
        <MathJax className='math-container'>
          {`\\[
            X_0 = \\frac{X_t}{(1 + r)^t}
          \\]`}
        </MathJax>
        If we did not have compounding interest, <MathJax inline>{"\\( X_0\\)"}</MathJax> would be given by
        <MathJax className='math-container'>
          {`\\[
            X_0 = \\frac{X_t}{(1 + rt)}
          \\]`}
        </MathJax>
        We will almost always consider a compound discount rate instead of a simple discount rate because the compound rate makes the math easier. 
        </p>
        <p className='heading2'>General Annuity Formula</p>
        <p>
        First, we'll consider the general case in which the payment in each period could be different. To do this, we'll find the initial value of each period's payment separately and then sum up all the initial values. Because we have a compound discount rate, the initial value of payment <MathJax inline>{"\\( C_t \\)"}</MathJax> is 
        given by 
        <MathJax className='math-container'>
          {`\\[
            \\frac{C_t}{(1 + r)^t}
          \\]`}
        </MathJax>
        If we sum all of these initial values up, we get that the present value of the entire stream of payments is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            PV &= \\frac{C_1}{1 + r} + \\frac{C_2}{(1 + r)^2} + \\cdots + \\frac{C_T}{(1 + r)^T} \\\\
            &= \\sum^{T}_{t=1} \\frac{C_t}{(1+r)^t}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Perpetuity</p>
        <p>
        Next, we consider what happens if we require that the payment be the same in each period, or <MathJax inline>{"\\( C_1 = C_2 = \\dots = C_T  = C\\)"}</MathJax>, and the number of periods be infinite, or <MathJax inline>{"\\( T \\to \\infty\\)"}</MathJax>. This special case is called a perpetuity. Applying these restrictions to our formual gives us 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            PV &= \\sum^{\\infty}_{t=1} \\frac{C}{(1+r)^t}
            \\end{aligned}
          \\]`}
        </MathJax> 
        Now, recall that the sum of an infinite series beginning at zero is given by <MathJax inline>{"\\( \\sum^{\\infty}_{n=0} Ay^n = \\frac{A}{1 - y}\\)"}</MathJax> as long as <MathJax inline>{"\\( |y| < 1\\)"}</MathJax>. Our current formula looks close to this form if we let <MathJax inline>{"\\( y = \\frac{1}{1 + r}\\)"}</MathJax>, but 
        we need to make sure that it begins at zero. Let's rewrite things to get 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            PV &= C\\sum^{\\infty}_{t=1} \\left(\\frac{1}{1+r}\\right)^t \\\\
               &= C\\left[\\sum^{\\infty}_{t=0} \\left(\\frac{1}{1+r}\\right)^t  - 1\\right] \\\\
               &= C\\left(\\frac{1}{1 - \\frac{1}{1+r}}  - 1\\right) \\\\
               &= \\frac{C}{r}
            \\end{aligned}
          \\]`}
        </MathJax> 
        Note that we can apply the sum of an infinite series since <MathJax inline>{"\\( \\left|\\frac{1}{1+r}\\right| < 1 \\Leftrightarrow r > 0 \\)"}</MathJax>. This gives us that the present value of a perpetuity is simply the payment each period divided by the discount rate.
        </p>
        <p className='heading2'>Fixed Payment Annuity</p>
        <p>
        Now we can use the formula for a perpetuity to find a formula for an annuity with the same payment each period. The only thing we're changing here is to use a finite ending period <MathJax inline>{"\\( T \\)"}</MathJax> instead of <MathJax inline>{"\\( T \\to \\infty \\)"}</MathJax>. 
        The strategy will be to rewrite the finite sum in terms of two infinite sums that we can solve using our perpetuity formula. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            PV &= \\sum^{T}_{t=1} \\frac{C}{(1+r)^t} \\\\
            &= \\sum^{\\infty}_{t=1} \\frac{C}{(1+r)^t} - \\sum^{\\infty}_{t=T+1} \\frac{C}{(1+r)^t} \\\\
            &= \\sum^{\\infty}_{t=1} \\frac{C}{(1+r)^t} - \\sum^{\\infty}_{t=1} \\frac{C}{(1+r)^{t+T}} \\\\
            &= \\sum^{\\infty}_{t=1} \\frac{C}{(1+r)^t}\\left[1 - \\left(\\frac{1}{1 + r}\\right)^T\\right] \\\\
            &= \\frac{C}{r}\\left(1 - \\left(\\frac{1}{1 + r}\\right)^T \\right) \\\\
            &= C\\left(\\frac{1 - (1+r)^{-T}}{r}\\right)
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Growth Annuity</p>
        <p>
        Next, we consider a growth annuity. In this case, we allow the payments to vary over time, but we require that they follow a growth pattern that compounds once per period. In other words, we have the following series of payments:
        <MathJax className='math-container'>
          {`\\[
            C, C(1+g), C(1+g)^2, \\dots, C(1 + g)^{T-1}
          \\]`}
        </MathJax> 
        where <MathJax inline>{"\\( g \\)"}</MathJax> is our growth rate. Putting this together in the general annuity formula gives us 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            PV &= \\sum^{T}_{t=1} \\frac{C(1 + g)^{t-1}}{(1+r)^t} \\\\
            &= \\frac{C}{1+g}\\sum^{T}_{t=1} \\left(\\frac{1 + g}{1 + r}\\right)^t
            \\end{aligned}
          \\]`}
        </MathJax> 
        Note that all we've done here is substitute in <MathJax inline>{"\\( \\frac{1 + g}{1 + r} \\)"}</MathJax> for <MathJax inline>{"\\( \\frac{1}{1 + r} \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{C}{1 + g} \\)"}</MathJax> for <MathJax inline>{"\\( C \\)"}</MathJax>. 
        Let's do a change of variables with the discount rate from our non-growth equations to see how 
        our formulas change with the addition of growth. First we'll call the discount rate in the non-growth equations <MathJax inline>{"\\( r' \\)"}</MathJax> and the payment in the non-growth equations <MathJax inline>{"\\( C' \\)"}</MathJax>. 
        Now we want to find expressions for <MathJax inline>{"\\( r' \\)"}</MathJax> and <MathJax inline>{"\\( C' \\)"}</MathJax> that give us 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\frac{1}{1 + r'} = \\frac{1+g}{1+r} \\\\
            \\Leftrightarrow r' = \\frac{r-g}{1 + g}
            \\end{aligned}
          \\]`}
        </MathJax> 
        and 
        <MathJax className='math-container'>
          {`\\[
            C' = \\frac{C}{1+g}
          \\]`}
        </MathJax> 
        Using this change of variables, we get that the perpetuity formula with growth is
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            PV &= \\frac{\\frac{C}{1+g}}{\\frac{r - g}{1 + g}} \\\\
            &= \\frac{C}{r-g}
            \\end{aligned}
          \\]`}
        </MathJax> 
        so long as <MathJax inline>{"\\( \\frac{r-g}{1+g} > 0 \\Leftrightarrow r > g \\)"}</MathJax>. 
        Similarily, we get that the fixed payment annuity formula with growth is 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            PV &= \\frac{C}{1 + g}\\left(\\frac{1 - \\left(1+\\frac{r-g}{1+g}\\right)^{-T}}{\\frac{r-g}{1+g}}\\right) \\\\
            &= C\\left(\\frac{1 - \\left(\\frac{1+g}{1+r}\\right)^{T}}{r-g}\\right) \\\\
            \\end{aligned}
          \\]`}
        </MathJax> 
        Again, as long as the discount rate is greater than the growth rate, or <MathJax inline>{"\\( r > g \\)"}</MathJax>.
        </p>
          <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              The first payment needs no discounting since it happens immediately. For the remaining 19 payments, we use our fixed payment annuity formula with <MathJax inline>{"\\( C = 100 \\)"}</MathJax>, <MathJax inline>{"\\( T=19 \\)"}</MathJax>, and <MathJax inline>{"\\( r = .05 \\)"}</MathJax>. 
              This gives us 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                PV &= 100 + 100\\left(\\frac{1 - (1+.05)^{-19}}{.05}\\right) \\\\
                &\\approx $1308.53
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> What is the present value of an asset that pays out $100 every year for 20 years starting today? Assume a compound annual discount rate of 5%. </p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              First, we need to rewrite our growth annuity formula in terms of <MathJax inline>{"\\( T \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                &PV = C\\left(\\frac{1 - \\left(\\frac{1+g}{1+r}\\right)^{T}}{r-g}\\right) \\\\
                \\Leftrightarrow &\\left(\\frac{1+g}{1+r}\\right)^T = 1 - \\frac{PV(r-g)}{C} \\\\
                \\Leftrightarrow & T = \\frac{\\log\\left(1 - \\frac{PV(r-g)}{C}\\right)}{\\log\\left(\\frac{1 + g}{1 + r}\\right)}
                \\end{aligned}
              \\]`}
            </MathJax> 
            Now, we can use this equation with <MathJax inline>{"\\( C = 20 \\)"}</MathJax>, <MathJax inline>{"\\( g=.02 \\)"}</MathJax>, <MathJax inline>{"\\( r = .03 \\)"}</MathJax>, and <MathJax inline>{"\\( PV = 500 \\)"}</MathJax>. 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                 T &= \\frac{\\log\\left(1 - \\frac{500(.03-.02)}{20}\\right)}{\\log\\left(\\frac{1 + .02}{1 + .03}\\right)} \\\\
                 &\\approx 29.49
                \\end{aligned}
              \\]`}
            </MathJax> 
            Finally, we need <MathJax inline>{"\\( T \\)"}</MathJax> to be a whole number. Since the present value must be at least $500, we'll round up to get 30 months. (29 months results in a present value of $492.85 and 30 months results in a present value of $507.49.)
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> Consider an asset that has an initial payment of $20 one month from now. For each consecutive month, the payment grows at a rate of 2%. Using a compound monthly discount rate of 3%, 
            find the minimum number of months the asset must pay out so that its present value today is at least $500.</p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              If we start with the fixed payment annuity equation and try to solve for <MathJax inline>{"\\( r \\)"}</MathJax>, we soon run into a problem.
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                    & PV = C\\left(\\frac{1 - (1+r)^{-T}}{r}\\right) \\\\
                    \\Leftrightarrow &(1+r)^{-T} = 1 - r\\frac{PV}{C}
                    \\end{aligned}
                  \\]`}
                </MathJax> 
                We can't find a closed-form solution for <MathJax inline>{"\\( r \\)"}</MathJax> here. This means we either have to use numerical methods to solve for <MathJax inline>{"\\( r \\)"}</MathJax> or approxmiate <MathJax inline>{"\\( r \\)"}</MathJax> with some simplifying assumptions. 
                Let's try to approximate <MathJax inline>{"\\( r \\)"}</MathJax> with a Taylor expansion. First, we'll take the log of both sides.
                <MathJax className='math-container'>
                  {`\\[
                     T\\log(1+r) + \\log\\left(1 - r\\frac{PV}{C}\\right) = 0
                  \\]`}
                </MathJax> 
                Now, recall in the previous section that we found the Taylor expansion of <MathJax inline>{"\\( \\log(1+x) \\)"}</MathJax> centered at zero to be 
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                     \\log(1+x) &= x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots \\\\
                     &= \\sum^{\\infty}_{k=1}\\frac{(-1)^{k+1}x^k}{k}
                    \\end{aligned}
                  \\]`}
                </MathJax> 
                If <MathJax inline>{"\\( r \\)"}</MathJax> and <MathJax inline>{"\\( -r\\frac{PV}{C} \\)"}</MathJax> are both small, we can use the first few terms of this expansion to write our equation as 
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                     &T\\log(1+r) + \\log\\left(1 - r\\frac{PV}{C}\\right) \\\\
                     &\\approx T\\left(r - \\frac{r^2}{2} + \\frac{r^3}{3}\\right) - r\\frac{PV}{C} - \\frac{r^2}{2}\\left(\\frac{PV}{C}\\right)^2 - \\frac{r^3}{3}\\left(\\frac{PV}{C}\\right)^3 \\\\
                    \\end{aligned}
                  \\]`}
                </MathJax>  
                which gives us the following quadratic:
                <MathJax className='math-container'>
                  {`\\[
                        r^2\\frac{\\left(T - \\left(\\frac{PV}{C}\\right)^3\\right)}{3}
                        - r\\frac{\\left(T + \\left(\\frac{PV}{C}\\right)^2\\right)}{2}
                        + T - \\frac{PV}{C} = 0
                  \\]`}
                </MathJax> 
                Using the quadratic formula, we can solve for <MathJax inline>{"\\( r \\)"}</MathJax> as 
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                        r \\approx \\frac{\\frac{1}{2}\\left(T + \\left(\\frac{PV}{C}\\right)^2\\right) - \\sqrt{\\frac{1}{4}\\left(T + \\left(\\frac{PV}{C}\\right)^2\\right)^2 - \\frac{4}{3}\\left(T - \\left(\\frac{PV}{C}\\right)^3\\right) \\left(T - \\frac{PV}{C}\\right)}}{\\frac{2}{3}\\left(T - \\left(\\frac{PV}{C}\\right)^3\\right)}
                    \\end{aligned}
                  \\]`}
                </MathJax>
                Finally, given <MathJax inline>{"\\( C = 100 \\)"}</MathJax>, <MathJax inline>{"\\( T= 10 \\)"}</MathJax>, and <MathJax inline>{"\\( PV = 900 \\)"}</MathJax>, we have
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                        r &\\approx \\frac{\\frac{1}{2}\\left(10 + \\left(\\frac{900}{100}\\right)^2\\right) - \\sqrt{\\frac{1}{4}\\left(10 + \\left(\\frac{900}{100}\\right)^2\\right)^2 - \\frac{4}{3}\\left(10 - \\left(\\frac{900}{100}\\right)^3\\right) \\left(T - \\frac{900}{100}\\right)}}{\\frac{2}{3}\\left(10 - \\left(\\frac{900}{100}\\right)^3\\right)} \\\\
                        &\\approx 0.01989
                    \\end{aligned}
                  \\]`}
                </MathJax> 
                In this case, <MathJax inline>{"\\( r \\)"}</MathJax> is fairly small, so our approximation does a good job. (The actual value is <MathJax inline>{"\\( r = 0.01963\\)"}</MathJax>.)
              </p>
            </>
          }>
            <p><strong>Example 3:</strong> Consider an asset that pays out $100 every year for the next 10 years. Find the compound annual discount rate that will result in a present value of $900 for this asset.</p>
          </ExampleBox>
    	</MathJaxContext>
    	<PageNavigator group="TD"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/time_discounting">Contents</NavLink></div>
        </div>
  );
}

export default TD3;