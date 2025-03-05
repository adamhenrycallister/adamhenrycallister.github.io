import React from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './BlackScholes.css';
import PageNavigator from "../../components/PageNavigator";


function BS1() {
  return (
  	<div className='BlackScholes'>
    <PageNavigator group="BS" />
    <p className='heading1'>Preliminaries</p>
  	<MathJaxContext>
    <div id="change_of_variables">
      <p className='heading2'>Change of Variables</p>
      <p>
      Sometimes we have a derivative or an integral taken with respect to one variable (<MathJax inline>{"\\( x \\)"}</MathJax>) and we want to know what that derivative or integral would look like if it was instead taken with respect to 
      a function of the variable (<MathJax inline>{"\\( g(x) \\)"}</MathJax>). 
      </p>
      <p>
      In the case of a derivative, we use the chain rule to get
        <MathJax className='math-container'>
          {`\\[
            \\frac{\\partial f}{\\partial g(x)} = \\frac{\\partial f/\\partial x}{\\partial g(x)/\\partial x}
          \\]`}
        </MathJax>
      For example, if we want to consider <MathJax inline>{"\\( \\log{x} \\)"}</MathJax> rather than <MathJax inline>{"\\( x \\)"}</MathJax>, we can solve for <MathJax inline>{"\\( \\frac{\\partial f}{\\partial x} \\)"}</MathJax> in terms of <MathJax inline>{"\\( \\log{x} \\)"}</MathJax>:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &\\frac{\\partial f}{\\partial \\log{x}} = \\frac{\\partial f/\\partial x}{\\partial \\log{x}/\\partial x} = x\\frac{\\partial f}{\\partial x} \\\\
            \\Leftrightarrow & \\frac{\\partial f}{\\partial x} = \\frac{1}{x}\\frac{\\partial f}{\\partial \\log{x}} 
            \\end{aligned}
          \\]`}
        </MathJax>
      </p>
      <p>
      In the case of an integral, we can directly substitute in our new expression for <MathJax inline>{"\\( x \\)"}</MathJax>, but we need to be careful about the bounds and the differential. Consider the following integral:
      <MathJax className='math-container'>
        {`\\[
          \\int^b_a f(x) dx
        \\]`}
      </MathJax> 
      Suppose we want to rewrite <MathJax inline>{"\\( x \\)"}</MathJax> as some function of a new variable <MathJax inline>{"\\( y \\)"}</MathJax>, or <MathJax inline>{"\\( x = h(y) \\)"}</MathJax>. To do this, we can rewrite the integral as
      <MathJax className='math-container'>
        {`\\[
          \\int^{h^{-1}(b)}_{h^{-1}(a)} f(h(y)) dh(y)
        \\]`}
      </MathJax> 
      For example, if we wanted to consider the integral in terms of <MathJax inline>{"\\( x = \\log{y} \\)"}</MathJax>, we could write 
      <MathJax className='math-container'>
        {`\\[
          \\int^{e^b}_{e^a} \\frac{f(\\log{y})}{y} dy
        \\]`}
      </MathJax> 
      since <MathJax inline>{"\\( dh(y) = \\frac{dy}{y} \\)"}</MathJax> and <MathJax inline>{"\\( h^{-1}(z) = e^z \\)"}</MathJax> in this case.
      </p>
    </div>
    <div id='differential_equations'>
      <p className='heading2'>Differential Equations</p>
      <p>
      A differential equation is an equation with one or more derivatives in it. If all the derivatives are with respect to the same variable, then we call it an ordinary differential equation (ODE). 
      If the equation involves partial derivatives with respect to multiple different variables, we call it a partial differential equation (PDE). For example, <MathJax inline>{"\\( \\frac{d f}{d x} = Af(x) \\)"}</MathJax> is an ODE, 
      and <MathJax inline>{"\\( \\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2} \\)"}</MathJax> is a PDE.
      </p>
      <p>
      The strategy for finding a closed-form solution for the function of interest in a differential equation depends on how the equation is structured. For our purposes, we will worry only about differential equations of the form <MathJax inline>{"\\( \\frac{d f}{d x} = Af(x) \\)"}</MathJax>, 
      which we can solve as
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              &\\frac{d f/ dx}{f(x)} = A \\\\
              \\Leftrightarrow &\\frac{d}{dx}\\left(\\log{(f(x))}\\right) = A \\\\
              \\Leftrightarrow & d\\log{(f(x))} = A dx \\\\
              \\Leftrightarrow & \\int d\\log{(f(x))} = \\int A dx \\\\
              \\Leftrightarrow & \\log{(f(x))} = Ax + C_0 \\\\
              \\Leftrightarrow & f(x) = e^{Ax + C_0} \\\\
              \\Leftrightarrow & f(x) = C_1e^{Ax}
            \\end{aligned}
          \\]`}
        </MathJax>
      where <MathJax inline>{"\\( C_1 \\)"}</MathJax> is some integration constant. Just remember, as we go through the derivation, if we ever see the derivative of a function divided by the function itself, we might use this strategy to find a solution for the function.
      </p>
      <p>
        We'll say one more thing about differential equations before we go on. Many PDEs do not have nice, closed-form solutions. Even when they do, the process of arriving at such a solution can get pretty complicated. 
        The Black-Scholes equation itself is a complicated PDE. Rather than directly solve this complicated PDE, we will try to make the Black-Scholes equation look like a nicer PDE that we already know the solution for. To do this, we'll transform the Black-Scholes equation into 
        the heat equation. The heat equation models the diffusion of 
          heat through a medium by relating the temperature at a specific location in the medium as a function 
          of the location's distance from some fixed point, <MathJax inline>{"\\( x \\)"}</MathJax>, and time, <MathJax inline>{"\\( t \\)"}</MathJax>. For a temperature 
          function <MathJax inline>{"\\( u(x,t) \\)"}</MathJax> and a positive constant <MathJax inline>{"\\( \\alpha \\)"}</MathJax>, the one-dimensional heat equation can be written as
        <MathJax className='math-container'>
            {`\\[
              \\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}
            \\]`}
        </MathJax>
        People have spent a lot of time thinking about solutions to the heat equation. For our purposes, we will simply apply a well-known solution of the heat equation to our specific setting rather than derive the solution ourselves.
      </p>
    </div>
    <div id='normal_dist'>
      <p className='heading2'>Normal Distribution</p>
      <p>
      A normally distributed random variable <MathJax inline>{"\\( \\tilde x \\sim N(\\mu, \\sigma^2)\\)"}</MathJax> has a probability density function (pdf) given by 
      <MathJax className='math-container'>
          {`\\[
            f(x) = \\frac{e^{\\frac{-(x-\\mu)^2}{2\\sigma^2}}}{\\sqrt{2\\pi \\sigma^2}}
          \\]`}
      </MathJax>
      and a cumulative distribution function (cdf) given by 
      <MathJax className='math-container'>
          {`\\[
            F(x) = \\int_{-\\infty}^x\\frac{e^{\\frac{-(z-\\mu)^2}{2\\sigma^2}}}{\\sqrt{2\\pi \\sigma^2}}dz
          \\]`}
      </MathJax>
      The cdf gives the probability that <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> will take on a value that is less than or equal to the function's argument. Put differently, <MathJax inline>{"\\( F(c) = \\text{Pr}(\\tilde x < c) \\)"}</MathJax> for some constant <MathJax inline>{"\\( c \\)"}</MathJax> .
      </p>
      <p>
      A standard normal random variable has mean 0 and variance 1, which reduces the pdf and cdf to 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\phi(x) &= \\frac{e^{\\frac{-x^2}{2}}}{\\sqrt{2\\pi}} \\\\
              \\Phi(x) &= \\int_{-\\infty}^x\\frac{e^{\\frac{-z^2}{2}}}{\\sqrt{2\\pi}}dz
            \\end{aligned}
          \\]`}
        </MathJax>
      </p>
      <p>
        The sum of two independent, normally distributed random variables <MathJax inline>{"\\( \\tilde y \\sim N(\\mu_y, \\sigma^2_y) \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde z \\sim N(\\mu_z, \\sigma^2_z) \\)"}</MathJax> is 
        itself a normally distributed random variable with mean <MathJax inline>{"\\( \\mu_y + \\mu_z \\)"}</MathJax> and variance <MathJax inline>{"\\( \\sigma^2_y + \\sigma^2_z \\)"}</MathJax>.
      </p>
    </div>
    <div id="implicit_differentiation">
    <p className='heading2'>Implicit Differentiation</p>
      <p> 
      Sometimes we want to take a derivative of a function, but we don't actually know what the function looks like. 
      Suppose we have some function <MathJax inline>{"\\( f \\)"}</MathJax> that depends on <MathJax inline>{"\\( x \\)"}</MathJax>, <MathJax inline>{"\\( y \\)"}</MathJax>, and <MathJax inline>{"\\( t \\)"}</MathJax>.
      Let's also assume that <MathJax inline>{"\\( x \\)"}</MathJax> and <MathJax inline>{"\\( y \\)"}</MathJax> are themselves functions of <MathJax inline>{"\\( t \\)"}</MathJax>. Maybe <MathJax inline>{"\\( f \\)"}</MathJax> is the number of bananas I eat on a given day, which depends on how much peanut butter I have left (<MathJax inline>{"\\( x \\)"}</MathJax>), 
      how much cereal I have left (<MathJax inline>{"\\( y \\)"}</MathJax>), and how much time has passed since we last went grocery shopping (<MathJax inline>{"\\( t \\)"}</MathJax>). If I have more peanut butter, I'll generally eat more bananas because they go well together. But if I have more cereal, I might eat that instead of a banana. The amount of peanut butter and cereal I have depends on how long it's been since I last went grocery shopping. 
      My banana consumption also directly depends on how long it's been since I last went grocery shopping because I have to stop eating bananas once I run out. 
      </p>
      <p>
      Without imposing a functional form on anything, what can we say about how the amount of time since I last went grocery shopping affects my banana consumption? To take a partial derivative of <MathJax inline>{"\\( f \\)"}</MathJax> with respect to <MathJax inline>{"\\( t \\)"}</MathJax>, 
      we apply the following to each argument of <MathJax inline>{"\\( f \\)"}</MathJax>: (1) differentiate <MathJax inline>{"\\( f \\)"}</MathJax> with respect to the argument, 
      (2) differentiate the argument with respect to <MathJax inline>{"\\( t \\)"}</MathJax>, and (3) take the product of (1) and (2). After calculating (3) for each argument, we sum up all the products to get the partial derivative. 
      This looks like
          <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
                \\frac{\\partial f(x(t), y(t), t)}{\\partial t} &= \\frac{\\partial f}{\\partial x}\\frac{\\partial x}{\\partial t} + \\frac{\\partial f}{\\partial y}\\frac{\\partial y}{\\partial t} + \\frac{\\partial f}{\\partial t}\\frac{\\partial t}{\\partial t} \\\\
                &= \\frac{\\partial f}{\\partial x}\\frac{\\partial x}{\\partial t} + \\frac{\\partial f}{\\partial y}\\frac{\\partial y}{\\partial t} + \\frac{\\partial f}{\\partial t}
              \\end{aligned}
            \\]`}
          </MathJax>
      In our example, we might assume: 
      <ul>
        <li><MathJax inline>{"\\( \\frac{\\partial f}{\\partial x} > 0\\)"}</MathJax> since I eat more bananas when I have more peanut butter;</li>
        <li><MathJax inline>{"\\( \\frac{\\partial x}{\\partial t} < 0\\)"}</MathJax> since the amount of peanut butter I have decreases as more time passes since I last went grocery shopping;</li>
        <li><MathJax inline>{"\\( \\frac{\\partial f}{\\partial y} < 0\\)"}</MathJax> since I eat fewer bananas when I have more cereal;</li>
        <li><MathJax inline>{"\\( \\frac{\\partial y}{\\partial t} < 0\\)"}</MathJax> since the amount of cereal I have decreases as more time passes since I last went to the grocery store; and</li>
        <li><MathJax inline>{"\\( \\frac{\\partial f}{\\partial t} < 0\\)"}</MathJax> since the number of bananas I have left to eat decreases the longer it's been since I last went grocery shopping.</li>
      </ul> 
      Thus, increasing the amount of time it's been since I last went grocery shopping has a positive effect on my banana consumption by reducing the amount of cereal I have left and a negative effect on my banana consumption by reducing the amount of peanut butter I can eat with my bananas 
      and the store of bananas I have remaining. The overall effect depends on the magnitudes of the different partial derivatives. 
      </p>
    </div>
    </MathJaxContext>
    <PageNavigator group="BS"/>
    </div>
  );
}

export default BS1;