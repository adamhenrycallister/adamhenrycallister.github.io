import React, { useState } from 'react';
import './Fourier.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import ExampleBox from "../../../components/ExampleBox";


function Fourier3() {
  return (
        <div className='Fourier'>
        <PageNavigator group="Fourier" />
        <p className='heading1'>Fourier Transform</p>
        <MathJaxContext>
        <p>
        In the last section, we went over how to use a Fourier series to write a periodic function in terms of sines and cosines. Our end result was an infinite series of trignometric functions. But what about non-periodic functions? Recall the Fourier series definition and consider what would happen if we let the period length tend toward infinity (<MathJax inline>{"\\( T \\rightarrow \\infty \\)"}</MathJax>).
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= \\frac{1}{T} \\sum^{\\infty}_{n=-\\infty} \\left(\\int_T f(x')e^{\\frac{-2\\pi ni}{T}x'}dx'\\right) e^{\\frac{2\\pi ni}{T}x} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        Let's denote <MathJax inline>{"\\( k = \\frac{n}{T} \\)"}</MathJax> and consider how <MathJax inline>{"\\( k \\)"}</MathJax> changes as <MathJax inline>{"\\( n \\)"}</MathJax> increases. Since <MathJax inline>{"\\( n \\)"}</MathJax> must be an integer, the distance between each consecutive <MathJax inline>{"\\( n \\)"}</MathJax> is <MathJax inline>{"\\( \\frac{1}{T} \\)"}</MathJax>. As <MathJax inline>{"\\( T \\rightarrow \\infty \\)"}</MathJax>, 
        this distance becomes infinitesimally small. Thus, <MathJax inline>{"\\( k \\)"}</MathJax> is a continuous variable, and we can convert the infinite sum <MathJax inline>{"\\( \\frac{1}{T} \\sum^{\\infty}_{n=-\\infty} (\\cdot)\\)"}</MathJax> into an integral <MathJax inline>{"\\( \\int^{\\infty}_{-\\infty} (\\cdot)dk \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= \\int^{\\infty}_{-\\infty} \\left(\\int^{\\infty}_{-\\infty} f(x')e^{-2\\pi i k x'}dx'\\right) e^{2\\pi i k x}dk
            \\end{aligned}
          \\]`}
        </MathJax> 
        The expression in parentheses gives us the definition of a Fourier transform.
        </p>
        <p className='heading2'>Definition</p>
        <p>
        The Fourier transform of a function <MathJax inline>{"\\( f(x) \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            F(k) &= \\int^{\\infty}_{-\\infty} f(x)e^{-2\\pi i k x}dx
            \\end{aligned}
          \\]`}
        </MathJax>  
        Given a Fourier transform <MathJax inline>{"\\( F(k) \\)"}</MathJax>, the inverse Fourier transform is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= \\int^{\\infty}_{-\\infty} F(k)e^{2\\pi i k x}dk
            \\end{aligned}
          \\]`}
        </MathJax>      
        The transform <MathJax inline>{"\\( F(k) \\)"}</MathJax> is analogous to the <MathJax inline>{"\\( c_n \\)"}</MathJax> coefficients from the Fourier series that told us how much of each different sine or cosine function to include. However, <MathJax inline>{"\\( F(k) \\)"}</MathJax> is a continuous function while the <MathJax inline>{"\\( c_n \\)"}</MathJax>'s, although infinite in number, were discrete. 
        </p>
        <p className='heading2'>Gaussian Function</p>
        <p>
        Let's find the Fourier transform of the normal pdf, <MathJax inline>{"\\( f(x) = \\frac{e^{\\frac{-(x-\\mu)^2}{2\\sigma^2}}}{\\sqrt{2\\pi\\sigma^2}} \\)"}</MathJax>, which is a Gaussian.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            F(k) &= \\int^{\\infty}_{-\\infty} \\frac{e^{\\frac{-(x-\\mu)^2}{2\\sigma^2}}}{\\sqrt{2\\pi\\sigma^2}}e^{-2\\pi i k x}dx \\\\
            &= \\int^{\\infty}_{-\\infty} \\frac{e^{\\frac{-1}{2\\sigma^2} \\left( x^2 -2\\mu x + \\mu^2 + 4\\sigma^2 \\pi i k x\\right)}}{\\sqrt{2\\pi\\sigma^2}}dx 
            \\end{aligned}
          \\]`}
        </MathJax>  
        Focusing on the exponent, we can complete the square to get 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\frac{-1}{2\\sigma^2} \\left( x^2 -2\\mu x + \\mu^2 + 4\\sigma^2 \\pi i k x\\right) &= \\frac{-1}{2\\sigma^2} \\left( x^2 -2x(\\mu - 2\\sigma^2 \\pi i k) + (\\mu - 2\\sigma^2 \\pi i k)^2 - (\\mu - 2\\sigma^2 \\pi i k)^2 + \\mu^2\\right) \\\\
            &= \\frac{-1}{2\\sigma^2} \\left( x - \\mu + 2\\sigma^2 \\pi i k \\right)^2 - 2 \\pi k (\\mu i + \\sigma^2 \\pi k)
            \\end{aligned}
          \\]`}
        </MathJax>    
        Returning to our original expression, we have 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            F(k) &= e^{-2 \\pi k (\\mu i + \\sigma^2 \\pi k)} \\int^{\\infty}_{-\\infty} \\frac{e^{\\frac{-1}{2\\sigma^2} \\left( x - \\mu + 2\\sigma^2 \\pi i k \\right)^2}}{\\sqrt{2\\pi\\sigma^2}}dx \\\\
            &= e^{-2 \\pi k (\\mu i + \\sigma^2 \\pi k)}
            \\end{aligned}
          \\]`}
        </MathJax> 
        Thus, the Fourier transform of a Gaussian function is another Gaussian function. In fact, if we set <MathJax inline>{"\\( \\mu =0 \\)"}</MathJax> and <MathJax inline>{"\\( \\sigma^2 = \\frac{1}{2 \\pi} \\)"}</MathJax>, we have the following:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= e^{-\\pi x^2} \\\\
            F(k) &= e^{-\\pi k^2}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Convolution</p>
        <p>
        A useful property of Fourier transforms is that they turn convolution into multiplication. For two functions <MathJax inline>{"\\( f(x) \\)"}</MathJax> and <MathJax inline>{"\\( g(x) \\)"}</MathJax>, the convolution of <MathJax inline>{"\\( f \\)"}</MathJax> and <MathJax inline>{"\\( g \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\int^{\\infty}_{-\\infty} f(y)g(x-y)dy
            \\end{aligned}
          \\]`}
        </MathJax>  
        If we take the Fourier transform of this expression, we get 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\int^{\\infty}_{-\\infty}\\left(\\int^{\\infty}_{-\\infty} f(y)g(x-y)dy \\right)e^{-2 \\pi i k x}dx &= \\int^{\\infty}_{-\\infty}f(y)\\left(\\int^{\\infty}_{-\\infty} g(x-y)e^{-2 \\pi i k x} dx\\right)dy
            \\end{aligned}
          \\]`}
        </MathJax> 
        Now, if we let <MathJax inline>{"\\( x = z + y \\)"}</MathJax>, we get      
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\int^{\\infty}_{-\\infty}f(y)\\left(\\int^{\\infty}_{-\\infty} g(z)e^{-2 \\pi i k (z + y)} dz\\right)dy &= \\left( \\int^{\\infty}_{-\\infty}f(y)e^{-2 \\pi i k y}dy \\right) \\left(\\int^{\\infty}_{-\\infty} g(z)e^{-2 \\pi i k z } dz\\right) \\\\
            &= F(k)G(k)
            \\end{aligned}
          \\]`}
        </MathJax>
        where <MathJax inline>{"\\( F(k) \\)"}</MathJax> and <MathJax inline>{"\\( G(k) \\)"}</MathJax> are the Fourier transforms of  <MathJax inline>{"\\( f(x) \\)"}</MathJax> and <MathJax inline>{"\\( g(x) \\)"}</MathJax> respectively. 
        </p> 
        <p>
        Putting this together, we can write the convolution of two functions as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\int^{\\infty}_{-\\infty} f(y)g(x-y)dy = \\int^{\\infty}_{-\\infty} F(k)G(k)e^{2\\pi i k x}dk
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

export default Fourier3;