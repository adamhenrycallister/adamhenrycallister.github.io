import React, { useState } from 'react';
import './Fourier.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import FourierSeries from "./FourierSeries";
import ExampleBox from "../../../components/ExampleBox";


function Fourier2() {
  const [N, setN] = useState(1);  
  const [graph, setGraph] = useState("box");
  const options = ["box", "saw", "triangle"];
  return (
        <div className='Fourier'>
        <PageNavigator group="Fourier" />
        <p className='heading1'>Fourier Series</p>
        <MathJaxContext>
        <p>
        The goal of a Fourier series is to take a periodic function, or a function that repeats itself every period, and write it in terms of sines and cosines. 
        Later, when we go over Fourier transforms, we'll generalize this idea of approximating a function with sines and cosines to non-periodic functions. But, for now, 
        we are only going to think about repeating functions. Similar to a Taylor expansion, a Fourier series will express our periodic function as an infinite sum of terms. 
        Each term will have either a sine or cosine. We can approximate the function by taking the first few terms of the series. The more terms we include, the better the approximation becomes. 
        </p>
        <p>
        The graph below shows how a Fourier series fits three different types of periodic functions: box, saw tooth, and triangle. Notice how the Fourier approximation (the blue line) gets closer to 
        fitting the function (the red line) as the number of terms included in the approximation increases (as N goes up). 
        </p>
        <div className='graph-container'>
            <FourierSeries N={N} graph={graph}/>
            <div className="input-container">
                <div className="button-padding" style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
                <p>Number of Terms:</p>
                <div>
                    <button onClick={() => setN((prev) => Math.max(1, prev - 1))}>◀</button>
                    <span style={{ margin: "0 10px" }}>N = {N}</span>
                    <button onClick={() => setN((prev) => Math.min(50, prev + 1))}>▶</button>   
                </div>
                </div>   
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
                <p>Function Type:</p>
                <div style={{ display: "flex",flexDirection: "column"}}>
                    <button className={`${(graph === "box") ? "graph-button-active" : "graph-button"}`} onClick={() => setGraph("box")}>Box</button>  
                    <button className={`${(graph === "saw") ? "graph-button-active" : "graph-button"}`} onClick={() => setGraph("saw")}>Saw Tooth</button>  
                    <button className={`${(graph === "triangle") ? "graph-button-active" : "graph-button"}`} onClick={() => setGraph("triangle")}>Triangle</button>  
                </div>            
            </div>
          </div>
        </div>
        <p className='heading2'>Definition</p>
        <p>
        Given a periodic function, <MathJax inline>{"\\( f(x) \\)"}</MathJax>, with period length <MathJax inline>{"\\( T \\)"}</MathJax>, the Fourier series of <MathJax inline>{"\\( f(x) \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= \\sum^{\\infty}_{n=-\\infty} c_n e^{\\frac{2\\pi ni}{T}x} \\\\
            \\text{where } \\;\\;\\;c_n &= \\frac{1}{T}\\int_T f(x)e^{\\frac{-2\\pi ni}{T}x}dx
            \\end{aligned}
          \\]`}
        </MathJax> 
        The <MathJax inline>{"\\( c_n \\)"}</MathJax> terms are called the coefficients. Note that <MathJax inline>{"\\( c_0 \\)"}</MathJax> simplifies to <MathJax inline>{"\\( c_0 = \\frac{1}{T}\\int_T f(x) dx \\)"}</MathJax>. 
        The sum goes from <MathJax inline>{"\\( -\\infty \\)"}</MathJax> to <MathJax inline>{"\\( \\infty \\)"}</MathJax>, but we typically simplify things after solving for the coefficients by taking out <MathJax inline>{"\\( c_0 \\)"}</MathJax> and writing 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= c_0 + \\sum^{\\infty}_{n=1} \\left(c_n e^{\\frac{2\\pi ni}{T}x} + c_{-n} e^{\\frac{-2\\pi ni}{T}x}\\right) \\\\
            \\end{aligned}
          \\]`}
        </MathJax> 
        Also note that the integral in the expression for <MathJax inline>{"\\( c_n \\)"}</MathJax> can be taken over any full period length (e.g., from <MathJax inline>{"\\( -T/2 \\)"}</MathJax> to <MathJax inline>{"\\( T/2 \\)"}</MathJax>, from <MathJax inline>{"\\( 0 \\)"}</MathJax> to <MathJax inline>{"\\( T \\)"}</MathJax>, etc.). 
        Try to choose period bounds that make things simplier. 
        </p>
        <p className='heading2'>Box Function</p>
        <p>
        We'll start by finding the Fourier series for the box function, or the function that goes from 1 to -1 every half period. Let's assume the function is centered such that <MathJax inline>{"\\( f(0) = 1 \\)"}</MathJax> and <MathJax inline>{"\\( f(T/2) = -1 \\)"}</MathJax>. In other words, <MathJax inline>{"\\( x=0 \\)"}</MathJax> lines up with a switch from -1 to 1. (This describes the box function in the above graph.)  
        First, we need to decide which period we want to use to solve for our coefficients. In this case, we'll have to split up our integral when we go from -1 to 1, and it will be helpful to have zero in our integration bounds. So, we'll integrate over <MathJax inline>{"\\( [-T/2, T/2] \\)"}</MathJax>. This means we can write our function as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) = 
            \\begin{cases}
                -1 & \\text{if } x \\in [-T/2, 0] \\\\
                1 & \\text{if } x \\in (0, T/2]
            \\end{cases}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        Now, we can solve for the coefficients 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            c_n &= \\frac{1}{T}\\int^{T/2}_{-T/2} f(x)e^{\\frac{-2\\pi ni}{T}x}dx \\\\
            &= \\frac{1}{T}\\left(\\int^{T/2}_{0} e^{\\frac{-2\\pi ni}{T}x}dx - \\int^{0}_{-T/2} e^{\\frac{-2\\pi ni}{T}x}dx\\right) \\\\
            &= \\frac{-1}{2\\pi n i}\\left( \\left.e^{\\frac{-2\\pi ni}{T}x}\\right|^{T/2}_{0} - \\left.e^{\\frac{-2\\pi ni}{T}x}\\right|^{0}_{-T/2}  \\right) \\\\
            &= \\frac{i}{2\\pi n}\\left( e^{-\\pi ni} + e^{\\pi ni}  - 2 \\right) \\\\
            &= \\frac{i}{2\\pi n}\\left( 2\\cos(\\pi n )  - 2 \\right) \\\\
            &= \\frac{i}{\\pi n}\\left( (-1)^n  - 1 \\right) \\\\ \\\\
            c_{-n} &= \\frac{- i}{\\pi n}\\left( (-1)^n  - 1 \\right) \\\\ \\\\
            c_0 &= \\frac{1}{T}\\left(\\int^{T/2}_{0} 1 dx - \\int^{0}_{-T/2} 1 dx\\right) = 0
            \\end{aligned}
          \\]`}
        </MathJax> 
        Here, recall that <MathJax inline>{"\\( e^{\\pi n i} + e^{-\\pi n i} = 2\\cos(\\pi n)\\)"}</MathJax>, and <MathJax inline>{"\\( \\cos(\\pi n)\\)"}</MathJax> is 1 if <MathJax inline>{"\\( n \\)"}</MathJax> is even and -1 if <MathJax inline>{"\\( n \\)"}</MathJax> is odd. Using these coefficients, we can write <MathJax inline>{"\\( f(x) \\)"}</MathJax> as
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= \\sum^{\\infty}_{n=1} \\left(\\frac{i}{\\pi n}\\left( (-1)^n  - 1 \\right) e^{\\frac{2\\pi ni}{T}x} - \\frac{ i}{\\pi n}\\left( (-1)^n  - 1 \\right) e^{\\frac{-2\\pi ni}{T}x}\\right) \\\\
            &= \\sum^{\\infty}_{n=1} \\left(\\frac{i}{\\pi n}\\left( (-1)^n  - 1 \\right) \\right) 2 i\\sin \\left(\\frac{2\\pi n}{T}x \\right) \\\\
            &= \\frac{2}{\\pi} \\sum^{\\infty}_{n=1} \\left(\\frac{1}{n}\\left( 1 - (-1)^n \\right) \\right)\\sin \\left(\\frac{2\\pi n}{T}x \\right)  
            \\end{aligned}
          \\]`}
        </MathJax> 
        Note that <MathJax inline>{"\\( \\left( 1 - (-1)^n \\right) \\)"}</MathJax> makes all of the even terms zero. Let's adjust things by subbing in <MathJax inline>{"\\(  2n-1 \\)"}</MathJax> for <MathJax inline>{"\\( n \\)"}</MathJax>.
         <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= \\frac{4}{\\pi} \\sum^{\\infty}_{n=1} \\left(\\frac{1}{2n - 1} \\right) \\sin \\left(\\frac{2\\pi (2n-1)}{T}x \\right)
            \\end{aligned}
          \\]`}
        </MathJax> 
        This gives us the Fourier series for a box function! Try working through the examples below to find the Fourier series for a saw tooth and a triangle function.
        </p>
        <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              Here, we can use the period from <MathJax inline>{"\\( -T/2 \\)"}</MathJax> to <MathJax inline>{"\\( T/2 \\)"}</MathJax>, which follows <MathJax inline>{"\\( f(x) = x \\)"}</MathJax> over this interval. 
              We can solve for the coefficients as 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                c_n &= \\frac{1}{T}\\int^{T/2}_{-T/2} x e^{\\frac{-2\\pi n i}{T}x}dx
                \\end{aligned}
              \\]`}
            </MathJax> 
            Here, we'll use integration by parts with <MathJax inline>{"\\( u = x \\)"}</MathJax>, <MathJax inline>{"\\( du = dx \\)"}</MathJax>, <MathJax inline>{"\\( dv =  e^{\\frac{-2\\pi n i}{T}x}dx \\)"}</MathJax>, and <MathJax inline>{"\\( v =  \\frac{-T}{2\\pi n i}e^{\\frac{-2\\pi n i}{T}x} \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                c_n &= \\frac{1}{T}\\left(\\left.uv\\right|^{T/2}_{-T/2} - \\int^{T/2}_{-T/2} v du\\right) \\\\
                &= \\frac{1}{T}\\left(\\left.\\frac{-Tx}{2\\pi n i}e^{\\frac{-2\\pi n i}{T}x} \\right|^{T/2}_{-T/2} + \\frac{T}{2\\pi n i}\\int^{T/2}_{-T/2} e^{\\frac{-2\\pi n i}{T}x}  dx\\right) \\\\
                &= \\left.\\left(\\frac{-x}{2\\pi n i}e^{\\frac{-2\\pi n i}{T}x} + \\frac{T}{4\\pi^2 n^2} e^{\\frac{-2\\pi n i}{T}x} \\right)  \\right|^{T/2}_{-T/2}  \\\\
                &= \\frac{-T}{4\\pi n i}e^{-\\pi n i} + \\frac{T}{4\\pi^2 n^2} e^{-\\pi n i}  - \\left( \\frac{T}{4\\pi n i}e^{\\pi n i} + \\frac{T}{4\\pi^2 n^2} e^{\\pi n i} \\right)  \\\\
                &= \\frac{Ti}{4\\pi n }\\left(e^{\\pi n i} + e^{-\\pi n i} \\right) - \\frac{T}{4\\pi^2 n^2} \\left(e^{\\pi n i} - e^{-\\pi n i} \\right) \\\\
                 &= \\frac{2 Ti\\cos(\\pi n)}{4\\pi n } - \\frac{2 Ti \\sin(\\pi n)}{4\\pi^2 n^2} \\\\
                 &= \\frac{Ti(-1)^n}{\\pi n } \\\\ \\\\
                 c_{-n} &= \\frac{-Ti(-1)^n}{\\pi n } \\\\ \\\\
                 c_0 &= \\frac{1}{T}\\int^{T/2}_{-T/2} x dx = 0
                \\end{aligned}
              \\]`}
            </MathJax> 
            Using these coefficients, we have 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                f(x) &= \\sum^{\\infty}_{n=1} \\left( \\frac{Ti(-1)^n}{\\pi n }  e^{\\frac{2\\pi ni}{T}x} - \\frac{Ti(-1)^n}{\\pi n }  e^{\\frac{-2\\pi ni}{T}x}\\right) \\\\
                &= \\frac{Ti}{\\pi} \\sum^{\\infty}_{n=1} \\left( \\frac{(-1)^n}{ n } \\right) \\left(2 i\\sin \\left(\\frac{2\\pi n}{T}x\\right) \\right) \\\\
                &= \\frac{2 T}{\\pi} \\sum^{\\infty}_{n=1} \\left( \\frac{(-1)^{n-1}}{ n } \\right) \\sin \\left(\\frac{2\\pi n}{T}x\\right)
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> Find the Fourier series for a saw tooth function where <MathJax inline>{"\\( f(-T/2) = -T/2 \\)"}</MathJax> and <MathJax inline>{"\\( f(T/2) = T/2 \\)"}</MathJax>.</p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              Here, we can use the period from <MathJax inline>{"\\( -T/2 \\)"}</MathJax> to <MathJax inline>{"\\( T/2 \\)"}</MathJax>, which follows 
            <MathJax className='math-container'>
              {`\\[
                f(x) = \\begin{cases} T/4 + x & \\text{if } x \\in [-T/2, 0] \\\\ T/4 -x & \\text{if } x \\in (0, T/2] \\end{cases}
              \\]`}
            </MathJax> 
              We can solve for the coefficients as 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                c_n &= \\frac{1}{T}\\left( \\int^{0}_{-T/2} (T/4 + x) e^{\\frac{-2\\pi n i}{T}x}dx  + \\int^{T/2}_{0} (T/4 - x) e^{\\frac{-2\\pi n i}{T}x}dx \\right) \\\\
                &= \\frac{1}{T}\\left( \\int^{0}_{-T/2}  x e^{\\frac{-2\\pi n i}{T}x}dx  - \\int^{T/2}_{0}  x e^{\\frac{-2\\pi n i}{T}x}dx + (T/4)\\int^{T/2}_{-T/2} e^{\\frac{-2\\pi n i}{T}x}dx\\right) 
                \\end{aligned}
              \\]`}
            </MathJax> 
            In Example 1, we found that we can use integration by parts to get <MathJax inline>{"\\( \\int^b_a x e^{\\frac{-2\\pi n i}{T}x} =  \\left.\\left(\\frac{-Tx}{2\\pi n i}e^{\\frac{-2\\pi n i}{T}x} + \\frac{T^2}{4\\pi^2 n^2} e^{\\frac{-2\\pi n i}{T}x} \\right)  \\right|^{b}_{a} \\)"}</MathJax>. 
            This gives us
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                c_n &=  \\left.\\left(\\frac{-x}{2\\pi n i}e^{\\frac{-2\\pi n i}{T}x} + \\frac{T}{4\\pi^2 n^2} e^{\\frac{-2\\pi n i}{T}x} \\right)  \\right|^{0}_{-T/2} -  \\left.\\left(\\frac{-x}{2\\pi n i}e^{\\frac{-2\\pi n i}{T}x} + \\frac{T}{4\\pi^2 n^2} e^{\\frac{-2\\pi n i}{T}x} \\right)  \\right|^{T/2}_{0}  - \\left. \\frac{T}{8\\pi n i} e^{\\frac{-2\\pi n i}{T}x} \\right|^{T/2}_{-T/2}\\\\
                &= \\frac{T}{2\\pi^2 n^2} + \\left(e^{\\pi n i} - e^{-\\pi n i}\\right)\\left(\\frac{Ti}{4 \\pi n } - \\frac{Ti}{8\\pi n }\\right) - \\left(e^{\\pi n i} + e^{-\\pi ni}\\right)\\left(\\frac{T}{4 \\pi^2 n^2}\\right)  \\\\ 
                &= \\frac{T}{2\\pi^2 n^2} + 2 i\\sin(\\pi n)\\left(\\frac{Ti}{4 \\pi n } - \\frac{Ti}{8\\pi n }\\right) - 2 \\cos(\\pi n)\\left(\\frac{T}{4 \\pi^2 n^2}\\right) \\\\
                &= \\frac{T\\left(1 - (-1)^n\\right)}{2 \\pi^2 n^2} \\\\ \\\\
                 c_{-n} &= \\frac{T\\left(1 - (-1)^n\\right)}{2 \\pi^2 n^2} \\\\ \\\\
                 c_0 &= \\frac{1}{T}\\left( \\int^{0}_{-T/2} (T/4 + x) dx  + \\int^{T/2}_{0} (T/4 - x) dx \\right) = 0
                \\end{aligned}
              \\]`}
            </MathJax> 
            Using these coefficients, we have 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                f(x) &= \\sum^{\\infty}_{n=1} \\left( \\frac{T\\left(1 - (-1)^n\\right)}{2 \\pi^2 n^2}\\right)\\left(e^{\\frac{2\\pi ni}{T}x} + e^{\\frac{-2\\pi ni}{T}x}\\right) \\\\
                &= \\frac{T}{\\pi^2}\\sum^{\\infty}_{n=1} \\left( \\frac{1 - (-1)^n}{ n^2} \\right)\\cos \\left(\\frac{2 \\pi n}{T}x\\right) \\\\
                \\end{aligned}
              \\]`}
            </MathJax> 
            Note that <MathJax inline>{"\\( \\left( 1 - (-1)^n \\right) \\)"}</MathJax> makes all of the even terms zero. Let's adjust things by subbing in <MathJax inline>{"\\(  2n-1 \\)"}</MathJax> for <MathJax inline>{"\\( n \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                f(x) &= \\frac{2 T}{\\pi^2}\\sum^{\\infty}_{n=1} \\left( \\frac{1}{ (2n-1)^2} \\right)\\cos \\left(\\frac{2 \\pi (2n-1)}{T}x\\right) \\\\
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> Find the Fourier series for a triangle function where <MathJax inline>{"\\( f(-T/2) = -T/4 \\)"}</MathJax>, <MathJax inline>{"\\( f(0) = T/4 \\)"}</MathJax>, and <MathJax inline>{"\\( f(T/2) = -T/4 \\)"}</MathJax>.</p>
          </ExampleBox>
        </MathJaxContext>
        <PageNavigator group="Fourier"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/fourier">Contents</NavLink></div>
        </div>
  );
}

export default Fourier2;