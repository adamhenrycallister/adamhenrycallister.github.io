import React, { useState } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import GBMChart from "./GBMviz";
import BrownianMotion2D from "./BMviz";
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function BS2() {
  // State for mu, sigma, S0
  const [mu, setMu] = useState(0.1);  // Drift
  const [sigma, setSigma] = useState(0.5);  // Volatility
  const [S0, setS0] = useState(120);  // Initial value
  return (
    	<div className='BlackScholes'>
    	<PageNavigator group="BS" />
    	<MathJaxContext>
    	<p className='heading1'>Stochastic Calculus</p>
    	<div id = 'brownian_motion'>
	    	<p className='heading2'>Brownian Motion</p>
	    	<p>
	    		Brownian motion describes random movement. We model this type of movement using a Wiener process, which describes the location of a randomly moving particle, <MathJax inline>{"\\(W_t\\)"}</MathJax>, at any point in continuous time, <MathJax inline>{"\\( t \\)"}</MathJax>. 
	    		To build some intuition, let's pretend for a moment that we are dealing with discrete time so that <MathJax inline>{"\\(t \\in \\{0,1,2,...\\}\\)"}</MathJax>.
	    		At <MathJax inline>{"\\(t = 0\\)"}</MathJax>, the particle starts at location 0 (i.e., <MathJax inline>{"\\(W_0 = 0\\)"}</MathJax>). At <MathJax inline>{"\\(t = 1\\)"}</MathJax>, we draw a value from a standard normal distribution, <MathJax inline>{"\\(x_1\\)"}</MathJax>, and move the particle to <MathJax inline>{"\\( W_1 = W_0 + x_1 = x_1\\)"}</MathJax>. 
	    		At <MathJax inline>{"\\(t = 1\\)"}</MathJax>, we draw another value from a standard normal distribution, <MathJax inline>{"\\(x_2\\)"}</MathJax>, and move the particle to <MathJax inline>{"\\(W_2 = W_1 + x_2 = x_1 + x_2\\)"}</MathJax>. 
	    		In general, we have that the location at time <MathJax inline>{"\\(t = n\\)"}</MathJax> is given by the sum of the independent draws in each previous period, <MathJax inline>{"\\(W_n = x_1 + x_2 + ... + x_n\\)"}</MathJax>. At <MathJax inline>{"\\(t = 0\\)"}</MathJax>, before we make any draws, 
	    		we know that the distribution of possible locations at time <MathJax inline>{"\\(t = n\\)"}</MathJax> is a normally distributed random variable with mean 0 and variance <MathJax inline>{"\\( n \\)"}</MathJax>. More generally, let's say we've reached period <MathJax inline>{"\\(t = k\\)"}</MathJax> and we want to consider the distribution of possible locations at 
	    		period <MathJax inline>{"\\(t = n\\)"}</MathJax>. We know the particle is at location <MathJax inline>{"\\(W_k\\)"}</MathJax>. In <MathJax inline>{"\\(n - k\\)"}</MathJax> more periods, the particle will be at <MathJax inline>{"\\(W_n = W_k + \\tilde x_{k+1} + \\tilde x_{k+2} + ... + \\tilde x_{n}\\)"}</MathJax>. Thus, <MathJax inline>{"\\( W_n - W_k\\)"}</MathJax> is 
	    		a normally distributed random variable with mean 0 and variance <MathJax inline>{"\\( n - k\\)"}</MathJax>. 
	    	</p>
	    	<p>
	    	Now, let's think about continuous time. Instead of restricting draws to a standard normal distribution at equal time lengths, we'll allow for draws at arbitrarily small time increments from a normal distribution with 
	    	arbitrarily small variance. We'll simply impose that the variance of the normal distribution for our next draw be equal to the time elapsed since the last draw. In this way, we can characterize a Wiener process, <MathJax inline>{"\\( W_t\\)"}</MathJax>, as a path through time meeting the following criteria:
	    	<ol>
	    		<li><MathJax inline>{"\\(W_0 = 0\\)"}</MathJax>;</li>
	    		<li><MathJax inline>{"\\(W_t\\)"}</MathJax> is almost surely continuous;</li> 
	    		<li><MathJax inline>{"\\(W_t\\)"}</MathJax> has independent increments (i.e., if <MathJax inline>{"\\(0 \\leq a < b \\leq c < d\\)"}</MathJax>, then <MathJax inline>{"\\(W_b- W_a\\)"}</MathJax> and <MathJax inline>{"\\(W_d- W_c\\)"}</MathJax> are 
	    		independent random variables); and</li>
	    		<li><MathJax inline>{"\\(W_b- W_a \\sim N(0, b-a)\\)"}</MathJax> for <MathJax inline>{"\\(0 \\leq a \\leq b\\)"}</MathJax>.</li>
	    	</ol>
	    	</p>
	    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
	    	<p className = 'graph-text'>2D Brownian Motion</p>
	    	<BrownianMotion2D />
	    	</div>
    	</div>
    	<div id = 'itos_lemma'>
    		<p className='heading2'>Ito's Lemma</p>
    		<p>
    		Although Brownian motion is continuous, it is nowhere differentiable. Thus, when we model a stochastic process using Brownian motion, we cannot rely on 
    		the normal differentiation rules. Instead, we use Ito's Lemma. 
    		</p>
    		<p>
    		Suppose we know that some random, time-varying quantity of interest, <MathJax inline>{"\\( X_t\\)"}</MathJax>, evolves through time according to the stochastic differential equation
    		<MathJax className='math-container'>
	          {`\\[
	            dX_t = \\mu\\left(X_t, t\\right)dt + \\sigma\\left(X_t, t\\right)d W_t
	          \\]`}
      		</MathJax>
      		In other words, <MathJax inline>{"\\( X_t\\)"}</MathJax> depends on some certain component, <MathJax inline>{"\\( \\mu\\left(X_t, t\\right)dt \\)"}</MathJax>, that changes deterministically through time (we'll call this drift) and some random 
      			component, <MathJax inline>{"\\( \\sigma\\left(X_t, t\\right)d W_t \\)"}</MathJax>, that varies according to Brownian motion (we'll call this volatility). 
      		</p>
      		<p>
      		Now, suppose we are interested in the random variable <MathJax inline>{"\\( f\\left(X_t, t\\right)\\)"}</MathJax>, which is some function of <MathJax inline>{"\\( X_t\\)"}</MathJax> and time. Ito's lemma gives us that
    		<MathJax className='math-container'>
	          {`\\[
	            df\\left(X_t, t\\right) = \\left(\\frac{\\partial f}{\\partial t} + \\mu \\frac{\\partial f}{\\partial X} + \\frac{\\sigma^2}{2}\\frac{\\partial^2 f}{\\partial X^2}\\right) + \\sigma \\frac{\\partial f}{\\partial X}d W_t
	          \\]`}
      		</MathJax>
      		</p>
    	</div>
    	<div id = 'gbm'>
	    	<p className='heading2'>Geometric Brownian Motion</p>
	    	<p>
	    	To see how Ito's lemma works, let's go through the process of solving for Geometric Brownian Motion (GBM). GBM evolves according to the stochastic differential equation
    		<MathJax className='math-container'>
	          {`\\[
	            dX_t = X_t \\bar \\mu dt + X_t \\bar \\sigma d W_t
	          \\]`}
      		</MathJax>
      		where <MathJax inline>{"\\( \\bar \\mu \\)"}</MathJax> and <MathJax inline>{"\\( \\bar \\sigma \\)"}</MathJax> are constants.
      		</p>
      		<p>
      		Suppose this differential equation wasn't stochastic, or we just had <MathJax inline>{"\\( d X_t = X_t (\\bar \\mu + \\bar \\sigma)dt \\)"}</MathJax>. In this familiar case, 
      		we could separate <MathJax inline>{"\\( X_t \\)"}</MathJax> and <MathJax inline>{"\\( t \\)"}</MathJax> to get
       		<MathJax className='math-container'>
	          {`\\[
	          	\\begin{aligned}
	            	&\\frac{d X_t}{X_t} = (\\bar \\mu + \\bar \\sigma)dt \\\\
	            	\\Leftrightarrow &\\int^t_0 d \\left(\\log{(X_t)}\\right) = \\int^t_0(\\bar \\mu + \\bar \\sigma)dt \\\\
	            	\\Leftrightarrow &\\log{(X_t)} - \\log{(X_0)} = (\\bar \\mu + \\bar \\sigma)t \\\\
     				\\Leftrightarrow &X_t = X_0e^{(\\bar \\mu + \\bar \\sigma)t} 
	            \\end{aligned}
	          \\]`}
      		</MathJax>
      		Because of the stochastic component, we can't say that <MathJax inline>{"\\( \\frac{d X_t}{X_t} = d(\\log{(X_t)}) \\)"}</MathJax>. Instead, we have to use Ito's Lemma to find an expression for <MathJax inline>{"\\( d(\\log{(X_t)}) \\)"}</MathJax>. 
      		Let <MathJax inline>{"\\( f(X_t) = \\log{(X_t)} \\)"}</MathJax>, and note that, in terms of Ito's Lemma, 
    		<MathJax className='math-container'>
	          {`\\[
	             dX_t = \\overbrace{X_t \\bar \\mu}^{=\\mu(X_t,t)} dt + \\overbrace{X_t \\bar \\sigma}^{=\\sigma(X_t,t)} d W_t
	          \\]`}
      		</MathJax>     
      		then we have 
       		<MathJax className='math-container'>
	          {`\\[
	          	\\begin{aligned}
	            	d f(X_t) &= \\left(X_t \\bar \\mu \\frac{\\partial f}{\\partial X} + \\frac{{X_t^2 \\bar \\sigma}^2}{2}\\frac{\\partial^2 f}{\\partial X^2}\\right)dt + X_t \\bar \\sigma \\frac{\\partial f}{\\partial X}dW_t \\\\
    				&= \\left(\\bar \\mu - \\frac{\\bar \\sigma^2}{2}\\right)dt + \\bar \\sigma dW_t 
	            \\end{aligned}
	          \\]`}
      		</MathJax>  
      		Now, we can integrate both sides to get 
       		<MathJax className='math-container'>
	          {`\\[
	          	\\begin{aligned}
	            	&f(X_t) - f(X_0) = \\left(\\bar \\mu - \\frac{\\bar \\sigma^2}{2}\\right)t + \\bar \\sigma W_t \\\\
    				\\Leftrightarrow &\\log{\\left(X_t/X_0\\right)} = \\left(\\bar \\mu - \\frac{\\bar \\sigma^2}{2}\\right)t + \\bar \\sigma W_t \\\\
    				\\Leftrightarrow &X_t = X_0 e^{\\left(\\bar \\mu - \\frac{\\bar \\sigma^2}{2}\\right)t + \\bar \\sigma W_t}
	            \\end{aligned}
	          \\]`}
      		</MathJax> 		
      		</p>
			<div className='graph-container'>
			  <GBMChart mu={mu} sigma={sigma} S0={S0} />
			  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
			    
			    <div className="input-bars">
			      <label>
			        <MathJax inline>{"\\( \\bar \\mu \\)"}</MathJax> (Drift)
			      </label>
			      <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
			        <button onClick={() => setMu((prev) => Math.max(-0.5, prev - 0.1))}>◀</button>
			        <span style={{ margin: "0 10px" }}>{mu.toFixed(2)}</span>
			        <button onClick={() => setMu((prev) => Math.min(0.5, prev + 0.1))}>▶</button>
			      </div>
			    </div>

			    <div className="input-bars">
			      <label>
			        <MathJax inline>{"\\( \\bar \\sigma \\)"}</MathJax> (Volatility)
			      </label>
			      <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
			        <button onClick={() => setSigma((prev) => Math.max(0, prev - 0.1))}>◀</button>
			        <span style={{ margin: "0 10px" }}>{sigma.toFixed(2)}</span>
			        <button onClick={() => setSigma((prev) => Math.min(1, prev + 0.1))}>▶</button>
			      </div>
			    </div>

			    <div className="input-bars">
			      <label>
			        <MathJax inline>{"\\( X_0 \\)"}</MathJax> (Initial Value)
			      </label>
			      <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
			        <button onClick={() => setS0((prev) => Math.max(50, prev - 5))}>◀</button>
			        <span style={{ margin: "0 10px" }}>{S0.toFixed(0)}</span>
			        <button onClick={() => setS0((prev) => Math.min(200, prev + 5))}>▶</button>
			      </div>
			    </div>
			  </div>
			</div>
    	</div>
    	<p>We'll use GBM to model the price of the underlying stock in the derivation of the Black-Scholes equation. 
    	Take some time to see how varying the drift parameter, the volatility parameter, and the initial value affects the path of GBM in the above graph.</p>
    	</MathJaxContext>
    	<PageNavigator group="BS" />
    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
        </div>
  );
}

export default BS2;