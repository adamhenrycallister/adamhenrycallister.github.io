import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function BS4() {
  return (
    	<div className='BlackScholes'>
    	<PageNavigator />
    		<p className='heading1'>Black-Scholes Transformation</p>
    		<MathJaxContext>
    		<div id='Overview'>
	    		<p className='heading2'>Overview</p>
	    		<p>
	    		So far, we've derived the Black-Scholes equation as
	    		<MathJax>
			        {`\\[
	    				\\frac{\\partial V}{\\partial t} + \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2} + rS_t \\frac{\\partial V}{\\partial S} - rV = 0 
	    				\\quad \\quad \\quad  \\text{(1)}
			        \\]`}
			    </MathJax>
			    but we still don't have a closed-form solution for the derivative price, <MathJax inline>{"\\( V(S_t, t) \\)"}</MathJax>. To proceed further, we need to turn equation 1 into a PDE that we know how to solve. 
			    Thus, our next goal is to make equation 1 look like the heat equation, which has a known solution. Recall that for some positive constant <MathJax inline>{"\\( \\alpha \\)"}</MathJax>, 
			    the one-dimensional heat equation is given by
		        <MathJax>
			        {`\\[
			          \\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2} \\quad \\quad \\quad \\text{(2)}
			        \\]`}
			    </MathJax>
			    </p>
			    <p>
			    The plan of attack is to come up with a change of variables for <MathJax inline>{"\\( S_t \\)"}</MathJax>, <MathJax inline>{"\\( t \\)"}</MathJax>, and <MathJax inline>{"\\( V(S_t, t) \\)"}</MathJax> that 
			    will
			    <ol>
			    	<li>Get rid of the extra <MathJax inline>{"\\( S_t \\)"}</MathJax>'s on the <MathJax inline>{"\\( rS_t \\frac{\\partial V}{\\partial S} \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2} \\)"}</MathJax> terms;</li>
			    	<li>Put a negative sign on the <MathJax inline>{"\\( \\frac{\\partial V}{\\partial t} \\)"}</MathJax> term; and</li>
			    	<li>Get rid of the extra terms.</li>
			    </ol>
			    </p>
			</div>
			<div id='cov_stock'>
			  <p className='heading2'>Change of Variables - Stock Price</p>
		      <p>
		      First, let's get rid of the extra <MathJax inline>{"\\( S_t \\)"}</MathJax>'s on the <MathJax inline>{"\\( rS_t \\frac{\\partial V}{\\partial S} \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2} \\)"}</MathJax> terms in equation 1. We'll 
		      do this by defining a new variable <MathJax inline>{"\\( x(S) \\)"}</MathJax> that is some function of <MathJax inline>{"\\( S \\)"}</MathJax>. We want to find an <MathJax inline>{"\\( x \\)"}</MathJax> such that 
		     <MathJax>
		        {`\\[
		          \\begin{aligned}
		          S_t\\frac{\\partial V}{\\partial S} &= \\frac{\\partial V}{\\partial x(S)} \\\\
		    		\\Leftrightarrow x(S) &= \\log{S}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		      </p>
		      <p>
		      This takes care of the <MathJax inline>{"\\( S_t \\)"}</MathJax> on the <MathJax inline>{"\\( rS_t \\frac{\\partial V}{\\partial S} \\)"}</MathJax> term. We also need <MathJax inline>{"\\( x \\)"}</MathJax> to get rid of the <MathJax inline>{"\\( S_t^2 \\)"}</MathJax> on 
		      the <MathJax inline>{"\\( \\frac{S_t^2\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial S^2} \\)"}</MathJax> term. Let's take another derivative and see what we get
		     <MathJax>
		        {`\\[
		          \\begin{aligned}
		          	S_t^2\\frac{\\partial^2 V}{\\partial S^2} &= S_t^2\\frac{\\partial}{\\partial S}\\left(\\frac{1}{S_t}\\frac{\\partial V}{\\partial x}\\right) \\\\
		    		&= S_t^2\\left(\\frac{-1}{S_t^2}\\frac{\\partial V}{\\partial x} + \\frac{1}{S_t^2}\\frac{\\partial^2 V}{\\partial x^2}\\right) \\\\
		    		&= \\frac{\\partial^2 V}{\\partial x^2} - \\frac{\\partial V}{\\partial x}
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		    The <MathJax inline>{"\\( S_t^2 \\)"}</MathJax>  term is gone! Now, we can rewrite equation 1 as
		     <MathJax>
		        {`\\[
		          \\begin{aligned}
		          	\\frac{\\partial V}{\\partial t} + \\frac{\\sigma^2}{2}\\left(\\frac{\\partial^2 V}{\\partial x^2} - \\frac{\\partial V}{\\partial x}\\right) + r \\frac{\\partial V}{\\partial x} - rV &= 0 \\\\
		    		\\frac{\\partial V}{\\partial t} + \\frac{\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial x^2}
		    		+ \\frac{\\partial V}{\\partial x}\\left(r - \\frac{\\sigma^2}{2}\\right) - rV &= 0
		    	  \\end{aligned}
		        \\]`}
		    </MathJax>
		      </p>
			</div>
			<div id='cov_v'>
				<p className='heading2'>Change of Variables - Time and Derivative Price</p>
				<p>
		      	After substituting in <MathJax inline>{"\\( x\\)"}</MathJax> for <MathJax inline>{"\\( S_t\\)"}</MathJax>, our equation looks closer to equation 2, but 
		      	we still have some extra terms. We also have another problem. Even if we got rid of the <MathJax inline>{"\\( \\frac{\\partial V}{\\partial x}\\left(r - \\frac{\\sigma^2}{2}\\right) \\)"}</MathJax> and <MathJax inline>{"\\( rV \\)"}</MathJax> terms, 
		      	we'd have <MathJax inline>{"\\( \\frac{\\partial V}{\\partial t} = -\\frac{\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial x^2} \\)"}</MathJax>, which would 
		      	imply <MathJax inline>{"\\( \\alpha = -\\frac{\\sigma^2}{2} < 0 \\)"}</MathJax>. Because the heat equation has a positive <MathJax inline>{"\\( \\alpha \\)"}</MathJax>, 
		      	this means that we also need to put a negative sign on either <MathJax inline>{"\\( \\frac{\\partial V}{\\partial t} \\)"}</MathJax>
		      	 or <MathJax inline>{"\\( \\frac{\\partial^2 V}{\\partial x^2} \\)"}</MathJax>. 
		      	To fix the negative <MathJax inline>{"\\( \\alpha \\)"}</MathJax> problem, let's reverse our time variable by substituting in <MathJax inline>{"\\( t=T-\\tau \\)"}</MathJax>. 
		      	This gives us 
		         <MathJax>
			        {`\\[
			          -\\frac{\\partial V}{\\partial \\tau} + \\frac{\\sigma^2}{2}\\frac{\\partial^2 V}{\\partial x^2}
		    			+ \\frac{\\partial V}{\\partial x}\\left(r - \\frac{\\sigma^2}{2}\\right) - rV = 0 
			        \\]`}
			    </MathJax>
		      	</p>
			      <p>
			      	Now, to get rid of the extra terms, let's rewrite <MathJax inline>{"\\( V \\)"}</MathJax> as 
			         <MathJax>
				        {`\\[
				          V(S_t, t) = f(x, \\tau)u(x, \\tau)
				        \\]`}
				    </MathJax>
				    What we want to do here is find some functional form for <MathJax inline>{"\\( f(x, \\tau) \\)"}</MathJax> that will get rid of the extra terms in our equation. 
				    We'll leave the other function, <MathJax inline>{"\\( u(x, \\tau) \\)"}</MathJax>, in general terms. With this new way of writing <MathJax inline>{"\\( V \\)"}</MathJax>, we have
			     <MathJax>
			        {`\\[
			          \\begin{aligned}
			          	\\frac{\\partial V}{\\partial \\tau} &=  f\\frac{\\partial u}{\\partial \\tau} + u\\frac{\\partial f}{\\partial \\tau} \\\\ 
			    		\\frac{\\partial V}{\\partial x} &= f\\frac{\\partial u}{\\partial x} + u\\frac{\\partial f}{\\partial x} \\\\
			    		\\frac{\\partial^2 V}{\\partial x^2} &= f\\frac{\\partial^2 u}{\\partial x^2} + 2\\frac{\\partial u}{\\partial x}\\frac{\\partial f}{\\partial x} + u\\frac{\\partial^2 f}{\\partial x^2}
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    Plugging everything in gives us
			     <MathJax>
			        {`\\[
			          -\\left(f\\frac{\\partial u}{\\partial \\tau} + u\\frac{\\partial f}{\\partial \\tau}\\right) + \\frac{\\sigma^2}{2}\\left(f\\frac{\\partial^2 u}{\\partial x^2} 
			          + 2\\frac{\\partial u}{\\partial x}\\frac{\\partial f}{\\partial x} + u\\frac{\\partial^2 f}{\\partial x^2}\\right)
			    		+ \\left(f\\frac{\\partial u}{\\partial x} + u\\frac{\\partial f}{\\partial x}\\right)\\left(r - \\frac{\\sigma^2}{2}\\right) - rV = 0
			        \\]`}
			    </MathJax>
			    This looks worse than what we had before, but remember our goal is to find an <MathJax inline>{"\\( f \\)"}</MathJax> that 
			    will make a lot of things cancel. Let's group things together and see if we can find some 
			    attributes that we want <MathJax inline>{"\\( f \\)"}</MathJax> to have. First, we'll group together the terms that we want to 
			    stay in our final equation: <MathJax inline>{"\\( -\\frac{\\partial u}{\\partial \\tau} \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{\\sigma^2}{2}\\frac{\\partial^2 u}{\\partial x^2} \\)"}</MathJax>. Note
			    that both of these terms currently has an extra <MathJax inline>{"\\( f \\)"}</MathJax>. Let's get rid of that by dividing everything by <MathJax inline>{"\\( f \\)"}</MathJax>. 
			    Next, let's make groups based on the two remaining <MathJax inline>{"\\( u \\)"}</MathJax>  functions: <MathJax inline>{"\\( \\frac{\\partial u}{\\partial x} \\)"}</MathJax> and <MathJax inline>{"\\( u \\)"}</MathJax> . 
			    The idea here is that, since we're keeping <MathJax inline>{"\\( u \\)"}</MathJax> general, we can't say anything about how a term with <MathJax inline>{"\\( u \\)"}</MathJax> and 
			    a term with <MathJax inline>{"\\( \\frac{\\partial u}{\\partial x} \\)"}</MathJax> might interact. But, given that two terms both have <MathJax inline>{"\\( u \\)"}</MathJax>  or both 
			    have <MathJax inline>{"\\( \\frac{\\partial u}{\\partial x} \\)"}</MathJax>, we can find some functional form for <MathJax inline>{"\\( f \\)"}</MathJax>  that will make the terms cancel. 
			    Applying this grouping gives us
			     <MathJax>
			        {`\\[
			        	\\begin{aligned}
			          \\left(\\frac{-\\partial u}{\\partial \\tau} + \\frac{\\sigma^2}{2}\\frac{\\partial^2 u}{\\partial x^2}\\right)
			    		+ \\frac{\\partial u}{\\partial x}\\left(\\underbrace{\\frac{\\sigma^2}{f}\\frac{\\partial f}{\\partial x} + r - \\frac{\\sigma^2}{2}}_{(i)}\\right) 
			    		+ u\\left(\\underbrace{\\frac{\\sigma^2}{2f}\\frac{\\partial^2 f}{\\partial x^2} 
			    		+ \\left(r - \\frac{\\sigma^2}{2}\\right)\\frac{1}{f}\\frac{\\partial f}{\\partial x} - \\frac{\\partial f}{\\partial \\tau}\\frac{1}{f} - r}_{(ii)}\\right) = 0 \\quad \\text{(3)}
			       	\\end{aligned}
			        \\]`}
			    </MathJax>
			    We want to find some functional form for <MathJax inline>{"\\( f \\)"}</MathJax> that will make <MathJax inline>{"\\( (i) \\)"}</MathJax> and <MathJax inline>{"\\( (ii) \\)"}</MathJax> equal to zero. 
			    Let's focus on <MathJax inline>{"\\( (i) \\)"}</MathJax> first.
			     <MathJax>
			        {`\\[
			          \\begin{aligned}
			          	&\\frac{\\sigma^2}{f}\\frac{\\partial f}{\\partial x} + r - \\frac{\\sigma^2}{2} = 0\\\\
			    		\\Leftrightarrow &\\frac{\\partial f/\\partial x}{f} = \\frac{1}{2} - \\frac{r}{\\sigma^2} \\\\
			    		\\Leftrightarrow & f(x, \\tau) = e^{\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)x + C_x}
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
				Here, <MathJax inline>{"\\( C_x \\)"}</MathJax> denotes some term that is constant with respect to <MathJax inline>{"\\( x \\)"}</MathJax>. In other 
				words <MathJax inline>{"\\( C_x \\)"}</MathJax> may be some function of <MathJax inline>{"\\( \\tau \\)"}</MathJax> but can't include <MathJax inline>{"\\( x \\)"}</MathJax>. This tells 
				us what the part of <MathJax inline>{"\\( f \\)"}</MathJax> as a function of <MathJax inline>{"\\( x \\)"}</MathJax> should look like, but we still don't 
				know what the <MathJax inline>{"\\( \\tau \\)"}</MathJax> part of <MathJax inline>{"\\( f \\)"}</MathJax> should look like. Given what we have so far 
				for <MathJax inline>{"\\( f \\)"}</MathJax>, our <MathJax inline>{"\\( x \\)"}</MathJax> derivatives should look like
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			          	\\frac{\\partial f}{\\partial x} = f\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right) \\\\
			    		\\frac{\\partial^2 f}{\\partial x^2} = f\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    Let's use these expressions in <MathJax inline>{"\\( (ii) \\)"}</MathJax> and set everything equal to zero. 
			    <MathJax>
			        {`\\[
			          \\begin{aligned}
			          	&\\frac{\\sigma^2}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 
			          	+ \\left(r - \\frac{\\sigma^2}{2}\\right)\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right) - \\frac{\\partial f}{\\partial \\tau}\\frac{1}{f} - r = 0 \\\\
			    		\\Leftrightarrow &\\frac{\\partial f/\\partial \\tau}{f} = -\\frac{\\sigma^2}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 - r \\\\
			    		\\Leftrightarrow &f(x, \\tau) = e^{-\\left(\\frac{\\sigma^2}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 + r\\right)\\tau + C_{\\tau}}
			    	  \\end{aligned}
			        \\]`}
			    </MathJax>
			    Here, as before, <MathJax inline>{"\\( C_{\\tau} \\)"}</MathJax> denotes a constant with respect to <MathJax inline>{"\\( \\tau \\)"}</MathJax>. Putting both expressions for <MathJax inline>{"\\( f \\)"}</MathJax> together 
			    (i.e., letting <MathJax inline>{"\\( C_x = -\\left(\\frac{\\sigma^2}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 + r\\right)\\tau \\)"}</MathJax> and <MathJax inline>{"\\( C_{\\tau} = \\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)x \\)"}</MathJax>), 
			    we get 
			     <MathJax>
			        {`\\[
			          f(x, \\tau) = e^{\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)x -\\left(\\frac{\\sigma^2}{2}\\left(\\frac{1}{2} - \\frac{r}{\\sigma^2}\\right)^2 + r\\right)\\tau}
			        \\]`}
			    </MathJax>
			    By construction, plugging in this expression for <MathJax inline>{"\\( f \\)"}</MathJax> into our equation 3 will leave us with only the first grouping, or 
			     <MathJax>
			        {`\\[
			          \\frac{\\partial u}{\\partial \\tau} = \\frac{\\sigma^2}{2}\\frac{\\partial^2 u}{\\partial x^2}
			        \\]`}
			    </MathJax>
			    Now, if we let <MathJax inline>{"\\( \\alpha = \\frac{\\sigma^2}{2} \\)"}</MathJax>, we have the heat equation!
			    </p>
			</div>
			</MathJaxContext>
	    	<PageNavigator />
	    	<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/black_scholes">Contents</NavLink></div>
    	</div>
  );
}

export default BS4;