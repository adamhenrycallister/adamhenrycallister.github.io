import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function BS3() {
  return (
    	<div className='BlackScholes'>
    	<PageNavigator group="BS"/>
    		<p className='heading1'>The Black-Scholes Equation</p>
    		<MathJaxContext>
    	<div id='setup'>
	    	<p className = 'heading2' >Setup</p>
	    	<p>
	      	We want to find the price of some derivative security as a function of the price of the underlying stock, <MathJax inline>{"\\(S_t\\)"}</MathJax>, and time, <MathJax inline>{"\\(t\\)"}</MathJax>. Let's call the derivative price <MathJax inline>{"\\(V(S_t,t)\\)"}</MathJax>. Assume that the stock price
	      	 follows geometric Brownian motion (GBM), and there is a risk-free bond with continuously compounding
	      	  interest at a rate of <MathJax inline>{"\\(r\\)"}</MathJax>. This gives us the following differential equations for the stock
	      	   and bond prices:
		      <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		            dS_t &= S_t \\mu dt + S_t \\sigma dW_t \\quad  &\\text{(1)} \\\\
		            dB_t &= rB_tdt \\quad  &\\text{(2)} 
		          \\end{aligned}
		        \\]`}
		      </MathJax>
		      If this way of defining the stock and bond prices looks intimidating, remember that GBM means the stock price is determined according to <MathJax inline>{"\\(S_t = S_0 e^{\\left(\\mu - \\frac{\\sigma^2}{2}\\right)t + \\bar \\sigma W_t}\\)"}</MathJax>, and 
		      the bond equation can be solved as <MathJax inline>{"\\( B_t = B_0e^{rt}\\)"}</MathJax>.
	      	</p>
      	</div>
     	<div id='risk_free_portfolio'>
     	  <p className='heading2'>Risk-Free Portfolio</p>
	      <p>
	      	Our first move will be to construct a risk-free portfolio with the stock and the derivative. The idea here is that, if I purchase a given number of stock shares, I should be able to perfectly hedge my exposure to the stock price risk  
	      	by shorting some number of derivative shares. In other words, I should be able to come up with a ratio of purchased stock shares to shorted derivative shares that will guarantee me a certain (risk-free) return. 
	      </p>
	      <p>
	      	Before we construct our risk-free portfolio, let's find an expression involving the derivative price. Note that the derivative price, <MathJax inline>{"\\(V(S_t,t)\\)"}</MathJax>, is a function of a stochastic process <MathJax inline>{"\\( S_t \\)"}</MathJax>. Thus, 
	        we can apply Ito's lemma to get that
		      <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		            d V(S_t, t) = \\left(\\frac{\\partial V}{\\partial t} + S_t \\mu \\frac{\\partial V}{\\partial S} 
		            + \\frac{S_t^2 \\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2}\\right)dt 
		            + S_t \\sigma \\frac{\\partial V}{\\partial S}d W_t \\quad \\quad  \\text{(3)} 
		          \\end{aligned}
		        \\]`}
		      </MathJax>
	      </p>
	      <p>
	      Now, for a given number of stock shares, we want to find out how many derivative shares we should short to guarantee us a certain return. To normalize things, let's assume we short
	       one derivative share and purchase <MathJax inline>{"\\( \\Delta \\)"}</MathJax> shares of stock. The value of our investment at time <MathJax inline>{"\\(t\\)"}</MathJax> is given by 
	      	<MathJax className='math-container'>
		        {`\\[
		          \\Pi = \\Delta S_t - V(S_t, t) \\quad \\quad  \\text{(4)} 
		        \\]`}
		    </MathJax>
		    This value evolves according to the differential equation
	      	<MathJax className='math-container'>
		        {`\\[
		          d \\Pi = \\Delta d S_t - d V(S_t, t)
		        \\]`}
		    </MathJax>
		    Plugging in for <MathJax inline>{"\\( d S_t \\)"}</MathJax> in equation 1 and using our expression
		     for <MathJax inline>{"\\( d V(S_t, t) \\)"}</MathJax> in equation 3, we get
	      	<MathJax className='math-container'>
		        {`\\[
		              d \\Pi = \\left(\\Delta S_t \\mu - \\frac{\\partial V}{\\partial t} - S_t \\mu \\frac{\\partial V}{\\partial S} - 
		              \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2}\\right)dt + \\left(\\Delta S_t \\sigma 
		              	- S_t \\sigma \\frac{\\partial V}{\\partial S}\\right)dW_t \\quad \\text{(5)}
		        \\]`}
		    </MathJax>
		    Now, we can choose <MathJax inline>{"\\( \\Delta \\)"}</MathJax> to eliminate the stochastic component of the portfolio return
		     <MathJax inline>{"\\( \\left(\\left(\\Delta S_t \\sigma - S_t \\sigma \\frac{\\partial V}{\\partial S}\\right)dW_t\\right) \\)"}</MathJax> and make the return risk-free.
		      To do this, we must have that 
		      <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		            \\Delta S_t \\sigma = S_t \\sigma \\frac{\\partial V}{\\partial S} \\\\
	    			\\Leftrightarrow \\Delta = \\frac{\\partial V}{\\partial S} 
	    		  \\end{aligned}
		        \\]`}
		      </MathJax>
	      </p>
     	</div>
     	<div id='no_arbitrage'>
     	  <p className='heading2'>No-Arbitrage Condition</p>
	      <p>
	      	Next, we apply a no-arbitrage condition. No arbitrage requires that two assets with the same payoff in all possible states of the world have the same price. An arbitrage opportunity arises when there are two differently priced 
	      	assets with the same future payoff. Such an opportunity would allow for a risk-free future payoff by simply shorting the overpriced asset and purchasing the underpriced asset. Under no arbitrage, we assume such opportunities do not exist.
	      </p>
	      <p>
	      	Since the portfolio we just constructed 
	      	is risk-free, no arbitrage requires that its value matches the price of the risk-free 
	      	asset at every point in time. Thus, using equation 2, we have that
	      	<MathJax className='math-container'>
		        {`\\[
		          d\\Pi = r\\Pi dt
		        \\]`}
		    </MathJax>
		    Plugging in equation 5 for <MathJax inline>{"\\( d \\Pi \\)"}</MathJax> and equation 4 for <MathJax inline>{"\\( \\Pi \\)"}</MathJax> gives us
	      	<MathJax className='math-container'>
		        {`\\[
		          \\left(\\Delta S_t \\mu - \\frac{\\partial V}{\\partial t} - S_t \\mu \\frac{\\partial V}{\\partial S} - \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2}\\right)dt
		           + \\left(\\Delta S_t \\sigma - S_t \\sigma \\frac{\\partial V}{\\partial S}\\right)dW_t  = r\\left(\\Delta S_t - V\\right)dt
		        \\]`}
		    </MathJax>
		    We can also plug in <MathJax inline>{"\\( \\Delta = \\frac{\\partial V}{\\partial S} \\)"}</MathJax>
	      	<MathJax className='math-container'>
		        {`\\[
		        	\\begin{aligned}
		 				\\left(S_t \\mu \\frac{\\partial V}{\\partial S} - \\frac{\\partial V}{\\partial t} - S_t \\mu \\frac{\\partial V}{\\partial S} - \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2}\\right)dt  
		 				&=  \\left(rS_t \\frac{\\partial V}{\\partial S} - rV\\right)dt \\\\
	    				\\frac{\\partial V}{\\partial t} + \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2} + rS_t \\frac{\\partial V}{\\partial S} - rV &= 0 
		            \\end{aligned}
		        \\]`}
		    </MathJax>
		    This is the famous Black-Scholes equation. Notice that we do not have an explicit formula for the derivative price <MathJax inline>{"\\( V \\)"}</MathJax>, but a partial differential equation (PDE)
		     relating the derivative price to the underlying stock price, the volatility of the underlying stock price, the risk-free rate, and time. 
	      </p>	
	      <p>
	      In the next section, we'll transform this complicated PDE into a PDE for which there is a known solution. 
	      </p>
     	</div>
    		</MathJaxContext>
    	<PageNavigator group="BS"/>
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
        </div>
  );
}

export default BS3;