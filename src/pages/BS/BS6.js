import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function BS6() {
  return (
    	<div className='BlackScholes'>
    	<PageNavigator />
    		<p className='heading1'>Comparative Statics</p>
    	<MathJaxContext>
    		<div id='overview'>
    			<p className='heading2'>Overview</p>
    			<p>
    			In the last section we found the price of a European call option 
			    <MathJax>
			        {`\\[
			          	V(S_t, t) = S_t  \\Phi(p) -Ke^{-r(T-t)}  \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right)
			        \\]`}
			    </MathJax>
			    where 
			    <MathJax>
			        {`\\[
			          	p = \\frac{\\log{\\left(S_t/K\\right)} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)}{\\sigma \\sqrt{T-t}}
			        \\]`}
			    </MathJax>
			    </p>
			   	<p>
			   	With the pricing equation in hand, we can see how the current stock price (<MathJax inline>{"\\( S_t \\)"}</MathJax>), the strike price (<MathJax inline>{"\\( K \\)"}</MathJax>), the risk-free rate (<MathJax inline>{"\\( r \\)"}</MathJax>), the stock's volatility (<MathJax inline>{"\\( \\sigma \\)"}</MathJax>), and the time to expiration (<MathJax inline>{"\\( T-t \\)"}</MathJax>) affect 
			   		the option price. To do this, we'll take a bunch of derivatives. Before we jump in, let's go over two things that will make life a lot easier: First, recall that the derivative of the standard normal cdf gives us the standard normal pdf, which we'll call <MathJax inline>{"\\( \\phi \\)"}</MathJax>. This looks like
			   <MathJax>
			        {`\\[
			          	\\frac{d\\Phi(x)}{d x} = \\phi(x) = \\frac{e^{\\frac{-x^2}{2}}}{\\sqrt{2\\pi}}
			        \\]`}
			    </MathJax>
			    Second, let's convince ourselves that the following expression is equal to zero:
			   <MathJax>
			        {`\\[
			          	\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)}
			        \\]`}
			    </MathJax>
			    This expression is going to show up in all of our derivatives, so let's go over why we can ignore it when it comes up. For future reference, we'll denote this expression with a <MathJax inline>{"\\( (*) \\)"}</MathJax> and call it the <MathJax inline>{"\\( (*) \\)"}</MathJax> expression. 
			    To begin, we'll rewrite the <MathJax inline>{"\\( (*) \\)"}</MathJax> expression using the functional form of the standard normal pdf.
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
						\\frac{1}{\\sqrt{2\\pi}} \\left( S_t e^{\\frac{-p^2}{2}} - Ke^{-r(T-t)- \\frac{\\left(p-\\sigma\\sqrt{T-t}\\right)^2}{2}} \\right) 
			    	  	= \\frac{e^{\\frac{-p^2}{2}}}{\\sqrt{2\\pi}} \\left( S_t - Ke^{p\\sigma\\sqrt{T-t} -\\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)} \\right)
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    Now, let's use our definition of <MathJax inline>{"\\( p \\)"}</MathJax> to get rid of another variable. If we solve for <MathJax inline>{"\\( K \\)"}</MathJax> in terms 
			    of <MathJax inline>{"\\( p \\)"}</MathJax>, we get <MathJax inline>{"\\( K = S_t e^{-p\\sigma \\sqrt{T-t} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)} \\)"}</MathJax>. Plugging this in for <MathJax inline>{"\\( K \\)"}</MathJax> in the <MathJax inline>{"\\( (*) \\)"}</MathJax> expression, 
			    we get
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			    	  	\\frac{e^{\\frac{-p^2}{2}}}{\\sqrt{2\\pi}} \\left( S_t - \\left(S_t e^{-p\\sigma \\sqrt{T-t} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)} \\right)e^{p\\sigma\\sqrt{T-t} -\\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)} \\right)
			    	  	= \\frac{e^{\\frac{-p^2}{2}}}{\\sqrt{2\\pi}} (S_t - S_t) = 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    Thus, whenever the <MathJax inline>{"\\( (*) \\)"}</MathJax> expression comes up, we'll know that it all cancels to zero. 
			    </p>
			</div>
			<div id='stock_price'>
			    <p className='heading2'>Stock Price</p>
			    <p>
			   	We start by taking the derivative of <MathJax inline>{"\\( V \\)"}</MathJax> with respect to <MathJax inline>{"\\( S_t \\)"}</MathJax>.
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial V}{\\partial S_t} &= \\Phi(p) + S_t \\phi(p)\\frac{\\partial p}{\\partial S_t} - Ke^{-r(T-t)}\\phi\\left(p-\\sigma\\sqrt{T-t}\\right) \\frac{\\partial p}{\\partial S_t} \\\\
			            &= \\Phi(p) + \\frac{\\partial p}{\\partial S_t} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= \\Phi(p) > 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    This tells us that the option price should increase as the current stock price increases. 
			    </p>
			</div>
			<div id='strike_price'>
			    <p className='heading2'>Strike Price</p>
			    <p>
			    Now let's look at how the strike price affects the option price.
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial V}{\\partial K} &= S_t\\phi(p) \\frac{\\partial p}{\\partial K} - e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\frac{\\partial p}{\\partial K} \\\\
			            &= - e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) + \\frac{\\partial p}{\\partial K} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= - e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) < 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    	Thus, the option price should decrease as the strike price increases. 
			   	</p>
			</div>
			<div id='risk_fee_rate'>
				<p className='heading2'>Risk-Free Rate</p>
				<p>
			    	Now let's consider the risk-free rate.
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial V}{\\partial r} &=  S_t\\phi(p) \\frac{\\partial p}{\\partial r} +(T-t)Ke^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\frac{\\partial p}{\\partial r} \\\\
			            &= (T-t)Ke^{-r(T-t)} + \\frac{\\partial p}{\\partial r} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= (T-t)Ke^{-r(T-t)} > 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			    	This tells us the option price should increase as the risk-free rate increases. 
			    </p>
			</div>
			<div id = 'volatility'>
				<p className='heading2'>Volatility</p>
			   	<p>
			    Next, we have the volatility of the underlying stock.
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial V}{\\partial \\sigma} &=  S_t\\phi(p) \\frac{\\partial p}{\\partial \\sigma} - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\left( \\frac{\\partial p}{\\partial K} - \\sqrt{T-t}\\right) \\\\
			            &= \\sqrt{T-t}K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) +  \\frac{\\partial p}{\\partial \\sigma} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= \\sqrt{T-t}K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) > 0 
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			    	Thus, the option price should increase as the volatility of the underlying stock price increases. 
			    </p>
			</div>
			<div id='time'>
				<p className='heading2'>Time to Expiration</p>		
			    <p>
			    	Finally, we consider the time to expiration.
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial V}{\\partial (T-t)} &= S_t\\phi(p) \\frac{\\partial p}{\\partial (T-t)} + r K e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\left( \\frac{\\partial p}{\\partial (T-t)} - \\frac{\\sigma}{2\\sqrt{T-t}}\\right) \\\\
			            &= rKe^{r(T-t)}\\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) + \\frac{Ke^{-r(T-t)}\\sigma}{2\\sqrt{T-t}}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right) + \\frac{\\partial p}{\\partial (T-t)} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right)  \\\\
			            &= Ke^{-r(T-t)} \\left(r\\Phi\\left(p - \\sigma\\sqrt{T-t}\\right)  +  \\frac{\\sigma}{2\\sqrt{T-t}}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\right) > 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			     This tells us that the option price should increase as the amount of time before the option expires increases. 
			   	</p>
			</div>
    	</MathJaxContext>
    	<PageNavigator />
    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
        </div>
  );
}

export default BS6;