import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";
import Volatility from "./Volatility";

function BS8() {
  return (
    	<div className='BlackScholes'>
    	<PageNavigator group="BS"/>
    		<p className='heading1'>Volatility</p>
    	<MathJaxContext>
    	<p>
    		The Black-Scholes model assumes a constant, known volatility, <MathJax inline>{"\\( \\sigma \\)"}</MathJax>. In the real world, a stock's volatility may change over time, and the volatility of a stock at any given time is not necessarily known (or agreed upon) by all investors. 
    		In this section, we'll think through three different volatility measures: realized, implied, and expected.
    	</p>
    	<p className='heading2'>Realized Volatility</p>
    	<p>
    	Realized volatility measures the actual stock price fluctuations for some period in the past. Let's say we have past stock price observations <MathJax inline>{"\\( S_0, S_1, \\dots, S_N \\)"}</MathJax>. How should we use these observations to come up with an empirical estimate of volatility that we can use 
    	in the Black-Scholes context? Recall that the Black-Scholes model assumes stock prices are continuous and evolve according to geometric Brownian motion. This gives us the following equation for the stock price at time <MathJax inline>{"\\( t\\)"}</MathJax>:
	     <MathJax className='math-container'>
	        {`\\[
	          \\begin{aligned}
	            &S_t = S_0 e^{\\left(\\mu - \\frac{\\sigma^2}{2}\\right)t + \\sigma W_t} \\\\
	            \\Leftrightarrow &\\log\\left(\\frac{S_t}{S_0}\\right) = \\left(\\mu - \\frac{\\sigma^2}{2}\\right)t + \\sigma W_t
	          \\end{aligned}
	        \\]`}
	      </MathJax>
	     In practice, prices are not continuous. But, we can approximate continuous prices with discrete pricing intervals. Let's assume we have intervals of length <MathJax inline>{"\\( \\Delta t\\)"}</MathJax> and look at the interval from time <MathJax inline>{"\\( i-1 \\)"}</MathJax> to time <MathJax inline>{"\\( i \\)"}</MathJax>. 
	     This gives us 
	     <MathJax className='math-container'>
	        {`\\[
	          \\begin{aligned}
	            \\log\\left(\\frac{S_i}{S_{i-1}}\\right) \\approx \\left(\\mu - \\frac{\\sigma^2}{2}\\right)\\Delta t + \\sigma \\Delta W_i
	          \\end{aligned}
	        \\]`}
	      </MathJax>  
	      where <MathJax inline>{"\\( \\Delta W_i \\sim N(0, \\Delta t) \\)"}</MathJax>. 
    	</p>
    	<p>
    	Before we continue, let's do a quick aside about returns. Let's say you purchase an asset at time <MathJax inline>{"\\( i-1 \\)"}</MathJax> for price <MathJax inline>{"\\( P_{i-1} \\)"}</MathJax>. Then, you sell the asset at time <MathJax inline>{"\\( i \\)"}</MathJax> for price <MathJax inline>{"\\( P_i\\)"}</MathJax>. The level return on the asset is given by 
    	<MathJax inline>{"\\( R_i = \\frac{P_i-P_{i-1}}{P_{i-1}} = \\frac{P_i}{P_{i-1}} - 1 \\)"}</MathJax>. We define the log return on the asset as <MathJax inline>{"\\( r_i = \\log(R_i + 1) = \\log\\left(\\frac{P_{i}}{P_{i-1}}\\right)\\)"}</MathJax>. Thus, we can recognize <MathJax inline>{"\\( \\log\\left(\\frac{S_i}{S_{i-1}}\\right)  \\)"}</MathJax> as the log return 
    	on the stock from time <MathJax inline>{"\\( i-1 \\)"}</MathJax> to time <MathJax inline>{"\\( i \\)"}</MathJax>. We'll denote this log return as <MathJax inline>{"\\( s_i \\)"}</MathJax>.
    	</p>
    	<p>
    	Returning to our equation, we can solve for <MathJax inline>{"\\( \\Delta W_i \\)"}</MathJax> to get
	     <MathJax className='math-container'>
	        {`\\[
	          \\begin{aligned}
	            \\Delta W_i \\approx \\frac{s_i - \\left(\\mu - \\frac{\\sigma^2}{2}\\right)\\Delta t}{\\sigma}
	          \\end{aligned}
	        \\]`}
	      </MathJax> 
	      We know that the variance of <MathJax inline>{"\\( \\Delta W_i \\)"}</MathJax> is <MathJax inline>{"\\( \\Delta t \\)"}</MathJax>. Thus, we have 
	     <MathJax className='math-container'>
	        {`\\[
	          \\begin{aligned}
	            &\\text{var} \\left(\\frac{s_i - \\left(\\mu - \\frac{\\sigma^2}{2}\\right)\\Delta t}{\\sigma}\\right) \\approx \\Delta t \\\\
	            &\\Leftrightarrow \\sigma  \\approx  \\sqrt{\\frac{\\text{var}(s_i)}{\\Delta t}}
	          \\end{aligned}
	        \\]`}
	      </MathJax>  
	      Using the formula for sample variance, we can estimate <MathJax inline>{"\\( \\sigma \\)"}</MathJax> as 
	     <MathJax className='math-container'>
	        {`\\[
				\\sigma  \\approx  \\sqrt{\\frac{\\sum^{N}_{i=1}(s_i - \\bar s)^2}{(N-1)\\Delta t}}
	        \\]`}
	      </MathJax>  
	      Finally, if we measure time in trading years and our time interval is one trading day, then <MathJax inline>{"\\( \\Delta t = \\frac{1}{T_{days}} \\)"}</MathJax>, where <MathJax inline>{"\\( T_{days} \\)"}</MathJax> is 
	      the number of trading days in a trading year. This gives us the following expression for realized volatility:
	     <MathJax className='math-container'>
	        {`\\[
				\\sigma_R  =  \\sqrt{\\frac{T_{days}\\sum^{N}_{i=1}(s_i - \\bar s)^2}{N-1}}
	        \\]`}
	      </MathJax>  
    	</p>
    	<p className='heading2'>Implied Volatility</p>
    	<p>
    	Implied volatility is the volatility measure that explains current option prices. In other words, given option price <MathJax inline>{"\\( V \\)"}</MathJax>, stock price <MathJax inline>{"\\( S_t \\)"}</MathJax>, strike price <MathJax inline>{"\\( K \\)"}</MathJax>, and risk-free rate <MathJax inline>{"\\( r \\)"}</MathJax>, implied volatility (<MathJax inline>{"\\( \\sigma_{I} \\)"}</MathJax>) is the <MathJax inline>{"\\( \\sigma \\)"}</MathJax> parameter 
    	that we need to get <MathJax inline>{"\\( V \\)"}</MathJax>. 
    	</p>
    	<p>
    	Recall that the formula for a European call option is given by 
	    <MathJax className='math-container'>
	        {`\\[
	          	C(S_t, t) = S_t  \\Phi(p) -Ke^{-r(T-t)}  \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right)
	        \\]`}
	    </MathJax>
	    and the formula for a European put option is given by 
	    <MathJax className='math-container'>
	        {`\\[
	          \\begin{aligned}
	              P(S_t, t) = 
	              Ke^{-r(T-t)} \\Phi\\left(\\sigma\\sqrt{T-t} -p\\right)
	              -S_t \\Phi \\left(- p\\right) 
	    	  \\end{aligned}
	        \\]`}
	    </MathJax> 
	    where
	    <MathJax className='math-container'>
	        {`\\[
	          	p = \\frac{\\log{\\left(S_t/K\\right)} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)}{\\sigma \\sqrt{T-t}}
	        \\]`}
	    </MathJax>
	    We can't find closed form solutions for <MathJax inline>{"\\( \\sigma \\)"}</MathJax> here, but we can use numerical methods to solve for <MathJax inline>{"\\( \\sigma \\)"}</MathJax> given an observed option price.
    	</p>
    	<p className='heading2'>Expected Volatility</p>
    	<p>
    	Expected volatility reflects investors' beliefs about how the stock price will fluctuate in the future. Expected volatility might be different than past realized volatility if investors believe fluctuations in stock price will change going forward. 
    	In this way, the difference between expected volatility and past realized volatility represents how new information changes investors' volatility beliefs. 
    	</p>
    	<p>
    	It's tempting to think of implied volatility as a measure for expected volatility. This is so because we derived the Black-Scholes equation using a risk-free portfolio. If the Black-Scholes assumptions hold, then the volatility implied by Black-Scholes pricing should represent investors' actual beliefs about future volatility without adjusting for risk. 
    	However, in the real world, there are signficant deviations from the Black-Scholes assumptions that cause implied volatility to incorporate not only investors' beliefs about future volatility but also their risk preferences associated with those beliefs. 
    	</p>
    	<p className='heading2'>Implied Volatility <MathJax inline>{"\\( \\neq \\)"}</MathJax> Expected Volatility</p>
    	<p>
    	To build some intuition about why implied volatility does not equal expected volatility, consider the perspective of an options seller. Recall that in the Black-Scholes derivation, we constructed a risk-free portfolio that would perfectly hedge the risk involved with selling an option by maintaining exactly <MathJax inline>{"\\( \\Delta = \\frac{\\partial V}{\\partial S_t} \\)"}</MathJax> shares of the underlying stock.
    	In the case of a European call option, this means that the options seller would have to maintain <MathJax inline>{"\\( \\Delta = \\Phi (p) \\)"}</MathJax> shares of the underlying stock to perfectly hedge the sale of a single call. Note that <MathJax inline>{"\\( p = \\frac{\\log{\\left(S_t/K\\right)} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)}{\\sigma \\sqrt{T-t}} \\)"}</MathJax> changes with 
    	the stock price. Thus, the options seller would have to continuously adjust <MathJax inline>{"\\( \\Delta \\)"}</MathJax> as the stock price changes to ensure a perfect hedge, which is not possible in the real world. Note that the Black-Scholes model also assumes a constant risk-free rate and volatility, which also does not match the real world. 
    	Because of these model deviations from real world conditions, selling an option is not riskless. Thus, baked into the option price is a premium that the options seller requires as compensation for the risk of an imperfect hedge (plus the transaction costs involved in supplying and properly hedging the option). 
    	For this reason, implied volatility is typically greater than expected volatility. 
    	</p>
    	<p>
    	Let's look at a simple example to see this in action. Suppose we sell a call option at time <MathJax inline>{"\\( t=0 \\)"}</MathJax> that 
    	expires at time <MathJax inline>{"\\( T \\)"}</MathJax>. Using Black-Scholes, we sell the option for <MathJax inline>{"\\( S_0\\Phi(p_0) - K e^{-rT}\\Phi(p_0 - \\sigma\\sqrt{T}) \\)"}</MathJax> where <MathJax inline>{"\\( p_0 = \\frac{\\log \\left(S_0/K\\right) + \\left(r + \\frac{\\sigma^2}{2}\\right)T}{\\sigma\\sqrt{T}}\\)"}</MathJax>. When we sell the option, we also 
    	buy <MathJax inline>{"\\( \\Delta = \\Phi(p_0) \\)"}</MathJax> shares of stock for <MathJax inline>{"\\( S_0\\Phi(p_0) \\)"}</MathJax> to hedge. Thus, our total investment is given by 
	    <MathJax className='math-container'>
	        {`\\[
	             S_0\\Phi(p_0) - \\left(S_0\\Phi(p_0) - K e^{-rT}\\Phi(p_0 - \\sigma\\sqrt{T}) \\right) = K e^{-rT}\\Phi(p_0 - \\sigma\\sqrt{T}) 
	        \\]`}
	    </MathJax> 
	    Suppose we don't readjust <MathJax inline>{"\\( \\Delta \\)"}</MathJax> before expiration. Then, if the stock price is greater than the strike price when the option expires, we buy an additional <MathJax inline>{"\\( 1-\\Delta \\)"}</MathJax> shares to deliver to the option holder and get <MathJax inline>{"\\( K \\)"}</MathJax> in return (net <MathJax inline>{"\\( K - (1-\\Delta)S_T \\)"}</MathJax>). If the option is out of the money, we simply liquidate our stock holdings for <MathJax inline>{"\\( \\Delta S_T \\)"}</MathJax>. 
	    This gives us the following return 
	    <MathJax className='math-container'>
	        {`\\[
	          \\begin{aligned}
	              \\begin{cases}
	              	\\left(\\frac{S_T\\Phi(p_0)- (S_T- K)}{K \\Phi(p_0 - \\sigma\\sqrt{T})}\\right)e^{rT} - 1 & \\text{if } S_T > K \\\\
	              	\\left(\\frac{S_T\\Phi(p_0)}{K \\Phi(p_0 - \\sigma\\sqrt{T})}\\right)e^{rT} - 1& \\text{if } S_T \\leq K 
	              \\end{cases} 
	    	  \\end{aligned}
	        \\]`}
	    </MathJax> 
	    If, instead of selling an option, we had simply invested <MathJax inline>{"\\( K e^{-rT}\\Phi(p_0 - \\sigma\\sqrt{T})  \\)"}</MathJax> in a continuously compounding risk-free asset, our return would be <MathJax inline>{"\\( e^{rT} - 1 \\)"}</MathJax>. 
	    As time to expiration goes to zero, both our option-selling return and our risk-free return go to zero. As volatility goes to zero, our return on selling an at-the-money option converges to the risk-free return 
	    since <MathJax inline>{"\\( \\lim_{\\sigma \\to 0} \\Phi(p_0) =  \\lim_{\\sigma \\to 0} \\Phi(p_0 - \\sigma\\sqrt{T}) = 1\\)"}</MathJax> and <MathJax inline>{"\\( S_0 = S_T = K \\)"}</MathJax>. For nonzero time to expiration and volatility, our option-selling return 
	    is equal to the risk-free return only in the special case where 
	    <MathJax className='math-container'>
	        {`\\[
	          \\begin{aligned}
	              \\begin{cases}
	              	S_T\\Phi (-p_0) = K\\Phi(\\sigma\\sqrt{T} - p_0) & \\text{if } S_T > K \\\\
	              	S_T\\Phi (p_0) = K\\Phi(p_0 - \\sigma\\sqrt{T})  & \\text{if } S_T \\leq K 
	              \\end{cases} 
	    	  \\end{aligned}
	        \\]`}
	    </MathJax> 
	    Thus, as volatility and time to expiration increase in a way that is not offset by the difference in the strike price and the stock price, the option-selling return moves away from the risk-free return. The variation created by this imperfect hedging becomes more 
	    pronounced as parameters shift more in between each hedging readjustment.
    	</p>
    	<p className='heading2'>Imperfect Hedging Graph</p>
    	<p>
    	Use the figure below to explore how the timing and number of hedging adjustments affects the value of a hedged-option investment, where you sell call options and buy stock shares, as compared to the value of a risk-free investment. At the beginning of the period (i.e., 252 trading days, or one trading year, from expiration), the stock price is $100. 
    	The stock price evolves according to GBM with volatility .2, and we have a constant annual risk-free rate of 10%. One trading year from expiration, suppose we sell call options and perfectly hedge according to Black-Scholes so that the net amount of money we've put into the hedged-option investment is $100 <MathJax inline>{"\\( \\left(\\text{# shares} = \\frac{\\Delta\\text{(Net Investment Amount)}}{\\Delta S - C}\\text{, }\\text{# options}= \\frac{\\text{Net Investment Amount}}{\\Delta S - C}\\right) \\)"}</MathJax>. 
    	Then, at each readjustment period, we completely liquidate our investment (i.e., we sell our shares and buy call options to cover) and then reinvest, as we did before, so (1) we are perfectly hedged according to Black-Scholes and (2) the net value of our investment is $100. After we completely liquidate, the amount by which our liquidated investment differs from our initial investment becomes the "Value Added." If we keep a cumulative total of the value added at each readjustment, we can keep track of the growth of our hedged-option investment 
    	over time and compare it to the growth of a risk-free investment. 
    	</p>
    	<p>
    	The figure starts out with no hedging readjustments (i.e., we only liquidate upon expiration). Click on different time periods on the stock-price graph to add hedging readjustments. Reset everything back to no readjustments by pressing the "Reset Graph" button. 
    	The table below keeps track of prices, quantities, and value added at each readjustment period. Note that, within each row, (Shares Purchased)*(Stock Price) - (Options Sold)*(Option Price) = $100, since we keep our investment amount constant. "Value Added" is equal to the product of "Shares Purchased" in the prior period and "Stock Price" in the current period minus the product of "Options Sold" in the prior period and "Option Price" in the current period.
    	</p>
    	<Volatility />
    	</MathJaxContext>
    	<PageNavigator group="BS"/>
    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
        </div>
  );
}

export default BS8;