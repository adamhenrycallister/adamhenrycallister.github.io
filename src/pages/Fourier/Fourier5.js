import React, { useState } from 'react';
import './Fourier.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../components/PageNavigator";
import ExampleBox from "../../components/ExampleBox";
import DFTGraph from "./DFTGraph";

function Fourier5() {
  const [terms, setTerms] = useState(1);
  return (
        <div className='Fourier'>
        <PageNavigator group="Fourier" />
        <p className='heading1'>Discrete Fourier Transform</p>
        <MathJaxContext>
        <p>
        So far, we've covered <NavLink className='inline-link' to="/fourier/series">Fourier Series</NavLink> for periodic functions and <NavLink className='inline-link' to="/fourier/transform">Fourier Transforms</NavLink> for non-periodic functions. What if we don't have an explicit way of describing our function, but we know a bunch of points on the graph of our function? 
        In this case, we can use a Discrete Fourier Transform. The idea here is to take a discrete set of function values and rewrite them in terms of sines and cosines. 
        </p>
        <p className='heading2'>Definition</p>
        <p>
        Suppose we start with a list of <MathJax inline>{"\\( N \\)"}</MathJax> ordered pairs from our data: <MathJax inline>{"\\( (x_0, y_0), (x_1, y_1), \\dots, (x_{N-1}, y_{N-1}) \\)"}</MathJax>. The first thing we'll do is assign a natural number to each ordered pair sequentiallly according to <MathJax inline>{"\\( x  \\)"}</MathJax> values. In other words, we'll consider the sequence of <MathJax inline>{"\\( y  \\)"}</MathJax> values, <MathJax inline>{"\\( \\{y_n\\} = y_0, y_1, \\dots, y_{N-1}\\)"}</MathJax>. 
        For each <MathJax inline>{"\\( y_n \\)"}</MathJax>, the discrete Fourier transform of <MathJax inline>{"\\( y_n \\)"}</MathJax> is given by
        <MathJax className='math-container'>
            {`\\[
              F_k = \\sum^{N-1}_{n=0}y_n e^{\\frac{-2\\pi i k n}{N}}
            \\]`}
        </MathJax>
        In this way, we can create a sequence of transformed values <MathJax inline>{"\\( \\{F_k\\} = F_0, F_1, \\dots, F_{N-1} \\)"}</MathJax>. 
        For each <MathJax inline>{"\\( F_k \\)"}</MathJax>, the inverse transform of <MathJax inline>{"\\( F_k \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
            {`\\[
              y_n = \\frac{1}{N}\\sum^{N-1}_{k=0}F_k e^{\\frac{2\\pi i k n}{N}}
            \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Approximation</p>
        <p>
        Using the discrete Fourier transform equations, we can come up with a way of writing each <MathJax inline>{"\\( y_n \\)"}</MathJax> in terms of cosines. 
        This will allow us to approximate the function that might have generated our data. Consider the inverse transform equation. We'll begin by taking out <MathJax inline>{"\\( F_0 \\)"}</MathJax> from the sum.
        <MathJax className='math-container'>
            {`\\[
              y_n = \\frac{1}{N}\\left(F_0 + \\sum^{N-1}_{k=1}F_k e^{\\frac{2\\pi i k n}{N}}\\right)
            \\]`}
        </MathJax>
        Next, we'll group together each <MathJax inline>{"\\( F_k \\)"}</MathJax> term for <MathJax inline>{"\\( 0 < k < \\frac{N}{2} \\)"}</MathJax> with its corresponding <MathJax inline>{"\\( F_{N-k} \\)"}</MathJax> term. 
        Note that there are <MathJax inline>{"\\( N -1 \\)"}</MathJax> remaining terms in the sum. If <MathJax inline>{"\\( N \\)"}</MathJax> is even, then there is an odd number of terms remaining in the sum, which means the middle term will not have a match. If <MathJax inline>{"\\( N \\)"}</MathJax> is odd, then there is an even number of terms remaining in the sum, 
        which means each <MathJax inline>{"\\( F_k \\)"}</MathJax> term for <MathJax inline>{"\\( 0 < k < \\frac{N}{2} \\)"}</MathJax> will have an <MathJax inline>{"\\( F_{N-k} \\)"}</MathJax> match. Thus, we can write <MathJax inline>{"\\( y_n \\)"}</MathJax> as
        <MathJax className='math-container'>
            {`\\[
              y_n = 
              \\begin{cases}
                \\frac{1}{N}\\left(F_0 + \\sum^{\\frac{N}{2}-1}_{k=1}\\left( F_k e^{\\frac{2\\pi i k n}{N}} + F_{N-k} e^{\\frac{2\\pi i n(N-k)}{N}}\\right) + F_{\\frac{N}{2}}e^{\\pi i n}\\right) & \\text{if } N \\text{ is even} \\\\
                \\frac{1}{N}\\left(F_0 + \\sum^{\\frac{N-1}{2}}_{k=1}\\left( F_k e^{\\frac{2\\pi i k n}{N}} + F_{N-k} e^{\\frac{2\\pi i n(N-k)}{N}}\\right) \\right) & \\text{if } N \\text{ is odd} 
              \\end{cases}
            \\]`}
        </MathJax>   
        Now, we'll focus on simplifying <MathJax inline>{"\\( F_0 \\)"}</MathJax>, <MathJax inline>{"\\( F_{\\frac{N}{2}}e^{\\pi i n} \\)"}</MathJax>, and <MathJax inline>{"\\( F_k e^{\\frac{2\\pi i k n}{N}} + F_{N-k} e^{\\frac{2\\pi i n(N-k)}{N}}\\)"}</MathJax>. 
        Using the Fourier transform equation, we have that <MathJax inline>{"\\( F_0 = \\sum^{N-1}_{m=0}y_m  \\)"}</MathJax>, which means <MathJax inline>{"\\( \\frac{1}{N}F_0 \\)"}</MathJax> is simply the average all the <MathJax inline>{"\\( y_n  \\)"}</MathJax>'s. 
        We also have that 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
                F_{\\frac{N}{2}}e^{\\pi i n} &=  \\left(\\sum^{N-1}_{m=0}y_m e^{-\\pi i m}\\right)e^{\\pi i n} \\\\
                &=  \\sum^{N-1}_{m=0}y_m e^{\\pi i(n-m)} \\\\
                &=  \\sum^{N-1}_{m=0}y_m (-1)^{n-m} \\\\
              \\end{aligned}
            \\]`}
        </MathJax>
        Turning to <MathJax inline>{"\\( F_k e^{\\frac{2\\pi i k n}{N}} + F_{N-k} e^{\\frac{2\\pi i n(N-k)}{N}} \\)"}</MathJax>, we can write 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
                F_k e^{\\frac{2\\pi i k n}{N}} + F_{N-k} e^{\\frac{2\\pi i n(N-k)}{N}} &= \\left(\\sum^{N-1}_{m=0}y_m e^{\\frac{-2\\pi i k m}{N}} \\right) e^{\\frac{2\\pi i k n}{N}} + \\left(\\sum^{N-1}_{m=0}y_m e^{\\frac{-2\\pi i m(N-k)}{N}} \\right)  e^{\\frac{2\\pi i n(N-k)}{N}} \\\\
                &= \\sum^{N-1}_{m=0}y_m \\left(e^{\\frac{2\\pi i k(n-m)}{N}} +  e^{\\frac{2\\pi i (N-k)(n-m)}{N}} \\right) \\\\
                &= \\sum^{N-1}_{m=0}y_m \\left(e^{\\frac{2\\pi i k(n-m)}{N}} +  e^{2\\pi i (n-m)}e^{\\frac{-2\\pi i k(n-m)}{N}} \\right) \\\\
                &= \\sum^{N-1}_{m=0}2y_m \\cos \\left(\\frac{2 \\pi k (n-m)}{N} \\right)
              \\end{aligned}
            \\]`}
        </MathJax>  
        Putting everything together, we have the following equation for <MathJax inline>{"\\( y_n  \\)"}</MathJax>:
        <MathJax className='math-container'>
            {`\\[
              y_n = 
              \\begin{cases}
                \\frac{1}{N}\\sum^{N-1}_{m=0}y_m \\left(1 + 2\\sum^{\\frac{N}{2}-1}_{k=1}\\cos \\left(\\frac{2 \\pi k (n-m)}{N} \\right) +  (-1)^{n-m}\\right) & \\text{if } N \\text{ is even} \\\\
                \\frac{1}{N}\\sum^{N-1}_{m=0}y_m\\left(1 + 2\\sum^{\\frac{N-1}{2}}_{k=1} \\cos \\left(\\frac{2 \\pi k (n-m)}{N} \\right) \\right) & \\text{if } N \\text{ is odd} 
              \\end{cases}
            \\]`}
        </MathJax>  
        </p>
        <p>
        The above equation will exactly return each <MathJax inline>{"\\( y_n  \\)"}</MathJax>. We can approximate each <MathJax inline>{"\\( y_n  \\)"}</MathJax> by ordering terms according to their frequency content starting with <MathJax inline>{"\\( F_0  \\)"}</MathJax> and then using only some of the terms. 
        Note that <MathJax inline>{"\\( \\cos \\left(\\frac{2 \\pi k (n-m)}{N} \\right) \\)"}</MathJax> completes <MathJax inline>{"\\( k \\)"}</MathJax> cycles over our sample of <MathJax inline>{"\\( N \\)"}</MathJax> discrete values. Thus, we can order our terms from lowest to highest frequency as follows: 
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr className="table-row table-group-header">
              <th className="table-entry-head" colSpan={3}>Even <MathJax inline>{"\\( N  \\)"}</MathJax></th>
              <th className="table-entry-head" colSpan={3}>Odd <MathJax inline>{"\\( N  \\)"}</MathJax></th>
            </tr>
            <tr className="table-row table-column-label">
              <th className="table-entry-head">Order</th>
              <th className="table-entry-head"><MathJax inline>{"\\( F_k \\)"}</MathJax>'s</th>
              <th className="table-entry-head">Term</th>
              <th className="table-entry-head">Order</th>
              <th className="table-entry-head"><MathJax inline>{"\\( F_k \\)"}</MathJax>'s</th>
              <th className="table-entry-head">Term</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">1</td>
              <td className="table-entry"><MathJax inline>{"\\( F_0 \\)"}</MathJax></td>
              <td className="table-entry">1</td>
              <td className="table-entry">1</td>
              <td className="table-entry"><MathJax inline>{"\\( F_0 \\)"}</MathJax></td>
              <td className="table-entry">1</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">2</td>
              <td className="table-entry"><MathJax inline>{"\\( F_1/F_{N-1} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2 \\cos\\left(\\frac{2 \\pi(n-m)}{N}\\right) \\)"}</MathJax></td>
              <td className="table-entry">2</td>
              <td className="table-entry"><MathJax inline>{"\\( F_1/F_{N-1} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2 \\cos\\left(\\frac{2 \\pi(n-m)}{N}\\right) \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( \\vdots\\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\vdots \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\vdots \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\vdots \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\vdots \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\vdots \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( \\frac{N}{2}\\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( F_{\\frac{N}{2}-1}/F_{\\frac{N}{2} + 1} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2 \\cos\\left(\\frac{ 2\\pi\\left(\\frac{N}{2} - 1\\right)(n-m)}{N}\\right) \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( \\frac{N+ 1}{2} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( F_{\\frac{N-1}{2}}/F_{\\frac{N+1}{2}} \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2 \\cos\\left(\\frac{2\\pi\\left(\\frac{N-1}{2}\\right) (n-m)}{N}\\right) \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td><MathJax inline>{"\\( \\frac{N}{2} + 1\\)"}</MathJax></td>
              <td><MathJax inline>{"\\( F_{\\frac{N}{2}} \\)"}</MathJax></td>
              <td><MathJax inline>{"\\( (-1)^{n-m} \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        Using this ordering, we can write the approximation of <MathJax inline>{"\\( y_n  \\)"}</MathJax> using <MathJax inline>{"\\( s  \\)"}</MathJax> terms (where <MathJax inline>{"\\( s \\in \\{1,2,\\dots, \\frac{N}{2} + 1\\}  \\)"}</MathJax> if <MathJax inline>{"\\( N \\)"}</MathJax> is even and <MathJax inline>{"\\( s \\in \\{1,2,\\dots, \\frac{N+1}{2}\\}  \\)"}</MathJax> if <MathJax inline>{"\\( N \\)"}</MathJax> is odd) as 
        <MathJax className='math-container'>
            {`\\[
              y_{n,s} = 
              \\begin{cases}
                \\frac{1}{N}\\sum^{N-1}_{m=0}y_m \\left(1 + 2\\sum^{\\min \\left\\{s-1, \\frac{N}{2}-1\\right\\}}_{k=1}\\cos \\left(\\frac{2 \\pi k (n-m)}{N} \\right) +  1_{\\left\\{s=\\frac{N}{2} + 1\\right\\}}(-1)^{n-m}\\right) & \\text{if } N \\text{ is even} \\\\
                \\frac{1}{N}\\sum^{N-1}_{m=0}y_m\\left(1 + 2\\sum^{s-1}_{k=1} \\cos \\left(\\frac{2 \\pi k (n-m)}{N} \\right) \\right) & \\text{if } N \\text{ is odd} 
              \\end{cases}
            \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Numerical Example</p>
        <p>
        Suppose we have four data points: <MathJax inline>{"\\( (0,1), (1,2), (2,1), (3,4) \\)"}</MathJax>. Let's approximate these data points using the first 2 terms from our discrete Fourier transform approximation. Here, we have <MathJax inline>{"\\( N =4 \\)"}</MathJax> and <MathJax inline>{"\\( s=2 \\)"}</MathJax>, which gives us 
        <MathJax className='math-container'>
            {`\\[
              y_{n,2} = \\frac{1}{4}\\sum^{3}_{m=0}y_m \\left(1 + 2\\cos \\left(\\frac{\\pi}{2}(n-m) \\right) \\right)
            \\]`}
        </MathJax>
        Solving for each <MathJax inline>{"\\( y  \\)"}</MathJax> value, we have 
        <MathJax className='math-container'>
            {`\\[
              \\begin{aligned}
                y_{0,2} &= \\frac{1}{4}(3y_0 + y_1 - y_2 + y_3) = 2 \\\\
                y_{1,2} &= \\frac{1}{4}(y_0 + 3y_1 + y_2 - y_3) = 1 \\\\
                y_{2,2} &= \\frac{1}{4}(- y_0 + y_1 + 3y_2 + y_3) = 2 \\\\
                y_{3,2} &= \\frac{1}{4}(y_0 - y_1 + y_2 + 3y_3) = 3
              \\end{aligned}
            \\]`}
        </MathJax>   
        </p>
        <p className='heading2'>Graph</p>
        <p>
        The graph below shows how a discrete Fourier transform can be used to approximate data. Note that the approximation with only one term simply gives the average of the data. As you increase the number of terms, the approximation more closely fits the data.
        </p>
        <div className='graph-container' style={{paddingTop: "20px"}}>
            <DFTGraph terms={terms}/>
            <div className="input-container">
              <div className="button-padding" style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
                <p>Number of Terms:</p>
                <div>
                    <button onClick={() => setTerms((prev) => Math.max(1, prev - 1))}>◀</button>
                    <span style={{ margin: "0 10px" }}>{terms}</span>
                    <button onClick={() => setTerms((prev) => Math.min(20, prev + 1))}>▶</button>   
                </div>
              </div>   
            </div>
        </div>
        </MathJaxContext>
        <PageNavigator group="Fourier"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/fourier">Contents</NavLink></div>
        </div>
  );
}

export default Fourier5;