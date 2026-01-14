import React, { useState } from 'react';
import './Stats.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import CatanBoard from "./CatanBoard";
import ExampleBox from "../../../components/ExampleBox";


function Stats2() {
  return (
        <div className='Stats'>
        <PageNavigator group="Stats" />
        <p className='heading1'>Multiple Random Variables</p>
        <MathJaxContext>
        <p className='heading2'>Placing a Settlement Revisted</p>
        <p>
        In the last section, we considered the decision of where to place a settlement by calculating the mean and variance of the resources produced by a given spot. 
        The expected value measures long-run productivity: on average, settlements with higher expected yield will generate more resources over the course of the game.
        The variance, however, captures how those resources arrive. A higher variance indicates boom–bust production, with many empty turns punctuated by occasional large gains, while a lower variance corresponds to steadier, more reliable income.
        </p>
        <p>
        Spots with a higher mean production should generally be preferred to spots with a lower mean production. The variance might also matter because players typically need resources in specific combinations and at specific times. Consistent production makes it easier to plan builds, trade efficiently, and avoid being stalled one resource short, whereas volatile production can lead to both rapid progress and prolonged droughts.
        </p>
        <p>
        Suppose we've already placed one settlement (marked by the red X), and we are considering where to place a second settlement (in one of the spots with a blue circle).
        </p>
        <div style={{display: "flex", justifyContent: "center", margin: "-80px"}}>
          <CatanBoard
            numbers={[
              5, 2, 6,
              3, 8, 10, 9,
              12, 11, 4, 4, 10,
              9, 3, 6,
              5, 8, 11
            ]}
            settlements={[
              { tile: 17, type: "x" },
              { tile: 8, type: "circle" },
              { tile: 5, type: "circle" }
            ]}
          />
        </div>
        <p>
        Both choices have the same expected resource production <MathJax inline>{"\\( \\left(\\frac{9}{36} = \\frac{1}{4}\\right)\\)"}</MathJax>. How would adding each spot affect our overall variance?
        </p>
        <p className='heading2'>Expected Value</p>
        <p>
        Before we try to evaluate the effect on total variance, we need to revist the expected value operator for multiple random variables. Recall that with a single random variable, 
        we could multiply the random variable by a constant or add a constant to the random variable and simply move in the expected value operator around the random-variable portion of the function <MathJax inline>{"\\( \\left(E[A \\tilde x + B] = A E[\\tilde x] + B\\right) \\)"}</MathJax>. 
        But, when taking the power of a random variable, we can't move the expected value operator in around the base <MathJax inline>{"\\( \\left( E[\\tilde x^A] \\neq \\left( E[\\tilde x] \\right)^A \\right) \\)"}</MathJax>.
        </p>
        <p>
        There are similar rules when dealing with functions of more than one random variable. Suppose we have two random variables: <MathJax inline>{"\\( \\tilde y\\)"}</MathJax> and <MathJax inline>{"\\( \\tilde z\\)"}</MathJax>. In this case, we can distribute the expected value operator into a sum, but not a product. Thus, for constants <MathJax inline>{"\\( A \\)"}</MathJax>, <MathJax inline>{"\\( B \\)"}</MathJax>, and <MathJax inline>{"\\( C \\)"}</MathJax> we have 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E\\left[A\\tilde y + B\\tilde z + C \\right] = AE[\\tilde y] + BE[\\tilde z] + C  
            \\end{aligned}
          \\]`}
        </MathJax>   
        but, in general,
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E[\\tilde y \\tilde z] \\neq E[\\tilde y]E[ \\tilde z] 
            \\end{aligned}
          \\]`}
        </MathJax>    
        </p>
        <p className='heading2'>Covariance</p>
        <p>
        Returning to the question of picking a second settlement spot, let's think about each spot as a random variable. We'll call the spot where we already have a settlement <MathJax inline>{"\\( \\tilde x\\)"}</MathJax> (surrounded by 3, 6, and 11; marked by the red X) and the two choices <MathJax inline>{"\\( \\tilde y_1\\)"}</MathJax> (for 2, 6, and 10) and <MathJax inline>{"\\( \\tilde y_2\\)"}</MathJax> (for 3, 8, and 11).
        Using the formula for variance, we can find the total variance from two spots.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var}(\\tilde x + \\tilde y) &= E\\left[(\\tilde x + \\tilde y)^2\\right] - \\left(E[\\tilde x + \\tilde y]\\right)^2 \\\\
            &= E\\left[\\tilde x^2 + 2\\tilde x\\tilde y + \\tilde y^2\\right] - \\left(E[\\tilde x] + E[\\tilde y]\\right)^2 \\\\
            &= E\\left[\\tilde x^2\\right] + 2E[\\tilde x\\tilde y] + \\tilde E\\left[y^2\\right] - \\left(E[\\tilde x]\\right)^2 -2E[\\tilde x]E[\\tilde y] - \\left(E[\\tilde y]\\right)^2 \\\\
            &= E\\left[\\tilde x^2\\right] - \\left(E[\\tilde x]\\right)^2 + \\tilde E\\left[y^2\\right] - \\left(E[\\tilde y]\\right)^2 + 2\\left(E[\\tilde x\\tilde y]  -E[\\tilde x]E[\\tilde y] \\right)
            \\end{aligned}
          \\]`}
        </MathJax> 
        We can recognize <MathJax inline>{"\\( E\\left[\\tilde x^2\\right] - \\left(E[\\tilde x]\\right)^2 \\)"}</MathJax> and <MathJax inline>{"\\( E\\left[\\tilde y^2\\right] - \\left(E[\\tilde y]\\right)^2 \\)"}</MathJax> as simply the variance of <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y \\)"}</MathJax> respectively. But 
        what about the <MathJax inline>{"\\( E[\\tilde x\\tilde y]  -E[\\tilde x]E[\\tilde y]  \\)"}</MathJax> term? We call this expression the covariance of <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y \\)"}</MathJax>. Thus, we can write the total variance as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var}(\\tilde x + \\tilde y) = \\text{var}(\\tilde x) + \\text{var}(\\tilde y) + 2\\text{cov}(\\tilde x, \\tilde y)
            \\end{aligned}
          \\]`}
        </MathJax> 
        where
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{cov}(\\tilde x, \\tilde y) &= E[\\tilde x \\tilde y] - E[\\tilde x]E[\\tilde y] \\\\
            &= E[\\tilde x \\tilde y] - E[\\tilde x]E[\\tilde y] - E[\\tilde x]E[\\tilde y] + E[\\tilde x]E[\\tilde y] \\\\
            &= E\\left[\\tilde x \\tilde y - \\tilde y E[\\tilde x] - \\tilde xE[\\tilde y] + E[\\tilde x]E[\\tilde y]\\right] \\\\
            &= E\\left[\\left(\\tilde x - E[\\tilde x]\\right)\\left(\\tilde y - E[\\tilde y]\\right)\\right]
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        In the example we're considering, covariance measures whether two sources of resource production tend to be active on the same turns. 
        If two settlements tend to produce resources at the same time, then their production is positively correlated. 
        In this case, good turns are very good, but bad turns are very bad. 
        If, instead, one settlement often produces on turns when the other does not, then their production is less synchronized. 
        Poor production from one settlement is partially offset by production from the other, leading to a steadier total income.
        In other words, covariance captures whether settlements "rise and fall together." 
        High covariance means your fortunes swing together; low covariance means one settlement can smooth out the other.
        </p>
        <p>
        All three settlement locations have the same production variance.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var}(\\tilde x) = \\text{var}(\\tilde y_1)  = \\text{var}(\\tilde y_2)  =\\left(1 - \\frac{1}{4}\\right)^2\\left(\\frac{9}{36}\\right) + \\left(0 - \\frac{1}{4}\\right)^2\\left(\\frac{36-9}{36}\\right) = 0.1875
            \\end{aligned}
          \\]`}
        </MathJax> 
        However, <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y_1 \\)"}</MathJax> do not have the same covariance as <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y_2 \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{cov}(\\tilde x, \\tilde y_1) =&\\; 
            \\overbrace{\\left(1 - \\frac{1}{4}\\right)\\left(1 - \\frac{1}{4}\\right) \\left(\\frac{5}{36}\\right)}^{\\text{if 6 is rolled}} \\\\
             &+ \\overbrace{\\left(1 - \\frac{1}{4}\\right)\\left(0 - \\frac{1}{4}\\right) \\left(\\frac{1 + 2 + 3 + 2}{36}\\right)}^{\\text{if 2, 3, 10, or 11 is rolled}} \\\\
             &+ \\overbrace{\\left(0 - \\frac{1}{4}\\right)\\left(0 - \\frac{1}{4}\\right) \\left(\\frac{36 - (5 + 1 + 2 + 3 + 2)}{36}\\right)}^{\\text{if another number is rolled}} \\\\
             \\approx&\\; 0.0764 \\\\ \\\\
            \\text{cov}(\\tilde x, \\tilde y_2) =&\\; 
            \\overbrace{\\left(1 - \\frac{1}{4}\\right)\\left(1 - \\frac{1}{4}\\right) \\left(\\frac{2 + 2}{36}\\right)}^{\\text{if 3 or 11 are rolled}} \\\\
             &+ \\overbrace{\\left(1 - \\frac{1}{4}\\right)\\left(0 - \\frac{1}{4}\\right) \\left(\\frac{5 + 5}{36}\\right)}^{\\text{if 6 or 8 are rolled}} \\\\
             &+ \\overbrace{\\left(0 - \\frac{1}{4}\\right)\\left(0 - \\frac{1}{4}\\right) \\left(\\frac{36 - (2 + 2 + 5 + 5)}{36}\\right)}^{\\text{if another number is rolled}} \\\\
             \\approx&\\; 0.0486
            \\end{aligned}
          \\]`}
        </MathJax>    
        Thus, the total variance from choosing the first spot is 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var}(\\tilde x + \\tilde y_1) &= \\text{var}(\\tilde x) + \\text{var}(\\tilde y_1) + 2\\text{cov}(\\tilde x, \\tilde y_1) \\\\
            &\\approx 2(0.1875) + 2(0.0764) \\\\
            &\\approx 0.451
            \\end{aligned}
          \\]`}
        </MathJax>  
        and the total variance from choosing the second spot is 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var}(\\tilde x + \\tilde y_2) &= \\text{var}(\\tilde x) + \\text{var}(\\tilde y_2) + 2\\text{cov}(\\tilde x, \\tilde y_2) \\\\
            &\\approx 2(0.1875) + 2(0.0486) \\\\
            &\\approx 0.424
            \\end{aligned}
          \\]`}
        </MathJax>  
        </p>
        <p className='heading2'>Correlation</p>
        <p>
        Covariance tells us whether two settlements tend to produce on the same turns, but its magnitude is hard to interpret on its own. 
        A covariance of 0.05 might be large or small depending on how variable each settlement is individually. 
        In particular, settlements with higher variance tend to have larger covariances, even if the underlying relationship is similar.
        </p>
        <p>
        To make comparisons easier, it is helpful to standardize resource production so that each settlement is measured in comparable units. 
        Rather than asking how two settlements co-move in absolute terms, we ask how they move relative to their own typical fluctuations.
        </p>
        <p>
        The correlation coefficient between two random variables is obtained by dividing their covariance by the product of their standard deviations. 
        This rescales covariance so that it is dimensionless and always lies between -1 and 1. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{corr}(\\tilde x, \\tilde y) &= \\frac{\\text{cov}(\\tilde x, \\tilde y)}{\\sqrt{\\text{var}(\\tilde x) \\text{var}(\\tilde y)}}
            \\end{aligned}
          \\]`}
        </MathJax>  
        Covariance tells us whether two settlements move together; correlation tells us how strongly they move together, after accounting for how volatile each one is on its own.
        </p>
        <p>
        In our example, we have the following correlation coefficients:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{corr}(\\tilde x, \\tilde y_1) &= \\frac{\\text{cov}(\\tilde x, \\tilde y_1)}{\\sqrt{\\text{var}(\\tilde x) \\text{var}(\\tilde y_1)}} \\\\
            &\\approx \\frac{0.0764}{0.1875} \\\\
            &\\approx 0.407 \\\\ \\\\
            \\text{corr}(\\tilde x, \\tilde y_2) &= \\frac{\\text{cov}(\\tilde x, \\tilde y_2)}{\\sqrt{\\text{var}(\\tilde x) \\text{var}(\\tilde y_2)}} \\\\
            &\\approx \\frac{0.0486}{0.1875} \\\\
            &\\approx 0.259
            \\end{aligned}
          \\]`}
        </MathJax>  
        </p>
        <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              Both gambles have an expected value of $0.50, and variance 
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\left(1 - \\frac{1}{2}\\right)^2\\left(\\frac{1}{2}\\right) + \\left(0 - \\frac{1}{2}\\right)^2\\left(\\frac{1}{2}\\right) = \\frac{1}{4}
                  \\end{aligned}
                \\]`}
              </MathJax>
              The covariance is given by 
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\left(1 - \\frac{1}{4}\\right)\\left(\\frac{1}{3}\\right) + \\left(0 - \\frac{1}{4}\\right)\\left(\\frac{2}{3}\\right) = \\frac{1}{12}
                  \\end{aligned}
                \\]`}
              </MathJax>
              The correlation is given by
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\frac{\\frac{1}{12}}{\\sqrt{\\left(\\frac{1}{4}\\right)\\left(\\frac{1}{4}\\right)}} = \\frac{1}{3}
                  \\end{aligned}
                \\]`}
              </MathJax>
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> What is the correlation between a gamble that pays $1 if a dice rolls an even number and a gamble that pays $1 if a dice rolls a 4 or higher?</p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              First note that all 3 investment opportunities have the same expected value ($1). We'll denote the outcome of investment 1 as <MathJax inline>{"\\( \\tilde x_1 \\)"}</MathJax>, 
              the outcome of investment 2 as <MathJax inline>{"\\( \\tilde x_2 \\)"}</MathJax>, and the outcome of investment 3 as <MathJax inline>{"\\( \\tilde x_3 \\)"}</MathJax>. We'll invest  
              a <MathJax inline>{"\\(  w_1 \\)"}</MathJax> portion of the money in investment 1, a <MathJax inline>{"\\(  w_2 \\)"}</MathJax> portion in investment 2, and a <MathJax inline>{"\\(  w_3 \\)"}</MathJax> portion in investment 3. 
              Here, we have that <MathJax inline>{"\\(  w_1 + w_2 + w_3 = 1\\)"}</MathJax>.
              </p>
              <p>
              The total variance is given by 
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\text{var}(w_1\\tilde x_1 + w_2\\tilde x_2 + w_2\\tilde x_2) =&\\; E\\left[(w_1\\tilde x_1 + w_2\\tilde x_2 + w_2\\tilde x_2)^2\\right] - \\left(E\\left[w_1\\tilde x_1 + w_2\\tilde x_2 + w_2\\tilde x_2\\right]\\right)^2 \\\\
                  =&\\; w_1^2E[\\tilde x_1^2] + w_2^2E[\\tilde x_2^2] + w_3^2E[\\tilde x_3^2] + 2w_1w_2E[\\tilde x_1\\tilde x_2] + 2w_1w_3E[\\tilde x_1\\tilde x_3] + 2w_2w_3E[\\tilde x_2\\tilde x_3] \\\\
                  &-\\left(w_1^2\\left(E[\\tilde x_1]\\right)^2 + w_2^2\\left(E[\\tilde x_2]\\right)^2 + w_3^2\\left(E[\\tilde x_3]\\right)^2 + 2w_1w_2E[\\tilde x_1]E[\\tilde x_2] + 2w_1w_3E[\\tilde x_1]E[\\tilde x_3] + 2w_2w_3E[\\tilde x_2]E[\\tilde x_3]\\right) \\\\
                  =&\\; w_1^2 \\text{var}(\\tilde x_1) + w_2^2 \\text{var}(\\tilde x_2) + w_3^2 \\text{var}(\\tilde x_3) + 2w_1w_2\\text{cov}(\\tilde x_1, \\tilde x_2) + 2w_1w_3\\text{cov}(\\tilde x_1, \\tilde x_3) + 2w_2w_3\\text{cov}(\\tilde x_2, \\tilde x_3)
                  \\end{aligned}
                \\]`}
              </MathJax>
              </p>
              <p>
              We want to choose investment weights to minimize this variance.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\underset{w_1,w_2,w_3}{\\text{min}} \\; &\\left(w_1^2 \\text{var}(\\tilde x_1) + w_2^2 \\text{var}(\\tilde x_2) + w_3^2 \\text{var}(\\tilde x_3) + 2w_1w_2\\text{cov}(\\tilde x_1, \\tilde x_2) + 2w_1w_3\\text{cov}(\\tilde x_1, \\tilde x_3) + 2w_2w_3\\text{cov}(\\tilde x_2, \\tilde x_3) \\right) \\\\
                  &\\text{s.t. } w_3 = 1 - w_1 - w_2
                  \\end{aligned}
                \\]`}
              </MathJax>
              We can plug in the constraint to get rid of <MathJax inline>{"\\(  w_3 \\)"}</MathJax>.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\underset{w_1,w_2}{\\text{min}} \\; \\left(w_1^2 \\text{var}(\\tilde x_1) + w_2^2 \\text{var}(\\tilde x_2) + (1 - w_1 - w_2)^2 \\text{var}(\\tilde x_3) + 2w_1w_2\\text{cov}(\\tilde x_1, \\tilde x_2) + 2w_1(1 - w_1 - w_2)\\text{cov}(\\tilde x_1, \\tilde x_3) + 2w_2(1 - w_1 - w_2)\\text{cov}(\\tilde x_2, \\tilde x_3) \\right) 
                  \\end{aligned}
                \\]`}
              </MathJax>
              To find a minimum, we take derivatives with respect to <MathJax inline>{"\\(  w_1 \\)"}</MathJax> and <MathJax inline>{"\\(  w_2 \\)"}</MathJax> and set them equal to zero.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  2w_1 \\text{var}(\\tilde x_1) - 2(1-w_1-w_2)\\text{var}(\\tilde x_3) + 2w_2\\text{cov}(\\tilde x_1, \\tilde x_2) + 2(1 - 2w_1 - w_2)\\text{cov}(\\tilde x_1, \\tilde x_3) - 2w_2\\text{cov}(\\tilde x_2, \\tilde x_3) = 0 \\\\
                  2w_2 \\text{var}(\\tilde x_2) - 2(1-w_1-w_2)\\text{var}(\\tilde x_3) + 2w_1\\text{cov}(\\tilde x_1, \\tilde x_2) + 2(1 - 2w_2 - w_1)\\text{cov}(\\tilde x_2, \\tilde x_3) - 2w_1\\text{cov}(\\tilde x_1, \\tilde x_3) = 0
                  \\end{aligned}
                \\]`}
              </MathJax>
              We have two equations and two unknowns.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  w_1\\underbrace{[\\text{var}(\\tilde x_1) + \\text{var}(\\tilde x_3) - 2\\text{cov}(\\tilde x_1, \\tilde x_3)]}_{A_1} + w_2\\underbrace{[\\text{var}(\\tilde x_3)  + \\text{cov}(\\tilde x_1, \\tilde x_2) - \\text{cov}(\\tilde x_1, \\tilde x_3) - \\text{cov}(\\tilde x_2, \\tilde x_3)]}_{B} + \\underbrace{\\text{cov}(\\tilde x_1, \\tilde x_3) - \\text{var}(\\tilde x_3)}_{C_1} = 0 \\\\
                  w_2\\underbrace{[\\text{var}(\\tilde x_2) + \\text{var}(\\tilde x_3) - 2\\text{cov}(\\tilde x_2, \\tilde x_3)]}_{A_2} + w_1\\underbrace{[\\text{var}(\\tilde x_3)  + \\text{cov}(\\tilde x_1, \\tilde x_2)  - \\text{cov}(\\tilde x_1, \\tilde x_3) - \\text{cov}(\\tilde x_2, \\tilde x_3)]}_{B} + \\underbrace{\\text{cov}(\\tilde x_2, \\tilde x_3)- \\text{var}(\\tilde x_3)}_{C_2}  = 0 
                  \\end{aligned}
                \\]`}
              </MathJax>
              Using these equations we can solve for our weights in terms of <MathJax inline>{"\\(  A_1 \\)"}</MathJax>, <MathJax inline>{"\\(  A_2 \\)"}</MathJax>, <MathJax inline>{"\\(  B \\)"}</MathJax>, <MathJax inline>{"\\(  C_1 \\)"}</MathJax>, and <MathJax inline>{"\\(  C_2 \\)"}</MathJax>.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  w_1 &= \\frac{A_2C_1 - BC_2}{B^2 - A_1A_2} \\\\
                  w_2 &= \\frac{A_1C_2 - BC_1}{B^2 - A_1A_2} \\\\
                  w_3 &= 1 - w_1 - w_2
                  \\end{aligned}
                \\]`}
              </MathJax>
              </p>
              <p>
              Now, we can solve for our variances and covariances.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\text{var}(\\tilde x_1) &= (4 - 1)^2\\left(\\frac{1}{4}\\right) + (0 - 1)^2\\left(\\frac{3}{4}\\right) =  3\\\\
                  \\text{var}(\\tilde x_2) &= (2 - 1)^2\\left(\\frac{1}{2}\\right) + (0 - 1)^2\\left(\\frac{1}{2}\\right) = 1\\\\
                  \\text{var}(\\tilde x_3) &= (0 - 1)^2\\left(\\frac{1}{4}\\right) + (2 - 1)^2\\left(\\frac{1}{4}\\right) = \\frac{1}{2} \\\\ \\\\
                  \\text{cov}(\\tilde x_1, \\tilde x_2) &= (4-1)(0-1)\\frac{1}{4} + (0-1)(2-1)\\frac{1}{4} + (0-1)(0-1)\\frac{1}{4} + (0-1)(2-1)\\frac{1}{4} = -1 \\\\
                  \\text{cov}(\\tilde x_1, \\tilde x_3) &= (4-1)(1-1)\\frac{1}{4} + (0-1)(0-1)\\frac{1}{4} + (0-1)(1-1)\\frac{1}{4} + (0-1)(2-1)\\frac{1}{4} = 0 \\\\
                  \\text{cov}(\\tilde x_2, \\tilde x_3) &= (0-1)(1-1)\\frac{1}{4} + (2-1)(0-1)\\frac{1}{4} + (0-1)(1-1)\\frac{1}{4} + (2-1)(2-1)\\frac{1}{4} = 0
                  \\end{aligned}
                \\]`}
              </MathJax>    
              Using these variances and covariances, we can solve for <MathJax inline>{"\\(  A_1 \\)"}</MathJax>, <MathJax inline>{"\\(  A_2 \\)"}</MathJax>, <MathJax inline>{"\\(  B \\)"}</MathJax>, <MathJax inline>{"\\(  C_1 \\)"}</MathJax>, and <MathJax inline>{"\\(  C_2 \\)"}</MathJax>.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  A_1 &= \\text{var}(\\tilde x_1) + \\text{var}(\\tilde x_3) - 2\\text{cov}(\\tilde x_1, \\tilde x_3) = \\frac{7}{2} \\\\
                  A_2 &= \\text{var}(\\tilde x_2) + \\text{var}(\\tilde x_3) - 2\\text{cov}(\\tilde x_2, \\tilde x_3) = \\frac{3}{2} \\\\
                  B &= \\text{var}(\\tilde x_3)  + \\text{cov}(\\tilde x_1, \\tilde x_2) - \\text{cov}(\\tilde x_1, \\tilde x_3) - \\text{cov}(\\tilde x_2, \\tilde x_3) = - \\frac{1}{2}\\\\
                  C_1 &= \\text{cov}(\\tilde x_1, \\tilde x_3) - \\text{var}(\\tilde x_3) =  - \\frac{1}{2} \\\\
                  C_2 &= \\text{cov}(\\tilde x_2, \\tilde x_3)- \\text{var}(\\tilde x_3) = - \\frac{1}{2}
                  \\end{aligned}
                \\]`}
              </MathJax>
              Finally, we can solve for the weights.
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  w_1 = \\frac{1}{5} \\qquad
                  w_2 = \\frac{2}{5} \\qquad
                  w_3 = \\frac{2}{5}
                  \\end{aligned}
                \\]`}
              </MathJax>
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> Suppose you have a set amount of money to put in 3 different investment opportunities. The investment opportunities have the following payoffs according to which of 4 equally likely states of the world occurs in the future:</p>
            <div className="table-wrapper">
              <table className="my-table">
                <thead>
                  <tr>
                    <th className="table-entry-head">State</th>
                    <th className="table-entry-head">Probability</th>
                    <th className="table-entry-head">Investment 1</th>
                    <th className="table-entry-head">Investment 2</th>
                    <th className="table-entry-head">Investment 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 1 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{1}{4} \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 1 \\)"}</MathJax></td>
                  </tr>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{1}{4} \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
                  </tr>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 3 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{1}{4} \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 1 \\)"}</MathJax></td>
                  </tr>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{1}{4} \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p>You must invest the whole amount of money. Each investment has the same initial cost, and you can purchase fractional shares. What fraction of the money should you invest in each investment opportunity to achieve the lowest variance?</p>
          </ExampleBox>
        </MathJaxContext>
      <PageNavigator group="Stats"/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/stats">Contents</NavLink></div>
        </div>
  );
}
export default Stats2;