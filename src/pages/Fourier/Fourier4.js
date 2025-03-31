import React, { useState } from 'react';
import './Fourier.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../components/PageNavigator";
import ExampleBox from "../../components/ExampleBox";


function Fourier4() {
  return (
        <div className='Fourier'>
        <PageNavigator group="Fourier" />
        <p className='heading1'>Heat Equation</p>
        <MathJaxContext>
        <p>
        Recall in our <NavLink className='inline-link' to="/black_scholes/pricing">Black-Scholes</NavLink> derivation that we relied on a solution to the heat equation to come up with a closed-form solution for the price of a European call option. 
        The heat equation models the diffusion of 
          heat through a medium by relating the temperature at a specific location in the medium as a function 
          of the location's distance from some fixed point, <MathJax inline>{"\\( x \\)"}</MathJax>, and time, <MathJax inline>{"\\( t \\)"}</MathJax>. For a temperature 
          function <MathJax inline>{"\\( u(x,t) \\)"}</MathJax> and a positive constant <MathJax inline>{"\\( \\alpha \\)"}</MathJax>, the one-dimensional heat equation can be written as
        <MathJax className='math-container'>
            {`\\[
              \\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}
            \\]`}
        </MathJax>
        We can find a solution to this partial differential equation by applying a Fourier transform that will turn it into an ordinary differential equation. In other words, we'll come up with an equation in terms of <MathJax inline>{"\\( \\hat u(k,t) \\)"}</MathJax> instead of <MathJax inline>{"\\( u(x,t) \\)"}</MathJax>, where <MathJax inline>{"\\( \\hat u \\)"}</MathJax> is the Fourier transform of <MathJax inline>{"\\( u \\)"}</MathJax>. 
        This equation will have only a derivative with respect to <MathJax inline>{"\\( t \\)"}</MathJax>, not <MathJax inline>{"\\( x \\)"}</MathJax> . Thus, we can explicitly solve for <MathJax inline>{"\\( \\hat u \\)"}</MathJax> and do an inverse transform to recover <MathJax inline>{"\\( u \\)"}</MathJax>. 
        </p>
        <p>
        First, let's apply a Fourier transform to <MathJax inline>{"\\(  \\frac{\\partial u}{\\partial t} \\)"}</MathJax> and <MathJax inline>{"\\(   \\frac{\\partial^2 u}{\\partial x^2} \\)"}</MathJax>. Recall that the Fourier transform of a function <MathJax inline>{"\\( f(x) \\)"}</MathJax> is given 
        by <MathJax inline>{"\\( \\int^{\\infty}_{-\\infty}f(x)e^{-2\\pi i k x}dx\\)"}</MathJax>. For <MathJax inline>{"\\(  \\frac{\\partial u}{\\partial t} \\)"}</MathJax>, this gives us
        <MathJax className='math-container'>
            {`\\[
            \\begin{aligned}
              \\frac{\\partial \\hat u}{\\partial t} &= \\int^{\\infty}_{-\\infty}\\frac{\\partial u}{\\partial t} e^{-2\\pi i k x}dx \\\\
              &= \\frac{\\partial}{\\partial t} \\int^{\\infty}_{-\\infty}u(x,t) e^{-2\\pi i k x}dx \\\\
              &= \\frac{\\partial}{\\partial t} \\hat u(k,t)
            \\end{aligned}
            \\]`}
        </MathJax>
        Here, we've just shown that we can take the derivative with respect to <MathJax inline>{"\\(  t \\)"}</MathJax> out of the integral because we are transforming with respect to <MathJax inline>{"\\(  x\\)"}</MathJax>. Now, for <MathJax inline>{"\\(   \\frac{\\partial^2 u}{\\partial x^2} \\)"}</MathJax> we have 
        <MathJax className='math-container'>
            {`\\[
              \\frac{\\partial^2 \\hat u}{\\partial x^2} = \\int^{\\infty}_{-\\infty}\\frac{\\partial^2 u}{\\partial x^2} e^{-2\\pi i k x}dx
            \\]`}
        </MathJax>       
        We can apply integration by parts with <MathJax inline>{"\\(  h =  e^{-2\\pi i k x} \\)"}</MathJax>, <MathJax inline>{"\\(  dh =  -2\\pi i ke^{-2\\pi i k x}dx \\)"}</MathJax>, <MathJax inline>{"\\(  dg = \\frac{\\partial^2 u}{\\partial x^2}dx  \\)"}</MathJax>, and <MathJax inline>{"\\(  g = \\frac{\\partial u}{\\partial x}  \\)"}</MathJax>.
        <MathJax className='math-container'>
            {`\\[
            \\begin{aligned}
              \\frac{\\partial^2 \\hat u}{\\partial x^2} &= \\left.hg\\right|^{\\infty}_{-\\infty} - \\int^{\\infty}_{-\\infty}gdh \\\\
              &= \\left. \\frac{\\partial u}{\\partial x}e^{-2\\pi i k x}\\right|^{\\infty}_{-\\infty} + 2\\pi i k \\int^{\\infty}_{-\\infty} \\frac{\\partial u}{\\partial x} e^{-2\\pi i k x}dx
            \\end{aligned}
            \\]`}
        </MathJax> 
        Since <MathJax inline>{"\\(  \\frac{\\partial u}{\\partial x}\\)"}</MathJax> is integrable, the first term is zero. 
        We can apply integration by parts again with <MathJax inline>{"\\(  h =  e^{-2\\pi i k x} \\)"}</MathJax>, <MathJax inline>{"\\(  dh =  -2\\pi i ke^{-2\\pi i k x}dx \\)"}</MathJax>, <MathJax inline>{"\\(  dg = \\frac{\\partial u}{\\partial x}dx  \\)"}</MathJax>, and <MathJax inline>{"\\(  g = u  \\)"}</MathJax>.
        <MathJax className='math-container'>
            {`\\[
            \\begin{aligned}
              \\frac{\\partial^2 \\hat u}{\\partial x^2} &= 2\\pi i k\\left(\\left.hg\\right|^{\\infty}_{-\\infty} - \\int^{\\infty}_{-\\infty}gdh \\right)\\\\
              &= 2\\pi i k \\left(\\left. u(x,t)e^{-2\\pi i k x}\\right|^{\\infty}_{-\\infty} + 2\\pi i k \\int^{\\infty}_{-\\infty} u(x,t) e^{-2\\pi i k x}dx \\right) \\\\
              &= - 4\\pi^2 k^2 \\int^{\\infty}_{-\\infty} u(x,t) e^{-2\\pi i k x}dx \\\\
              &= - 4\\pi^2 k^2 \\hat u(k,t)
            \\end{aligned}
            \\]`}
        </MathJax> 
        Again, since <MathJax inline>{"\\( u\\)"}</MathJax> is integrable, <MathJax inline>{"\\( \\left. u(x,t)e^{-2\\pi i k x}\\right|^{\\infty}_{-\\infty}  = 0\\)"}</MathJax>. 
        </p>
        <p>
        Now that we have transformed expressions for <MathJax inline>{"\\(  \\frac{\\partial u}{\\partial t} \\)"}</MathJax> and <MathJax inline>{"\\(   \\frac{\\partial^2 u}{\\partial x^2} \\)"}</MathJax>, we can write the transformed heat equation as 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
              &\\frac{\\partial}{\\partial t} \\hat u(k,t) = - 4\\alpha \\pi^2 k^2 \\hat u(k,t) \\\\
               \\Leftrightarrow &\\frac{\\partial}{\\partial t} \\log(\\hat u(k,t)) = - 4\\alpha \\pi^2 k^2 \\\\
               \\Leftrightarrow & \\log(\\hat u(k,t))= - 4\\alpha \\pi^2 k^2 t + C(k) \\\\ 
               \\Leftrightarrow & \\hat u(k,t) = e^{- 4\\alpha \\pi^2 k^2 t + C(k)} 
              \\end{aligned}
            \\]`}
        </MathJax>  
        where <MathJax inline>{"\\( C(k)\\)"}</MathJax> is a constant in terms of <MathJax inline>{"\\( t\\)"}</MathJax> but could depend on <MathJax inline>{"\\( k\\)"}</MathJax>. 
        </p>
        <p>
        Suppose our initial condition is of the form <MathJax inline>{"\\( u(x,0) = h(x) \\)"}</MathJax>. We can transform this initial condition to get <MathJax inline>{"\\( \\hat u(k,0) = \\hat h(k) \\)"}</MathJax>. Using our transformed initial condition, we can solve for <MathJax inline>{"\\( C(k) = \\log(\\hat h(k)) \\)"}</MathJax>. This gives us 
        <MathJax className='math-container'>
            {`\\[
               \\hat u(k,t) = \\hat h(k)e^{- 4\\alpha \\pi^2 k^2 t} 
            \\]`}
        </MathJax>   
        </p>
        <p>
        Now, we want to do an inverse transform to recover <MathJax inline>{"\\( u(x,t) \\)"}</MathJax>. First, recall that a Fourier transform converts convolution into multiplication. Thus, if we denote <MathJax inline>{"\\( \\hat g(k) = e^{-4\\alpha \\pi^2 k^2 t} \\)"}</MathJax>, we can write the inverse transform as 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
               u(x,t) &= \\int^{\\infty}_{-\\infty}\\hat h(k)\\hat g(k) dk \\\\ 
               &= \\int^{\\infty}_{-\\infty}h(z)g(x-z)dz
              \\end{aligned}
            \\]`}
        </MathJax>  
        This means we need only find the inverse transform of <MathJax inline>{"\\( \\hat g(k) \\)"}</MathJax>. We can do this by completing the square to solve 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
               g(x) &= \\int^{\\infty}_{-\\infty} e^{- 4\\alpha \\pi^2 k^2 t} e^{2\\pi ki x}dk \\\\
               &= \\int^{\\infty}_{-\\infty} e^{- 4\\alpha \\pi^2 t \\left(k^2 - 2\\frac{ix}{4\\alpha \\pi t} k  + \\left(\\frac{ix}{4\\alpha\\pi t}\\right)^2 - \\left(\\frac{ix}{4\\alpha\\pi t}\\right)^2 \\right)}dk \\\\
               &= e^{\\frac{-x^2}{4\\alpha t} }\\int^{\\infty}_{-\\infty} e^{- 4\\alpha \\pi^2 t\\left(k - \\frac{ix}{4\\alpha\\pi t}\\right)^2}dk 
              \\end{aligned}
            \\]`}
        </MathJax> 
        Recall that the pdf of a normal distribution is given by <MathJax inline>{"\\( \\frac{e^{\\frac{-(x-\\mu)^2}{2\\sigma^2}}}{\\sqrt{2\\pi\\sigma^2}} \\)"}</MathJax>. If we can make our expression look like this, then we can get rid of the integral since we know that <MathJax inline>{"\\( \\int^{\\infty}_{-\\infty}\\frac{e^{\\frac{-(x-\\mu)^2}{2\\sigma^2}}}{\\sqrt{2\\pi\\sigma^2}} dx = 1\\)"}</MathJax>. 
        Let <MathJax inline>{"\\( \\mu = \\frac{ix}{4\\alpha \\pi t}\\)"}</MathJax> and <MathJax inline>{"\\( \\frac{1}{2\\sigma^2} = 4\\alpha \\pi^2 t\\Leftrightarrow \\sigma^2 = \\frac{1}{8\\alpha \\pi^2 t} \\)"}</MathJax>. In this way, we can rewrite our expression as 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
               g(x) &= e^{\\frac{-x^2}{4\\alpha t} }\\sqrt{2\\pi \\sigma^2}\\int^{\\infty}_{-\\infty} \\frac{e^{\\frac{-\\left(k - \\mu \\right)^2}{2\\sigma^2}}}{\\sqrt{2\\pi \\sigma^2}}dk \\\\
               &= e^{\\frac{-x^2}{4\\alpha t} }\\sqrt{2\\pi \\left(\\frac{1}{8\\alpha \\pi^2 t}\\right)} \\\\
               &= \\frac{e^{\\frac{-x^2}{4\\alpha t} }}{\\sqrt{4\\pi\\alpha t}}
              \\end{aligned}
            \\]`}
        </MathJax> 
        Now that we've solved for <MathJax inline>{"\\( g(x) \\)"}</MathJax>, we can solve for <MathJax inline>{"\\( u(x,t) \\)"}</MathJax> as 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
               u(x,t) &= \\int^{\\infty}_{-\\infty}h(z)g(x-z)dz \\\\
               &= \\frac{1}{\\sqrt{4 \\pi\\alpha t}}\\int^{\\infty}_{-\\infty}u(z,0) e^{\\frac{-(z-x)^2}{4\\alpha t} }dz
              \\end{aligned}
            \\]`}
        </MathJax>  
        </p>
        </MathJaxContext>
        <PageNavigator group="Fourier"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/fourier">Contents</NavLink></div>
        </div>
  );
}

export default Fourier4;