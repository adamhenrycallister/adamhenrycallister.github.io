import React from 'react';
import './TimeDiscounting.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";
import ExampleBox from "../../../components/ExampleBox";
import YieldCurve from "./YieldCurve";

function TD5() {

  const sampleData = [
    { maturity: 1, yield: 2 },
    { maturity: 3, yield: 3},
    { maturity: 5, yield: 3.7 },
    { maturity: 10, yield: 4.1 },
    { maturity: 30, yield: 4.5 }
  ];

  return (
    	<div className='TimeDiscounting'>
    	<PageNavigator group="TD" />
    		<p className='heading1'>Bonds</p>
    	<MathJaxContext>
    	<p className='heading2'>Preliminaries</p>
    	<p>
        Using what we've learned so far about discount rates, compounding, and annuities, we can come up with a way to determine the value of a bond. A bond is a debt security that gives the holder a right to one or more future fixed payments by the bond's issuer. 
        A bond remains outstanding as long as the issuer still has scheduled payments to make. 
        A bond matures on the date of the last payment. The face value of a bond is the amount of the last payment. 
        Some bonds offer a single payment upon maturity (no-coupon bonds) while other bonds offer multiple payments at fixed intervals up to and including the date of maturity (coupon bonds). 
        Payments made in addition to the payment of the face value upon maturity are called coupon payments. Coupon payments are typically fixed as a percentage of the face value of the bond and paid every period, including upon maturity.
        For example, a coupon bond that pays out $50 every year for the next 10 years and an additional $1,000 on the 10th year has a face value of $1,000, a coupon of $50, and a coupon rate of <MathJax inline>{"\\( \\frac{50}{1000} =.05 \\)"}</MathJax>.
        </p>
        <p>
        Let's establish some notation. We'll call the current price of the bond <MathJax inline>{"\\( P \\)"}</MathJax>, the face value <MathJax inline>{"\\( FV \\)"}</MathJax>, the coupon (if any) <MathJax inline>{"\\( C \\)"}</MathJax>, the coupon rate <MathJax inline>{"\\( c = \\frac{C}{FV} \\)"}</MathJax>, the time until maturity <MathJax inline>{"\\( T \\)"}</MathJax>, and the compound discount rate (measured relative to the same units as our time variable) <MathJax inline>{"\\( r \\)"}</MathJax>.
        </p>
        <p className='heading2'>No-Coupon Bonds</p>
        <p>
        To price a no-coupon bond with maturity <MathJax inline>{"\\( T \\)"}</MathJax>, compound discount rate <MathJax inline>{"\\( r \\)"}</MathJax>, and face value <MathJax inline>{"\\( FV \\)"}</MathJax>, we use our formula for compounding every period solved for the initial value.
        <MathJax className='math-container'>
          {`\\[
            P = \\frac{FV}{(1 + r)^T}
          \\]`}
        </MathJax>
        </p>
        <p className='heading2'>Coupon Bonds</p>
        <p>
        To price a coupon bond that pays out <MathJax inline>{"\\( C \\)"}</MathJax> each period through maturity, we treat the face value payment as a no-coupon bond and the coupon payments as a fixed-payment annuity. If we put these two together, we get
        <MathJax className='math-container'>
          {`\\[
            P = \\frac{FV}{(1 + r)^T} + C\\left(\\frac{1 - (1+r)^{-T}}{r}\\right)
          \\]`}
        </MathJax>
        We can also think about the price of a coupon bond in terms of the coupon rate <MathJax inline>{"\\( c \\)"}</MathJax> by substituting in <MathJax inline>{"\\( C = cFV\\)"}</MathJax>. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            P &= \\frac{FV}{(1 + r)^T} + cFV\\left(\\frac{1 - (1+r)^{-T}}{r}\\right) \\\\
            &= FV\\left((1 + r)^{-T}\\left(1 - \\frac{c}{r}\\right) + \\frac{c}{r}\\right)
            \\end{aligned}
          \\]`}
        </MathJax>
        Note that if the coupon rate is greater than the discount rate (<MathJax inline>{"\\( c > r \\)"}</MathJax>), <MathJax inline>{"\\( (1 + r)^{-T}\\left(1 - \\frac{c}{r}\\right) + \\frac{c}{r} > 1 \\)"}</MathJax>, which means the price is greater than the face value. 
        If the coupon rate is less than the discount rate, the price is less than the face value. Finally, if the coupon rate and the discount rate are equal, the price is equal to the face value. 
        </p>
        <p>
        Bonds are typically issued with a coupon rate that matches the discount rate, so that the issue price is equal to the face value of the bond. When this happens we say the bond is issued at par. 
        If the discount rate falls after the bonds are issued (either because the risk-free rate goes down or the company's credit risk improves), the price of the bonds will go up relative to their face value, or the bonds will be priced at a premium. 
        If the discount rate rises after the bonds are issued (either because the risk-free rate goes up or the company's credit risk worsens), the price of the bonds will go down relative to their face value, or the bonds will be priced at a discount. 
        </p>
        <p className='heading2'>Convertible Bonds</p>
        <p>
        A convertible bond is a bond that can be exchanged for shares of stock before it matures. A vanilla convertible allows the bondholder to exhange the bond for a fixed number of shares of the issuer's stock at any point before the bond matures. The number of shares available upon conversion for a single convertible bond is called the conversion ratio. 
        We can think of convertibles as having three sources of value: (1) the value of the convertible as a bond, (2) the value of the convertible as stock, and (3) the value of the convertible as an option. At any period before maturity, the convertible is worth at least as much as a similarily structured non-convertible bond and at least as much as the stock price multiplied by the number of shares available upon conversion. 
        Holding a convertible can also be thought of as holding a call option with a strike price equal to the bond value at a given period. 
        </p>
        <p>
        Consider a vanilla convertible with conversion ratio <MathJax inline>{"\\( N \\)"}</MathJax>, coupon payments <MathJax inline>{"\\( C \\)"}</MathJax>, discount rate <MathJax inline>{"\\( r \\)"}</MathJax>, and underlying stock price <MathJax inline>{"\\( S \\)"}</MathJax>. Suppose we forced the convertible holder to either keep the bond and forfeit the option of future conversion or convert right now. 
        In this case, the holder would simply pick whichever choice was worth more, giving a value of 
        <MathJax className='math-container'>
          {`\\[
            \\max \\left\\{\\frac{FV}{(1 + r)^T} + C\\left(\\frac{1 - (1+r)^{-T}}{r}\\right), S\\times N\\right\\}
          \\]`}
        </MathJax>
        However, vanilla convertible holders have the option of converting at any time until maturity. Thus, the above expression is only a lower bound for the convertible's value. 
        Suppose we had a call option that gave the holder of the option the right to purchase <MathJax inline>{"\\( N \\)"}</MathJax> shares of stock at whatever the price of a non-convertible bond was at the time. Let's denote this option price <MathJax inline>{"\\( P_{option} \\)"}</MathJax>. 
        An investor could obtain the same rights by either (1) purchasing a single vanilla convertible or (2) purchasing one non-convertible bond and one option. Thus, the value of a vanilla convertible is 
        <MathJax className='math-container'>
          {`\\[
            P = \\frac{FV}{(1 + r)^T} + C\\left(\\frac{1 - (1+r)^{-T}}{r}\\right) + P_{option}
          \\]`}
        </MathJax>  
        </p>
        <p>
        For now, we won't go into how we might come up with a price for the hypothetical call option we've described. (See <NavLink className='inline-link' to="/corporate_finance/black_scholes">Black-Scholes</NavLink> for a discussion of option pricing.) 
            Instead, we simply acknowledge that a convertible's price should include an option-value component.
        </p>
        <p className='heading2'>Bond Yield</p>
        <p>
        The yield to maturity (YTM) on a bond is the discount rate needed to generate the current market price for the bond. In the case of a no-coupon bond, we can explicitly solve for the YTM as 
        <MathJax className='math-container'>
          {`\\[
            r = \\left(\\frac{FV}{P}\\right)^{\\frac{1}{T}} - 1
          \\]`}
        </MathJax>  
        where <MathJax inline>{"\\( T \\)"}</MathJax> is the remaining time until maturity and <MathJax inline>{"\\( P \\)"}</MathJax> is the market price. 
        In the case of a coupon bond, we can use numerical methods to solve for <MathJax inline>{"\\( r \\)"}</MathJax>.  
        </p>
        <p>
        Do equivalent bonds with different maturities have the same YTM? Let's consider the YTM for no-coupon bonds with the same face value and different maturities. A YTM in this context is known as a spot rate, 
        or the interest rate applicable to a single cash flow occurring at a specific future time. The one-year spot rate (the YTM on a zero-coupon bond that matures in one year) is given by <MathJax inline>{"\\( s_1 = \\frac{FV}{P_1} - 1 \\)"}</MathJax>; the two-year spot rate is <MathJax inline>{"\\( s_2 = \\left(\\frac{FV}{P_2}\\right)^{1/2} - 1 \\)"}</MathJax>; the <MathJax inline>{"\\( t \\)"}</MathJax>-year spot rate is <MathJax inline>{"\\( s_t = \\left(\\frac{FV}{P_t}\\right)^{1/t} - 1 \\)"}</MathJax>. In this context, <MathJax inline>{"\\( P_1 \\)"}</MathJax>, <MathJax inline>{"\\( P_2 \\)"}</MathJax>, and <MathJax inline>{"\\( P_t \\)"}</MathJax> are 
        the market prices of no-coupon bonds with the same face value that will mature in one, two, and <MathJax inline>{"\\( t \\)"}</MathJax> years respectively. These spot rates might differ if investors believe short-term interest rates will change in the future. If investors expect future short-term interest rates to steadily increase, then the yield on bonds with longer maturities should be greater than the yield on bonds with shorter maturities. If investors expect future short-term interest rates to steadily fall, then the yield on bonds with longer maturities should be lower than the yield on bonds with shorter maturities. 
        </p>
        <p>
        We can visualize these differences by plotting spot rates and observing the direction of the slope on the resulting yield curve. 
        </p>
        <div className="graph-container">
          <YieldCurve data={sampleData} />
        </div>
        <p>
        In practice, yield curves are usually upward sloping. This is not because investors consistently expect increases in future short-term interest rates but because bond prices reflect future interest rate uncertainty as well as directional beliefs about future interest rates. 
        Longer-maturity bonds typically carry a "term premium" because investors face greater uncertainty about interest rates farther into the future, so these bonds must offer higher yields than comparable short-term bonds.
        </p>
        <p>
        Spot rates on Treasury bonds are not readily observable since Treasury bonds typically carry coupons. However, we can infer spot rates for longer-maturity bonds using spot rates for shorter-maturity bonds. 
        We start with a one-year Treasury with an annual coupon. The price of this Treasury is given by 
        <MathJax className='math-container'>
          {`\\[
            P_1 = \\frac{FV + C}{1 + s_1} \\Leftrightarrow s_1 = \\frac{FV + C}{P_1} - 1
          \\]`}
        </MathJax>  
        Next, we can infer the two-year spot rate by noting that the the price of a two-year Treasury is 
        <MathJax className='math-container'>
          {`\\[
            P_2 = \\frac{C}{1 + s_1} + \\frac{FV + C}{(1 + s_2)^2} \\Leftrightarrow s_2 = \\left(\\frac{FV +C}{P_2 - \\frac{C}{1 + s_1}}\\right)^{\\frac{1}{2}} - 1
          \\]`}
        </MathJax>  
        Continuing on, we can infer the <MathJax inline>{"\\( t \\)"}</MathJax>-year spot rate using the price of a <MathJax inline>{"\\( t \\)"}</MathJax>-year Treasury
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            P_t = \\frac{C}{1 + s_1} + \\frac{C}{(1 + s_2)^2}  + \\dots + \\frac{C}{(1 + s_{t-1})^{t-1}}  + \\frac{FV + C}{(1 + s_t)^t} \\\\
            \\Leftrightarrow s_t = \\left(\\frac{FV +C}{P_t - \\sum^{t-1}_{i=1}\\frac{C}{(1 + s_1)^i}}\\right)^{\\frac{1}{t}} - 1
            \\end{aligned}
          \\]`}
        </MathJax>  
        </p>
        <p className='heading2'>Examples</p>
        <ExampleBox solution={
            <>
              <p>
              First, let's use the coupon rate to find the yearly coupon payment.
            <MathJax className='math-container'>
              {`\\[
                C = cFV = .05*1000 = $50
              \\]`}              
            </MathJax> 
              Next, we can use the equation for a coupon bond with <MathJax inline>{"\\( FV = 1000 \\)"}</MathJax>, <MathJax inline>{"\\( C = 50\\)"}</MathJax>, <MathJax inline>{"\\( T=20 \\)"}</MathJax>, and <MathJax inline>{"\\( r = .03 \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                 P &= \\frac{1000}{(1 + .03)^{20}} + 50\\left(\\frac{1 - (1+.03)^{-20}}{.03}\\right) \\\\
                 &\\approx $1297.55
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> What is the price of a 20-year bond with a 5% coupon rate and a face value of $1,000? Assume a compound annual discount rate of 3%.</p>
        </ExampleBox>
        <ExampleBox solution={
            <>
              <p>
              First, let's rewrite the coupon bond formual in terms of <MathJax inline>{"\\( T \\)"}</MathJax>.
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                    &P = \\frac{FV}{(1 + r)^T} + C\\left(\\frac{1 - (1+r)^{-T}}{r}\\right) \\\\
                    &\\Leftrightarrow (1+r)^T = \\frac{FV - \\frac{C}{r}}{P - \\frac{C}{r}} \\\\
                    &\\Leftrightarrow T = \\frac{\\log\\left(\\frac{FV - \\frac{C}{r}}{P - \\frac{C}{r}} \\right)}{\\log(1+r)}
                    \\end{aligned}
                  \\]`}
                </MathJax>
              Now, we can use this equation with <MathJax inline>{"\\( FV = 500 \\)"}</MathJax>, <MathJax inline>{"\\( C = cFV = .06*500 = 30 \\)"}</MathJax>, <MathJax inline>{"\\( r = .08 \\)"}</MathJax>, and <MathJax inline>{"\\( P = 450\\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                T &= \\frac{\\log\\left(\\frac{500 - \\frac{30}{.08}}{450 - \\frac{30}{.08}} \\right)}{\\log(1+.08)} \\\\
                &\\approx 6.64
                \\end{aligned}
              \\]`}
            </MathJax>
            Finally, we need <MathJax inline>{"\\( T \\)"}</MathJax> to be a whole number. Since we want the present value to be no greater than $450, we'll round up to get 7 years. (6 years results in a present value of $453.77 and 7 years results in a present value of $447.94.)
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> Consider a bond with a 6% coupon rate and a face value of $500. What is the minimum number of years the bond must have until maturity to ensure a present value of no greater than $450? Assume a compound annual discount rate of 8%.</p>
        </ExampleBox>
        <ExampleBox solution={
            <>
              <p>
                To answer this question, we need to figure out what the price of the bonds is five years after issuance. Because the bonds were issued at par, we know that the coupon rate must equal the discount rate at the time of issuance, or <MathJax inline>{"\\( c=.02 \\)"}</MathJax>. 
                The coupon rate does not change over the lifetime of the bonds. Thus, the coupon for the first 5 years is the same as the coupon for the last 5 years (<MathJax inline>{"\\( C = cFV = .02*1000 = 20 \\)"}</MathJax>). Using this coupon payment, along 
                with <MathJax inline>{"\\( r = .07 \\)"}</MathJax>, <MathJax inline>{"\\( T = 5\\)"}</MathJax>, and <MathJax inline>{"\\( FV = 1000 \\)"}</MathJax>, we have the following price five years after issuance:
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                    P &= \\frac{1000}{(1 + .07)^{5}} + 20\\left(\\frac{1 - (1+.07)^{-5}}{.07}\\right) \\\\
                    &\\approx $794.99
                    \\end{aligned}
                  \\]`}
                </MathJax>
                Thus, the bondholders could make <MathJax inline>{"\\( 1000 - 794.99 = $205.01\\)"}</MathJax> per bond by forcing the company to buy back the bonds at par.
              </p>
            </>
          }>
            <p><strong>Example 3:</strong> Suppose a company issues 10-year coupon bonds with a face value of $1,000 at par when the compound annual discount rate for the company is 2%. Five years later, 
            the risk-free rate rises and the company's risk profile remains the same, causing the discount rate to increase to 7%. How much could the current bondholders make if they accelerated the debt and forced the company to pay face value for the bonds?</p>
        </ExampleBox>
    	</MathJaxContext>
    	<PageNavigator group="TD"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/time_discounting">Contents</NavLink></div>
        </div>  
  );
}

export default TD5;