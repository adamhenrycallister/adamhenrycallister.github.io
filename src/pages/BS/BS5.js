import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function BS5() {
  return (
    	<div className='BlackScholes'>
    	<PageNavigator group="BS"/>
    		<p className='heading1'>Pricing a European Call Option</p>
    		<MathJaxContext>
    		<div id='overview'>
    		<p className='heading2'>Overview</p>
    		<p>
    		In the last section, we took the Black-Scholes equation and transformed it into the one-dimensional heat equation
	        <MathJax className='math-container'>
		        {`\\[
		          \\frac{\\partial u}{\\partial \\tau} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}
		        \\]`}
		    </MathJax>
		    where 
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
			          \\alpha &= \\frac{\\sigma^2}{2}  \\\\
			          x &= \\log{(S_t)} \\\\
			          \\tau &= T- t \\\\
			          u(x, \\tau) &= \\frac{V(S_t, t)}{f(x, \\tau)} \\\\
			          f(x, \\tau) &= e^{\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)x -\\left(\\frac{\\sigma^2}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 + r\\right)\\tau}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    This is helpful because now we can use the following solution to the heat equation to solve for <MathJax inline>{"\\( u(x,\\tau) \\)"}</MathJax>:
		    <MathJax className='math-container'>
		        {`\\[
		          	u(x, \\tau) = \\frac{1}{\\sqrt{4\\pi \\alpha \\tau}}\\int^{\\infty}_{-\\infty} u(z, 0)e^{-\\frac{(z-x)^2}{4 \\alpha \\tau}}dz \\quad \\quad \\text{(1)}
		        \\]`}
		    </MathJax>
		    For now, we'll skip the specifics on how we came up with this solution to the heat equation, but you can go over the derivation in the lesson about <NavLink className='inline-link' to="/fourier/heat_equation">Fourier transforms</NavLink>.
		     Note that this solution depends on an initial condition, <MathJax inline>{"\\( u(z,0) \\)"}</MathJax>. In our setting, different initial conditions correspond to different types of derivative securities. Thus, before 
    		we continue, we need to pick a type of derivative to price. One of the simplest choices is the European call option, 
    		which gives the holder the right (but not the obligation) to purchase a specified number of shares of the underlying 
    		stock at date <MathJax inline>{"\\( T \\)"}</MathJax> (the "expiration date") for the price of <MathJax inline>{"\\( K \\)"}</MathJax> per share (the "strike price"). We'll assume the call option is for a single share of the underlying 
    		stock. Then, on the expiration date (<MathJax inline>{"\\( t=T \\)"}</MathJax>), the option is worth <MathJax inline>{"\\( \\text{max}\\{0, S - K\\} \\)"}</MathJax>.
    		</p>
    		<p>
    		To solve for the price of a European call option, we'll first find an initial condition in terms of our transformed variables. Then, we'll plug this initial condition into equation 1 
    		and solve for <MathJax inline>{"\\( u \\)"}</MathJax>. Finally, we'll transform <MathJax inline>{"\\( u \\)"}</MathJax> back into <MathJax inline>{"\\( V \\)"}</MathJax>.
    		</p>
    		</div>
    		<div id='inital_condition'>
    		<p className='heading2'>Initial Condition</p>
    		<p>
    		Because the value of a call option at time <MathJax inline>{"\\( t=T \\)"}</MathJax> is <MathJax inline>{"\\( \\text{max}\\{0, S - K\\} \\)"}</MathJax>, we have the following initial condition:
    		 <MathJax className='math-container'>
		        {`\\[
		          V(S, T) = \\text{max}\\{0, S - K\\}
		        \\]`}
		    </MathJax>
		    Given that <MathJax inline>{"\\( V(S,T) = f(x, 0)u(x,0) \\)"}</MathJax> and <MathJax inline>{"\\( S = e^x \\)"}</MathJax>,
		    we can rewrite this initial condition in terms of our new variables
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		          	&f(x, 0)u(x,0) = \\text{max}\\{0, e^x - K\\} \\\\
		    		\\Leftrightarrow & u(x,0) = e^{-\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)x}\\text{max}\\{0, e^x - K\\}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    </p>
		    </div>
		    <div id ='transformed_solution'>
		    <p className='heading2'>Transformed Solution</p>
		    <p>
		    If we plug in <MathJax inline>{"\\( \\alpha = \\frac{\\sigma^2}{2} \\)"}</MathJax> and our initial condition <MathJax inline>{"\\( u(z,0) = e^{-\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)z}\\text{max}\\{0, e^z - K\\} \\)"}</MathJax> to equation 1, we get
		    <MathJax className='math-container'>
		        {`\\[
		          	u(x, \\tau) = \\frac{1}{\\sqrt{2\\pi \\sigma^2 \\tau}}\\int^{\\infty}_{-\\infty} e^{-\\left(\\frac{1}{2} 
		          	- \\frac{r}{\\sigma^2}\\right)z}\\text{max}\\{0, e^z - K\\}e^{-\\frac{(z-x)^2}{2 \\sigma^2 \\tau}}dz
		        \\]`}
		    </MathJax>
		    We can get rid of the max function by changing our integration bounds. 
		    Note that <MathJax inline>{"\\( e^z - K\\)"}</MathJax> is greater than 0 as long as <MathJax inline>{"\\( z > \\log{K} \\)"}</MathJax>. 
		    Then our problem becomes
		    <MathJax className='math-container'>
		        {`\\[
		          	u(x, \\tau) = \\frac{1}{\\sqrt{2\\pi \\sigma^2 \\tau}}\\left(\\int^{\\infty}_{\\log{K}} 
		          	\\overbrace{e^{\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)z -\\frac{(z-x)^2}{2 \\sigma^2 \\tau}}}^{(a)}dz - K \\int^{\\infty}_{\\log{K}} 
		          	\\overbrace{e^{-\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)z -\\frac{(z-x)^2}{2 \\sigma^2 \\tau}}}^{(b)}dz\\right)
		        \\]`}
		    </MathJax>
		    </p>
		    <p>
		    Recall that the cumulative distribution function (cdf) of the standard normal distribution is given by 
		    <MathJax className='math-container'>
		        {`\\[
		          	\\Phi(w) = \\int^w_{-\\infty} \\frac{e^{-\\frac{z^2}{2}}}{\\sqrt{2\\pi}}dz
		        \\]`}
		    </MathJax>
		    To simplify things further, let's try to write the two integrals in our equation above in terms of the 
		    standard normal cdf. For <MathJax inline>{"\\( (a) \\)"}</MathJax> and <MathJax inline>{"\\( (b) \\)"}</MathJax> we'll (1) complete the square with <MathJax inline>{"\\( z \\)"}</MathJax>  and (2) find a 
		    change of variables to make the new expression look like <MathJax inline>{"\\( e^{-\\frac{z^2}{2}} \\)"}</MathJax>. Let's start 
		    with <MathJax inline>{"\\( (a) \\)"}</MathJax>. We can rewrite the exponent in <MathJax inline>{"\\( (a) \\)"}</MathJax> as
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		    			&\\frac{-1}{2\\sigma^2 \\tau}\\left[z^2 - 2z\\left(x + \\sigma^2 \\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)\\right)\\right] - \\frac{x^2}{2\\sigma^2 \\tau} \\\\
		    			&= \\frac{-1}{2\\sigma^2 \\tau}\\left[z^2 - 2z\\left(x + \\sigma^2 \\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)\\right) + \\left(x + \\sigma^2 \\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)\\right)^2\\right] 
		    			- \\frac{x^2}{2\\sigma^2 \\tau} + \\frac{\\left(x + \\sigma^2 \\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)\\right)^2}{2\\sigma^2 \\tau} \\\\
		    			&= -\\frac{\\left(z - \\left(x + \\sigma^2 \\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)\\right)\\right)^2}{2\\sigma^2\\tau} + \\frac{2x\\sigma^2\\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right) + \\sigma^4\\tau^2\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2}{2\\sigma^2\\tau} \\\\
		    			&= \\underbrace{-\\frac{\\left(z - \\left(x + \\sigma^2 \\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)\\right)\\right)^2}{2\\sigma^2\\tau}}_{(a_1)} + \\underbrace{x\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2}_{(a_2)}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    Now, we have an expression with <MathJax inline>{"\\( z \\)"}</MathJax> in it, <MathJax inline>{"\\( (a_1) \\)"}</MathJax>, and an expression without <MathJax inline>{"\\( z \\)"}</MathJax>, <MathJax inline>{"\\( (a_2) \\)"}</MathJax>. 
		    Since <MathJax inline>{"\\( (a_2) \\)"}</MathJax> doesn't have <MathJax inline>{"\\( z \\)"}</MathJax> in it, we can take it out of the integral. Let's do a change of 
		    variables with <MathJax inline>{"\\( (a_1) \\)"}</MathJax> to make this into a standard normal cdf. We're looking for a new integration 
		    variable, <MathJax inline>{"\\( a \\)"}</MathJax>, that satisfies 
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		          	&\\frac{-a^2}{2} = \\frac{-\\left(z - \\left(x + \\sigma^2 \\tau\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)\\right)\\right)^2}{2\\sigma^2\\tau} \\\\
		    		\\Leftrightarrow & z = a \\sigma\\sqrt{\\tau} + x + \\left(\\frac{\\sigma^2}{2} + r\\right)\\tau \\\\
		    		\\Leftrightarrow & a = \\frac{z - x - \\left(\\frac{\\sigma^2}{2} +r\\right)\\tau}{\\sigma \\sqrt{\\tau}}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    We'll also need to substitute in <MathJax inline>{"\\( dz = \\sigma\\sqrt{\\tau}da \\)"}</MathJax> and change the lower integration bound 
		    to <MathJax inline>{"\\( \\frac{\\log{K} - x - \\left(\\frac{\\sigma^2}{2} +r\\right)\\tau}{\\sigma \\sqrt{\\tau}} \\)"}</MathJax>. Putting all this together, 
		    the first integral becomes
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		              &e^{x\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2} 
		              \\int^{\\infty}_{\\frac{\\log{K} - x - \\left(\\frac{\\sigma^2}{2} +r\\right)\\tau}{\\sigma \\sqrt{\\tau}}} \\frac{e^{\\frac{-a^2}{2}}}{\\sqrt{2\\pi}}da \\\\
		    		  &= e^{x\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2} 
		    		  \\left(1 - \\Phi\\left(\\frac{\\log{K} - x - \\left(\\frac{\\sigma^2}{2} +r\\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right)\\right)
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    Because the standard normal cdf is symmetric about the origin, <MathJax inline>{"\\( 1 - \\Phi(w) = \\Phi(-w) \\)"}</MathJax>. 
		    This means we can simplify this expression further to
		    <MathJax className='math-container'>
		        {`\\[
		          	e^{x\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2}  
		          	\\Phi\\left(\\frac{x - \\log{K} + \\left(r + \\frac{\\sigma^2}{2} \\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right)
		        \\]`}
		    </MathJax>
		    </p>
		    <p>
		    Now, let's do the same process for <MathJax inline>{"\\( (b) \\)"}</MathJax>. We can rewrite the exponent in <MathJax inline>{"\\( (b) \\)"}</MathJax> as
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		                &\\frac{-1}{2\\sigma^2 \\tau}\\left[z^2 - 2z\\left(x - \\sigma^2 \\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)\\right)\\right] - \\frac{x^2}{2\\sigma^2 \\tau} \\\\
		    			&= \\frac{-1}{2\\sigma^2 \\tau}\\left[z^2 - 2z\\left(x - \\sigma^2 \\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)\\right) + \\left(x - \\sigma^2 \\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)\\right)^2\\right] - \\frac{x^2}{2\\sigma^2 \\tau} + \\frac{\\left(x - \\sigma^2 \\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)\\right)^2}{2\\sigma^2 \\tau} \\\\
		    			&= -\\frac{\\left(z - \\left(x - \\sigma^2 \\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)\\right)\\right)^2}{2\\sigma^2\\tau} + \\frac{\\sigma^4\\tau^2\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 -2x\\sigma^2\\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)}{2\\sigma^2\\tau} \\\\
		    			&= \\underbrace{-\\frac{\\left(z - \\left(x - \\sigma^2 \\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)\\right)\\right)^2}{2\\sigma^2\\tau}}_{(b_1)} + \\underbrace{ \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 - x\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)}_{(b_2)}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
			Here, we can take <MathJax inline>{"\\( (b_2) \\)"}</MathJax> out of the integral and find a new integration variable, <MathJax inline>{"\\( b \\)"}</MathJax>, 
			for <MathJax inline>{"\\( (b_1) \\)"}</MathJax> that satisfies
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		          	&\\frac{-b^2}{2} = \\frac{-\\left(z - \\left(x - \\sigma^2 \\tau\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)\\right)\\right)^2}{2\\sigma^2\\tau} \\\\
		    		\\Leftrightarrow & z = b \\sigma\\sqrt{\\tau} + x + \\left(r- \\frac{\\sigma^2}{2}\\right)\\tau \\\\
		    		\\Leftrightarrow & b = \\frac{z - x - \\left(r- \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
			We'll also need to substitute in <MathJax inline>{"\\( dz = \\sigma\\sqrt{\\tau}db \\)"}</MathJax> and change the lower integration bound 
			to <MathJax inline>{"\\( \\frac{\\log{K} - x - \\left(r - \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}} \\)"}</MathJax>. Putting all this 
			together, the second integral becomes
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		          	&-Ke^{- x\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2} 
		          	\\int^{\\infty}_{\\frac{\\log{K} - x - \\left(r - \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}} \\frac{e^{\\frac{-b^2}{2}}}{\\sqrt{2\\pi}}db \\\\
		    		&= -Ke^{- x\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2}  
		    		\\left(1 - \\Phi\\left(\\frac{\\log{K} - x - \\left(r - \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right)\\right) \\\\
		    		&= -Ke^{- x\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2}  
		    		\\Phi\\left(\\frac{x- \\log{K} + \\left(r - \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right)
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    </p>
		    <p>
		    Returning to our equation for <MathJax inline>{"\\( u \\)"}</MathJax>, we now have
		    <MathJax className='math-container'>
		        {`\\[
		          \\begin{aligned}
		              u(x, \\tau) = &e^{x\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2}  
		              	\\Phi\\left(\\frac{x - \\log{K} + \\left(r+ \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right)
		              	 \\\\ -K&e^{- x\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2}  
		              	 \\Phi\\left(\\frac{x- \\log{K} + \\left(r - \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right) \\quad \\text{(2)}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    </p>
    		</div>
    		<div id='pricing'>
    		<p className='heading2'>Pricing Equation</p>
    			<p>
    			Now that we have a solution for <MathJax inline>{"\\( u \\)"}</MathJax>, we just need to multiply both sides by <MathJax inline>{"\\( f(x,\\tau) = e^{\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)x -\\left(\\frac{\\sigma^2}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 + r\\right)\\tau} \\)"}</MathJax> to 
    			get <MathJax inline>{"\\( V \\)"}</MathJax>. First, note that 
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			             f(x,\\tau)e^{x\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2} &= e^{x - r\\tau + \\frac{\\sigma^2 \\tau}{2}\\left(\\left(\\frac{1}{2} + \\frac{r}{\\sigma^2}\\right)^2 - \\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2\\right)}
			    			= e^{x} \\\\
			    		f(x,\\tau)e^{- x\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right) + \\frac{\\sigma^2\\tau}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2} &= e^{-r\\tau}
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    Thus, if we multiply both sides of equation 2 by <MathJax inline>{"\\( f(x,\\tau) \\)"}</MathJax>, we get
			    <MathJax className='math-container'>
			        {`\\[
			          	V(S_t, t) = e^{x}  \\Phi\\left(\\frac{x - \\log{K} + \\left(r + \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right)
			          	 -Ke^{-r\\tau}  \\Phi\\left(\\frac{x- \\log{K} + \\left(r - \\frac{\\sigma^2}{2}\\right)\\tau}{\\sigma \\sqrt{\\tau}}\\right)
			        \\]`}
			    </MathJax>
			    Finally, we'll substitute back in <MathJax inline>{"\\( x = \\log{S_t} \\)"}</MathJax> and <MathJax inline>{"\\( \\tau = T- t \\)"}</MathJax> to get
			    <MathJax className='math-container'>
			        {`\\[
			          	V(S_t, t) = S_t  \\Phi\\left(\\frac{\\log{\\left(S_t/K\\right)} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t))}{\\sigma \\sqrt{T-t}}\\right)
			          	 -Ke^{-r(T-t)}  \\Phi\\left(\\frac{\\log{\\left(S_t/K\\right)} + \\left(r - \\frac{\\sigma^2}{2}\\right)(T-t)}{\\sigma \\sqrt{T-t}}\\right)
			        \\]`}
			    </MathJax>
				We're done! As a bonus, let's make things look a little nicer by relating the two expressions in the normal cdfs. 
				Notice that these expressions differ by only one negative sign. Let's see if we can write one in terms of the other
			    <MathJax className='math-container'>
			        {`\\[
			          \\begin{aligned}
			            &\\frac{\\log{\\left(S_t/K\\right)} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)}{\\sigma \\sqrt{T-t}} + q = \\frac{\\log{\\left(S_t/K\\right)} + \\left(r - \\frac{\\sigma^2}{2}\\right)(T-t)}{\\sigma \\sqrt{T-t}} \\\\
			    		\\Leftrightarrow & q = -\\sigma \\sqrt{T-t}
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    Then, if we assign 
			    <MathJax className='math-container'>
			        {`\\[
			          	p = \\frac{\\log{\\left(S_t/K\\right)} + \\left(r + \\frac{\\sigma^2}{2}\\right)(T-t)}{\\sigma \\sqrt{T-t}}
			        \\]`}
			    </MathJax>
			    our equation becomes
			    <MathJax className='math-container'>
			        {`\\[
			          	V(S_t, t) = S_t  \\Phi(p) -Ke^{-r(T-t)}  \\Phi\\left(p - \\sigma\\sqrt{T-t}\\right)
			        \\]`}
			    </MathJax>
			   	</p>
    		</div>
    		</MathJaxContext>
    	<PageNavigator group="BS"/>
    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
        </div>
  );
}

export default BS5;