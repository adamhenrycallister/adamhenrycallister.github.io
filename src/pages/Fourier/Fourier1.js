import React, { useState } from 'react';
import './Fourier.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../components/PageNavigator";
import ComplexPlane from "./ComplexPlane";
// import ExampleBox from "../../components/ExampleBox";


function Fourier1() {
  return (
        <div className='Fourier'>
        <PageNavigator group="Fourier" />
        <p className='heading1'>Complex Numbers</p>
        <MathJaxContext>
        <p>Before we jump into Fourier series and Fourier transforms, let's review some basics about complex numbers. The set of complex numbers includes all numbers that can be written in the 
        form <MathJax inline>{"\\( a + bi \\)"}</MathJax>, where <MathJax inline>{"\\( a \\)"}</MathJax> and <MathJax inline>{"\\( b \\)"}</MathJax> are both real numbers and <MathJax inline>{"\\( i = \\sqrt{-1} \\)"}</MathJax>. We call <MathJax inline>{"\\( a \\)"}</MathJax> the "real" part of the number  
        and <MathJax inline>{"\\( b \\)"}</MathJax> the "imaginary" part of the number. A number is a pure real number if <MathJax inline>{"\\( b = 0 \\)"}</MathJax> and a pure imaginary number if <MathJax inline>{"\\( a = 0 \\)"}</MathJax>. If we 
        think of the pure real numbers along an infinitely long line from <MathJax inline>{"\\( -\\infty \\)"}</MathJax> to <MathJax inline>{"\\( \\infty \\)"}</MathJax>, the set of complex numbers extends this line into a plane by adding another axis. In this way, we can think about each complex number 
        as a <MathJax inline>{"\\( (a,b) \\)"}</MathJax> coordinate pair on a graph, where the x-coordinate, <MathJax inline>{"\\( a \\)"}</MathJax>, moves horizontally along the real axis and the y-coordinate, <MathJax inline>{"\\( b \\)"}</MathJax>, moves vertically along the imaginary axis. 
        </p> 
        <div className='graph-container'>
            <ComplexPlane />
        </div>
        <p>Note that we can add and subtract with complex numbers by simply keeping track of the real and the imaginary components. For any two complex numbers <MathJax inline>{"\\( a + bi \\)"}</MathJax> and <MathJax inline>{"\\( c + di \\)"}</MathJax>, 
        we have 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            (a + bi) + (c + di) = (a + c) + (b + d)i \\\\
            (a + bi) - (c + di) = (a - c) + (b - d)i \\\\
            \\end{aligned}
          \\]`}
        </MathJax> 
        We can also multiply with complex numbers if we remember that <MathJax inline>{"\\( i^2 = \\sqrt{-1}^2 = -1 \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            (a + bi)(c + di) &= ac + adi + bci + bdi^2 \\\\
            &= (ac - bd) + (ad + bc)i
            \\end{aligned}
          \\]`}
        </MathJax>  
        Division is also possible if we use the complex conjugate of the divisor. For a complex number <MathJax inline>{"\\( a + bi \\)"}</MathJax>, the complex conjugate of <MathJax inline>{"\\( a + bi \\)"}</MathJax> is <MathJax inline>{"\\( a - bi \\)"}</MathJax>. 
        You can get rid of the imaginary component of a complex number by multiplying by its conjugate. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            (a + bi)(a - bi) &= a^2 - b^2i^2 \\\\
            &= a^2 + b^2
            \\end{aligned}
          \\]`}
        </MathJax>
        Thus, we can remove the imaginary component from a complex divisor by simply multiplying the top and bottom of the fraction by the divisor's conjugate. This give us 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\frac{c + di}{a + bi} &= \\frac{(c + di)(a-bi)}{(a + bi)(a-bi)} \\\\
            &= \\frac{ac - bci + adi -bdi^2}{a^2 + b^2} \\\\
            &= \\frac{(ac + bd) + (ad - bc)i}{a^2 + b^2}
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>
        <p className='heading2'>Euler's Identity</p>
        <p>
        We've talked about addition, subtraction, multiplication, and division, but what about using a complex number as an exponent? What does it mean if I take a number, <MathJax inline>{"\\( x \\)"}</MathJax>, to the power of <MathJax inline>{"\\( a + bi \\)"}</MathJax>? 
        We can write any exponential in terms of <MathJax inline>{"\\( e \\)"}</MathJax> as follows:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            x^{a + bi} &= x^ax^{bi} \\\\
            &= x^ae^{\\log(x^{bi})} \\\\
            &= x^ae^{b\\log(x)i}
            \\end{aligned}
          \\]`}
        </MathJax> 
        We know how to find <MathJax inline>{"\\( x^a \\)"}</MathJax> and <MathJax inline>{"\\( b\\log(x) \\)"}</MathJax>. Thus, to solve the problem of complex exponents, we really need only find an expression for <MathJax inline>{"\\( e^{\\theta i} \\)"}</MathJax>, where <MathJax inline>{"\\( \\theta \\)"}</MathJax> is some real number. 
        </p>
        <p>First let's consider the Taylor expansions of <MathJax inline>{"\\( e^x \\)"}</MathJax>, <MathJax inline>{"\\( \\sin(x) \\)"}</MathJax>, and <MathJax inline>{"\\( \\cos (x) \\)"}</MathJax>, all centered at zero. 
        For a function, <MathJax inline>{"\\( f(x) \\)"}</MathJax>, that is infinitely differentiable at some value <MathJax inline>{"\\( c  \\)"}</MathJax>, 
        the Taylor Expansion of <MathJax inline>{"\\( f(x) \\)"}</MathJax> centered at <MathJax inline>{"\\( c \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= f(c) + f'(c)(x-c) + \\frac{f''(c)(x-c)^2}{2!} + \\frac{f'''(c)(x-c)^3}{3!} + \\cdots + \\frac{f^{(k)}(c)(x-c)^k}{k!} + \\cdots \\\\
            &= \\sum^{\\infty}_{k=0}\\frac{f^{(k)}(c)(x-c)^k}{k!}
            \\end{aligned}
          \\]`}
        </MathJax> 
        This gives us the following expressions for <MathJax inline>{"\\( e^x \\)"}</MathJax>, <MathJax inline>{"\\( \\sin(x) \\)"}</MathJax>, and <MathJax inline>{"\\( \\cos (x) \\)"}</MathJax>:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            e^x &= 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots \\\\
            \\sin (x) &= x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots \\\\
            \\cos (x) &= 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots \\\\
            \\end{aligned}
          \\]`}
        </MathJax>    
        Let's plug in <MathJax inline>{"\\( \\theta i \\)"}</MathJax> for <MathJax inline>{"\\( x \\)"}</MathJax> in our expression of <MathJax inline>{"\\( e^x \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            e^{\\theta i} &= 1 + \\theta i + \\frac{\\theta^2 i^2}{2!} + \\frac{\\theta^3 i^3}{3!} + \\dots \\\\
            \\end{aligned}
          \\]`}
        </MathJax> 
        Note that the exponents of <MathJax inline>{"\\( i \\)"}</MathJax> create the following repeating pattern:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            i^1 &= i \\\\
            i^2 &= -1 \\\\
            i^3 &= -i \\\\
            i^4 &= 1 \\\\
            &\\vdots
            \\end{aligned}
          \\]`}
        </MathJax> 
        Thus, we can group together the real and imaginary parts of our expression to get
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            e^{\\theta i} &= 1 + \\theta i - \\frac{\\theta^2}{2!} - \\frac{\\theta^3 i}{3!} + \\frac{\\theta^4}{4!} + \\frac{\\theta^5 i}{5!} - \\frac{\\theta^6}{6!} - \\frac{\\theta^7 i}{7!} + \\dots \\\\
            &= \\left(1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\frac{\\theta^6}{6!}  + \\right)  + i\\left(\\theta  - \\frac{\\theta^3}{3!} + \\frac{\\theta^5 }{5!} - \\frac{\\theta^7 }{7!} + \\dots \\right) \\\\
            &= \\cos (\\theta) + i \\sin (\\theta)
            \\end{aligned}
          \\]`}
        </MathJax> 
        In this way, we can think of an imaginary exponent in terms of trignometric functions. If we let <MathJax inline>{"\\( \\theta = \\pi \\)"}</MathJax>, we get Euler's Identity
        <MathJax className='math-container'>
          {`\\[
            e^{\\pi i} = -1
          \\]`}
        </MathJax>  
        </p>
        <p> 
        We'll use <MathJax inline>{"\\( e^{\\theta i} \\)"}</MathJax> a lot, so let's go over a few useful properties. Recall that since <MathJax inline>{"\\( \\sin(x) \\)"}</MathJax> is an odd function and <MathJax inline>{"\\( \\cos(x) \\)"}</MathJax> is an even function, we have 
        that <MathJax inline>{"\\( \\sin(-x) = -\\sin(x) \\)"}</MathJax> and <MathJax inline>{"\\( \\cos(-x) = \\cos(x) \\)"}</MathJax>. This gives us that 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            e^{\\theta i} - e^{-\\theta i} = \\cos (\\theta) + i \\sin (\\theta) - \\cos (-\\theta) -  i \\sin (-\\theta) = 2 i\\sin (\\theta) \\\\
            e^{\\theta i} + e^{-\\theta i} = \\cos (\\theta) + i \\sin (\\theta) + \\cos (-\\theta) +  i \\sin (-\\theta) = 2\\cos (\\theta)
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        </MathJaxContext>
        <PageNavigator group="Fourier"/>
        </div>
  );
}

export default Fourier1;