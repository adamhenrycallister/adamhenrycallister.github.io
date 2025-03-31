import React, { useState } from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../components/PageNavigator";
import GambleGraph from "./GambleGraph";
import ExampleBox from "../../components/ExampleBox";


function Risk1() {
  const [a, seta] = useState(0.51);  
  const xl = 20;
  const xh = 222;

  function getValue() {
    if ((a <= .012) && (a >= -.019)) {
    return (.5*((((xh - xl)/(Math.pow(xh, a) - Math.pow(xl, a)))*(Math.pow(119, a) - Math.pow(xh,a)) + xh)
    + (((xh - xl)/(Math.pow(xh, a) - Math.pow(xl, a)))*(Math.pow(123, a) - Math.pow(xh,a)) + xh)) - 120).toFixed(0);        
    } else {
    return (.5*((((xh - xl)/(Math.pow(xh, a-.01) - Math.pow(xl, a-.01)))*(Math.pow(119, a-.01) - Math.pow(xh,a-.01)) + xh)
    + (((xh - xl)/(Math.pow(xh, a-.01) - Math.pow(xl, a-.01)))*(Math.pow(123, a-.01) - Math.pow(xh,a-.01)) + xh)) - 120).toFixed(0);}
}

  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
        <p className='heading1'>Introduction</p>
        <MathJaxContext>
            <p className='heading2'>Comparing Gambles</p>
            <p>
            Suppose I offer you a gamble: We flip a coin. If it's heads, I pay you $3. If it's tails, you pay me $1. This might seem like 
            a good deal to you. The expected value of taking on this gamble, or the sum of the product of each outcome and its probability, is <MathJax inline>{"\\( \\frac{1}{2}(3) + \\frac{1}{2}(-1) = 1 \\)"}</MathJax>, which is positive. 
            Now suppose we change the gamble. Instead of paying you $3 for a heads, I offer $102 for a heads, but you must pay me $100 for a tails. Note that we have not changed the expected value of the gamble since <MathJax inline>{"\\( \\frac{1}{2}(102) + \\frac{1}{2}(-100) = 1 \\)"}</MathJax>. 
            However, the stakes of this second gamble feel very different from the first gamble. 
            </p>
            <p>
            If we simply compare the gambles based on their expected values, we get that we should equally prefer the two gambles. This doesn't seem right. Many people would likely accept the first gamble, while few would likely accept the second. 
            A more abstract way to compare these gambles would be to ask which gamble would make you better off, or which one would give you more utility. The idea here will be to take the dollar amounts from the gambles and transform them using a function we come up with that we think provides a better ranking of 
            how different payouts/losses actually increase/decrease our overall welfare. 
            </p>
            <p>
            Before we crossover into thinking about things in terms of utility, I should note that once we transform the dollar amounts, units become meaningless. The numbers that our utility function spits out have only relational value. 
            It does not matter if the utility of a dollar amount we put into our function is positive, negative, or zero. All we care about is whether the utility from one gamble is less or greater than the utility from another gamble. 
            </p>
            <p className='heading2'>Expected Utility</p>
            <p>
            So far, we've decided we want to construct some function <MathJax inline>{"\\( u(x) \\)"}</MathJax> that will take in dollar amounts (<MathJax inline>{"\\( x \\)"}</MathJax>) and give us back a number that tells us whether we like that dollar amount more or less than a different dollar amount. 
            Now, we need to think about what properties this function should have. First, we want this function to capture the idea that I always prefer more money over less money. Thus, for any two dollar amounts <MathJax inline>{"\\( \\$\\underline{x} \\)"}</MathJax> and <MathJax inline>{"\\( \\$\\bar x \\)"}</MathJax>, if <MathJax inline>{"\\( \\$\\underline{x} <  \\$\\bar x  \\)"}</MathJax>, 
            then <MathJax inline>{"\\( u(\\bar x) \\)"}</MathJax> should give us a number that is greater than <MathJax inline>{"\\(  u(\\underline{x}) \\)"}</MathJax>. We call this property of our function monotonicity. 
            </p>
            <p>
            At this point, you may be wondering what good the new ordering provided by our utility function will do for us. If we require our utility function to be monotonic, then it will simply tell us that we prefer a higher dollar amount over a lower dollar amount. 
            There is no new information to be gleaned from this type of utility comparison. Instead, we want our utility function to be useful when comparing different gambles, or when there is some outcome uncertainty involved. Rather than comparing gambles using their expected values, we'll compare gambles using 
            expected utilities. The expected utility of a gamble is the sum of the product of the utility from each outcome and the outcome's probability. In terms of the two gambles we're considering, the expected utility of the first is <MathJax inline>{"\\( \\frac{1}{2}u(3) + \\frac{1}{2}u(-1) \\)"}</MathJax>, and 
            the expected utility of the second is <MathJax inline>{"\\( \\frac{1}{2}u(102) + \\frac{1}{2}u(-100) \\)"}</MathJax>.
            </p>
            <p>
            Now, let's think about what the functional form of <MathJax inline>{"\\( u( x) \\)"}</MathJax> should look like. The simplist choice here would be to require <MathJax inline>{"\\( u( x) \\)"}</MathJax> to be linear, or take the form <MathJax inline>{"\\( u(x) = ax + b \\)"}</MathJax> for some constants <MathJax inline>{"\\( a \\)"}</MathJax> and <MathJax inline>{"\\( b \\)"}</MathJax>. 
            Let's see what this would do to the expected utility of our two gambles.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                \\frac{1}{2}u(3) + \\frac{1}{2}u(-1) &= \\frac{1}{2}(3a + b) + \\frac{1}{2}(-a + b) = a + b\\\\
                \\frac{1}{2}u(102) + \\frac{1}{2}u(-100) &= \\frac{1}{2}(102a + b) + \\frac{1}{2}(-100a + b) = a+b
                \\end{aligned}
              \\]`}
            </MathJax>   
            We haven't made much progress here&mdash;our expected utility comparison still tells us the two gambles should be equally preferred. More generally, we can show that any linear utility function will not change the ranking created by expected value comparisons. 
            </p>
            <p>
            To get a different expected utility for the two gambles, we need to introduce some curvature to our utility function. Let's graph a linear utility function as our baseline and consider what happens when we make the function more concave (n-shaped) or more convex (u-shaped). 
            To keep things simple, we'll use <MathJax inline>{"\\( u(x) =x \\)"}</MathJax> for our linear function, and we'll make sure the utilities from the second gamble stay the same as we add curvature (i.e., we impose <MathJax inline>{"\\( u(-100) = -100 \\)"}</MathJax> and <MathJax inline>{"\\( u(102) = 102 \\)"}</MathJax>). 
            Thus, the only thing that will change are the utilities from the first gamble: <MathJax inline>{"\\( u(-1) \\)"}</MathJax> and <MathJax inline>{"\\( u(3) \\)"}</MathJax>. 
            </p>
            <div className='graph-container'>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <GambleGraph a={a}/>
                <div className="input-bars">
                  <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
                    <button onClick={() => seta((prev) => Math.min(2.91, prev + .1))}>◀</button>
                    <span style={{ margin: "0 10px" }}>Concavity</span>
                    <button onClick={() => seta((prev) => Math.max(-.29, prev - .1))}>▶</button>                   
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <p>Gamble 1: <MathJax inline>{"\\( \\frac{1}{2}\\left(u(3) + u(-1)\\right) = \\)"}</MathJax>
                <span>{
                    getValue()
                }</span>
                </p>
                <p>Gamble 2: <MathJax inline>{"\\( \\frac{1}{2}\\left(u(102) + u(-100)\\right) = \\)"}</MathJax>
                <span>{
                    .5*(xl + xh) - 120
                }</span>
                </p>
              </div>
            </div>
            <p>
            Pay attention to how the expected utility of gamble 1 changes relative to the expected utility of gamble 2 as you increase or decrease concavity. 
            When we make the utility function concave (i.e., increase concavity until the red line is above the blue line), the expected utility of the first gamble is greater than the expected utility of the second gamble. 
            We say that a person whose preferences are represented by this type of utility function is risk averse. 
            When we make the utility function convex (i.e., decrease concavity until the red line is below the blue line), the expected utility of the first gamble is less than the expected utility of the second gamble. 
            We say that a person whose preference are represented by this type of utility function is risk seeking. 
            If we get rid of all curvature and consider linear utility, we say that the person is risk neutral. 
            </p>
            <p>
            So far, we've explored how the concept of utility can help us distinguish between gambles with the same expected value but different outcome distributions. We've also seen how risk averse behavior can be modeled by a concave utility function, and risk seeking behavior can be modeled by a convex utility function. 
            In the next section, we'll formalize this relationship between the curvature of the utility function and risk aversion. 
            </p>
          <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              Linear utility takes the form <MathJax inline>{"\\( u(z) = az + b\\)"}</MathJax>. We'll use this form to show that <MathJax inline>{"\\( E[u(\\tilde x)] - E[u(\\tilde y)] >0 \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                E[u(\\tilde x)] - E[u(\\tilde y)] &= E[a\\tilde x + b] - E[a\\tilde y + b] \\\\
                &= a\\left(E[\\tilde x] - E[\\tilde y]\\right) > 0
                \\end{aligned}
              \\]`}
            </MathJax> 
            We can show the general result using the same logic. Suppose we have an arbitrary utility function <MathJax inline>{"\\( u(z)\\)"}</MathJax> and two independent random variables <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y \\)"}</MathJax> with <MathJax inline>{"\\( E[u(\\tilde x)] >E[u(\\tilde y)] \\)"}</MathJax>. 
            An affine transformation of <MathJax inline>{"\\( u \\)"}</MathJax> simply means we plug <MathJax inline>{"\\( u \\)"}</MathJax> into a function of the form <MathJax inline>{"\\( f(z) = az + b \\)"}</MathJax>. 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                E[f(u(\\tilde x))] - E[f(u(\\tilde y))] &= E[a u(\\tilde x) + b] - E[a u(\\tilde y) + b] \\\\
                &= a\\left(E[u(\\tilde x)] - E[u(\\tilde y)]\\right) > 0
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> Given two independent random variables <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y \\)"}</MathJax>, show that, if <MathJax inline>{"\\( E[\\tilde x] > E[\\tilde y] \\)"}</MathJax>, then <MathJax inline>{"\\( E[u(\\tilde x)] > E[u(\\tilde y)] \\)"}</MathJax> for any linear utility function <MathJax inline>{"\\( u \\)"}</MathJax>. 
            In other words, show that linear utility yields the same preferences as an expected value comparison. More generally, show that any affine transformation of a utility function preserves the same preference ordering.</p>
          </ExampleBox>
        </MathJaxContext>
        <PageNavigator group="Risk"/>
        </div>
  );
}

export default Risk1;