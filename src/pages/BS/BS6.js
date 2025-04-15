import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";
import ExampleBox from "../../components/ExampleBox";

function BS6() {
  return (
    	<div className='BlackScholes'>
    	<PageNavigator group="BS"/>
    		<p className='heading1'>Comparative Statics</p>
    	<MathJaxContext>
    		<div id='overview'>
    			<p className='heading2'>Overview</p>
    			<p>
    			In the last section we found the price of a European call option 
			    <MathJax className='math-container'>
			        {`\\[
			          	C(S_t, t) = S_t  \\Phi(p) -Ke^{-r(T-t)}  \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right)
			        \\]`}
			    </MathJax>
			    and a European put option 
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
			    </p>
			   	<p>
			   	With these pricing equations in hand, we can see how the current stock price (<MathJax inline>{"\\( S_t \\)"}</MathJax>), the strike price (<MathJax inline>{"\\( K \\)"}</MathJax>), the risk-free rate (<MathJax inline>{"\\( r \\)"}</MathJax>), the stock's volatility (<MathJax inline>{"\\( \\sigma \\)"}</MathJax>), and the time to expiration (<MathJax inline>{"\\( T-t \\)"}</MathJax>) affect 
			   		option prices. To do this, we'll take a bunch of derivatives. Before we jump in, let's go over two things that will make life a lot easier: First, recall that the derivative of the standard normal cdf gives us the standard normal pdf, which we'll call <MathJax inline>{"\\( \\phi \\)"}</MathJax>. This looks like
			   <MathJax className='math-container'>
			        {`\\[
			          	\\frac{d\\Phi(x)}{d x} = \\phi(x) = \\frac{e^{\\frac{-x^2}{2}}}{\\sqrt{2\\pi}}
			        \\]`}
			    </MathJax>
			    Second, let's convince ourselves that the following expression is equal to zero:
			   <MathJax className='math-container'>
			        {`\\[
			          	\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)}
			        \\]`}
			    </MathJax>
			    This expression is going to show up in all of our derivatives, so let's go over why we can ignore it when it comes up. For future reference, we'll denote this expression with a <MathJax inline>{"\\( (*) \\)"}</MathJax> and call it the <MathJax inline>{"\\( (*) \\)"}</MathJax> expression. 
			    To begin, we'll rewrite the <MathJax inline>{"\\( (*) \\)"}</MathJax> expression using the functional form of the standard normal pdf.
			    <MathJax className='math-container'>
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
			    <MathJax className='math-container'>
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
			   	We start by taking derivatives with respect to <MathJax inline>{"\\( S_t \\)"}</MathJax>. In the case of a call, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial C}{\\partial S_t} &= \\Phi(p) + S_t \\phi(p)\\frac{\\partial p}{\\partial S_t} - Ke^{-r(T-t)}\\phi\\left(p-\\sigma\\sqrt{T-t}\\right) \\frac{\\partial p}{\\partial S_t} \\\\
			            &= \\Phi(p) + \\frac{\\partial p}{\\partial S_t} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= \\Phi(p) > 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    In the case of a put, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial P}{\\partial S_t} &= -\\Phi(-p) + S_t \\phi(-p)\\frac{\\partial p}{\\partial S_t} - Ke^{-r(T-t)}\\phi\\left(\\sigma\\sqrt{T-t} - p\\right) \\frac{\\partial p}{\\partial S_t} \\\\
			            &= -\\Phi(-p) + \\frac{\\partial p}{\\partial S_t} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= -\\Phi(-p) < 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    This tells us that, as the current stock price increases, the call price should increase and the put price should decrease. 
			    </p>
			</div>
			<div id='strike_price'>
			    <p className='heading2'>Strike Price</p>
			    <p>
			    Now let's look at how the strike price affects option prices. In the case of a call, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial C}{\\partial K} &= S_t\\phi(p) \\frac{\\partial p}{\\partial K} - e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\frac{\\partial p}{\\partial K} \\\\
			            &= - e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) + \\frac{\\partial p}{\\partial K} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= - e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) < 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
				In the case of a put, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial P}{\\partial K} &= S_t\\phi(-p) \\frac{\\partial p}{\\partial K} + e^{-r(T-t)} \\Phi\\left(\\sigma\\sqrt{T-t} - p\\right) - K e^{-r(T-t)} \\phi\\left(\\sigma\\sqrt{T-t}- p\\right) \\frac{\\partial p}{\\partial K} \\\\
			            &= e^{-r(T-t)} \\Phi\\left( \\sigma\\sqrt{T-t}-p\\right) + \\frac{\\partial p}{\\partial K} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= e^{-r(T-t)} \\Phi\\left(\\sigma\\sqrt{T-t}-p\\right) > 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    	Thus, as the strike price increases, the call price should decrease and the put price should increase.
			   	</p>
			</div>
			<div id='risk_fee_rate'>
				<p className='heading2'>Risk-Free Rate</p>
				<p>
			    	Now let's consider the risk-free rate. In the case of a call, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial C}{\\partial r} &=  S_t\\phi(p) \\frac{\\partial p}{\\partial r} +(T-t)Ke^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\frac{\\partial p}{\\partial r} \\\\
			            &= (T-t)Ke^{-r(T-t)}\\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) + \\frac{\\partial p}{\\partial r} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= (T-t)Ke^{-r(T-t)}\\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) > 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			    In the case of a put, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial P}{\\partial r} &=  S_t\\phi(-p) \\frac{\\partial p}{\\partial r} -(T-t)Ke^{-r(T-t)} \\Phi\\left(\\sigma\\sqrt{T-t}-p\\right) - K e^{-r(T-t)} \\phi\\left(\\sigma\\sqrt{T-t}-p\\right) \\frac{\\partial p}{\\partial r} \\\\
			            &= -(T-t)Ke^{-r(T-t)}\\Phi\\left(\\sigma\\sqrt{T-t}-p\\right) + \\frac{\\partial p}{\\partial r} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= -(T-t)Ke^{-r(T-t)}\\Phi\\left(\\sigma\\sqrt{T-t}-p\\right) < 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			    	Thus, as the risk-free rate increases, the call price should increase and the put price should decrease.
			    </p>
			</div>
			<div id = 'volatility'>
				<p className='heading2'>Volatility</p>
			   	<p>
			    Next, we have the volatility of the underlying stock. In the case of a call, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial C}{\\partial \\sigma} &=  S_t\\phi(p) \\frac{\\partial p}{\\partial \\sigma} - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\left( \\frac{\\partial p}{\\partial \\sigma} - \\sqrt{T-t}\\right) \\\\
			            &= \\sqrt{T-t}K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) +  \\frac{\\partial p}{\\partial \\sigma} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= \\sqrt{T-t}K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) > 0 
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
				In the case of a put, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial P}{\\partial \\sigma} &=  S_t\\phi(-p) \\frac{\\partial p}{\\partial \\sigma} - K e^{-r(T-t)} \\phi\\left(\\sigma\\sqrt{T-t}-p\\right) \\left( \\frac{\\partial p}{\\partial \\sigma} - \\sqrt{T-t}\\right) \\\\
			            &= \\sqrt{T-t}K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) +  \\frac{\\partial p}{\\partial \\sigma} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right) \\\\
			            &= \\sqrt{T-t}K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) > 0 
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			    	Thus, both the price of a call and the price of a put should increase as the volatility of the underlying stock price increases. 
			    </p>
			</div>
			<div id='time'>
				<p className='heading2'>Time to Expiration</p>		
			    <p>
			    	Finally, we consider the time to expiration. In the case of a call, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial C}{\\partial (T-t)} &= S_t\\phi(p) \\frac{\\partial p}{\\partial (T-t)} + r K e^{-r(T-t)} \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) - K e^{-r(T-t)} \\phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\left( \\frac{\\partial p}{\\partial (T-t)} - \\frac{\\sigma}{2\\sqrt{T-t}}\\right) \\\\
			            &=  \\frac{Ke^{-r(T-t)}\\sigma}{2\\sqrt{T-t}}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right) + rKe^{r(T-t)}\\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) + \\frac{\\partial p}{\\partial (T-t)} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right)  \\\\
			            &= Ke^{-r(T-t)} \\left(\\frac{\\sigma}{2\\sqrt{T-t}}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right) + r\\Phi\\left(p - \\sigma\\sqrt{T-t}\\right) \\right) > 0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			    This tells us that the call price should increase as the amount of time before the option expires increases. In the case of a put, we have 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\frac{\\partial P}{\\partial (T-t)} &= S_t\\phi(-p) \\frac{\\partial p}{\\partial (T-t)} - r K e^{-r(T-t)} \\Phi\\left(\\sigma\\sqrt{T-t}-p\\right) - K e^{-r(T-t)} \\phi\\left(\\sigma\\sqrt{T-t}-p\\right) \\left( \\frac{\\partial p}{\\partial (T-t)} - \\frac{\\sigma}{2\\sqrt{T-t}}\\right) \\\\
			            &=  \\frac{Ke^{-r(T-t)}\\sigma}{2\\sqrt{T-t}}\\phi\\left(\\sigma\\sqrt{T-t}-p\\right) - rKe^{r(T-t)}\\Phi\\left(\\sigma\\sqrt{T-t}-p\\right) + \\frac{\\partial p}{\\partial (T-t)} \\left(\\underbrace{S_t \\phi(p) - Ke^{-r(T-t)}\\phi\\left(p - \\sigma\\sqrt{T-t}\\right)}_{(*)} \\right)  \\\\
			            &= Ke^{-r(T-t)} \\left(\\frac{\\sigma}{2\\sqrt{T-t}}\\phi\\left(\\sigma\\sqrt{T-t}-p\\right) - r\\Phi\\left(\\sigma\\sqrt{T-t}-p\\right) \\right)
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	
			    </p>
			    <p>
			     The effect of time to expiration on the put price depends on other parameters. We can say that increasing the time to expiration should increase the put price if 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            \\underbrace{\\frac{\\sigma}{2r\\sqrt{T-t}}}_{g_1} - \\underbrace{\\frac{\\Phi\\left(\\sigma\\sqrt{T-t} - p\\right)}{\\phi\\left(\\sigma\\sqrt{T-t} - p\\right)}}_{g_2} >0
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>	    
			    Let's call the whole expression on the left-hand side of the inequality <MathJax inline>{"\\( G = g_1 - g_2\\)"}</MathJax>. Now, we can consider the effect of stock price, strike price, risk-free rate, volatility, and time to expiration on <MathJax inline>{"\\( G \\)"}</MathJax>. 
			    If <MathJax inline>{"\\( G \\)"}</MathJax> is increasing (decreasing) in a given parameter, we can say that a higher (lower) value of that parameter makes it more likely that the put price will increase as the time to expiration increases.
			   	</p>
			   	<p>
			   	Before we jump into more derivatives, let's consider <MathJax inline>{"\\( g_2 \\)"}</MathJax>. 
			   	This is the ratio of the standard normal cdf to the standard normal pdf, which is increasing in its argument. In other words, for any value <MathJax inline>{"\\( x \\)"}</MathJax>, <MathJax inline>{"\\( \\frac{d}{dx}\\left(\\frac{\\Phi(x)}{\\phi(x)}\\right) \\geq 0 \\)"}</MathJax>. Thus, the derivative 
			   	of <MathJax inline>{"\\( g_2 \\)"}</MathJax> will have the same sign as the derivative of <MathJax inline>{"\\( \\sigma\\sqrt{T-t} - p\\)"}</MathJax>.
			   	</p>
			   	<p>
			   	First, let's look at the stock price and the strike price. Since <MathJax inline>{"\\( \\frac{\\partial p}{\\partial S_t} = \\frac{1}{S_t \\sigma\\sqrt{T-t}} \\)"}</MathJax>, we have that <MathJax inline>{"\\( \\frac{\\partial g_2}{\\partial S_t} \\leq 0 \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{\\partial G}{\\partial S_t}  \\geq 0\\)"}</MathJax>, which means a higher stock price 
			   	makes it more likely that increasing time to expiration will increase the put price. In contrast, 
			   	since <MathJax inline>{"\\( \\frac{\\partial p}{\\partial K} = -\\frac{1}{K \\sigma\\sqrt{T-t}} \\)"}</MathJax>, we have that <MathJax inline>{"\\( \\frac{\\partial g_2}{\\partial K} \\geq 0 \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{\\partial G}{\\partial K}  \\leq 0\\)"}</MathJax>, which means a higher stike price 
			   	makes it less likely that increasing the time to expiration will increase the put price. Taken together, this suggests that far out-of-the-money put options are more likely to have a price increase when we increase their time to expiration. 
			   	</p>
			   	<p>
			   	The signs of <MathJax inline>{"\\( \\frac{\\partial G}{\\partial r} \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{\\partial G}{\\partial \\sigma} \\)"}</MathJax> both depend on other parameters. However, if the <MathJax inline>{"\\( g_1 \\)"}</MathJax> term dominates, 
			   	then we should generally expect higher volatility and lower risk-free rate make it more likely that increasing time to expiration will increase put price. 
			   	</p>
			   	<p>
			   	Finally, since <MathJax inline>{"\\( \\frac{\\partial }{\\partial (T-t)}\\left(\\sigma \\sqrt{T-t} - p\\right) = \\frac{\\sigma^2 - 2r}{4\\sigma\\sqrt{T-t}} \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{\\partial g_1}{\\partial (T-t)} = \\frac{-\\sigma}{4r(T-t)^{3/2}}\\)"}</MathJax>, we can be sure that <MathJax inline>{"\\( \\frac{\\partial G}{\\partial (T-t)} \\leq 0 \\)"}</MathJax> if <MathJax inline>{"\\( \\sigma^2 \\geq 2r\\)"}</MathJax>. 
			   	This means that put options with a long time before expiration will not likely experience a price increase if we make their time to expiration even greater.
			   	</p>
			</div>
			<div id='summary'>
			<p className='heading2'>Summary</p>	
		    <div className="table-wrapper">
		    <table className="my-table">
		      <thead>
		        <tr>
		          <th></th>
		          <th className="table-entry-head" colSpan={2}>Price Effect</th>
		        </tr>
		      </thead>
		      <thead>
		        <tr>
		          <th className="table-entry-head">Increase in Parameter</th>
		          <th className="table-entry-head">Call Option</th>
		          <th className="table-entry-head">Put Option</th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr className="table-row">
		          <td className="table-entry">Stock Price (<MathJax inline>{"\\( S_t \\)"}</MathJax>)</td>
		          <td className="table-entry"><MathJax inline>{"\\( \\uparrow \\)"}</MathJax></td>
		          <td className="table-entry"><MathJax inline>{"\\( \\downarrow \\)"}</MathJax></td>
		        </tr>
		        <tr className="table-row">
		          <td className="table-entry">Strike Price (<MathJax inline>{"\\( K \\)"}</MathJax>)</td>
		          <td className="table-entry"><MathJax inline>{"\\( \\downarrow \\)"}</MathJax></td>
		          <td className="table-entry"><MathJax inline>{"\\( \\uparrow \\)"}</MathJax></td>
		        </tr>
		        <tr className="table-row">
		          <td className="table-entry">Risk-Free Rate (<MathJax inline>{"\\( r \\)"}</MathJax>)</td>
		          <td className="table-entry"><MathJax inline>{"\\( \\uparrow \\)"}</MathJax></td>
		          <td className="table-entry"><MathJax inline>{"\\( \\downarrow \\)"}</MathJax></td>
		        </tr>
		        <tr className="table-row">
		          <td className="table-entry">Volatility (<MathJax inline>{"\\( \\sigma \\)"}</MathJax>)</td>
		          <td className="table-entry"><MathJax inline>{"\\( \\uparrow \\)"}</MathJax></td>
		          <td className="table-entry"><MathJax inline>{"\\( \\uparrow \\)"}</MathJax></td>
		        </tr>
		        <tr className="table-row">
		          <td className="table-entry">Time to Expiration (<MathJax inline>{"\\( T-t \\)"}</MathJax>)</td>
		          <td className="table-entry"><MathJax inline>{"\\( \\uparrow \\)"}</MathJax></td>
		          <td className="table-entry">depends</td>
		        </tr>
		      </tbody>
		    </table>
		    </div>
			</div>
    	</MathJaxContext>
    	<PageNavigator group="BS"/>
    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
        </div>
  );
}

export default BS6;