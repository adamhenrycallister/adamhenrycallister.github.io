import React from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../components/PageNavigator";
import ExampleBox from "../../components/ExampleBox";

function Risk2() {
  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
            <p className='heading1'>Risk Aversion</p>
        	<MathJaxContext>
        	<p className='heading2'>Concavity</p>
            <p>
            	In the last section, we established that a concave utility function represents risk-averse preferences. 
            	Now we want to think about how to compare the amount of risk aversion implied by different utility functions. 
            	Our goal here will be to come up with a measure for risk aversion that increases with the concavity of the utility function and allows us to make meaningful comparisons across different utility functions.
            </p>
            <p>
            	Recall that the concavity of a function is measured by the function's second derivative. A negative second derivative implies a concave function, a zero second derivative implies a linear function, 
            	and a positive second derivative implies a convex function. Since we want our measure for risk aversion to increase as the function becomes more concave, we'll start by simply taking the negative of the second derivative.
            <MathJax className='math-container'>
              {`\\[
                -u''(x)
              \\]`}
            </MathJax> 
            </p>
            <p className='heading2'>Unique Preference Ordering</p>
            <p>
            It would be nice if our measure for risk aversion uniquely determined a preference ordering. In other words, for two utility functions <MathJax inline>{"\\( u_1 \\)"}</MathJax> and <MathJax inline>{"\\( u_2 \\)"}</MathJax>, and two gambles <MathJax inline>{"\\( \\tilde x\\)"}</MathJax> and <MathJax inline>{"\\( \\tilde y \\)"}</MathJax>, we want the property that if <MathJax inline>{"\\( u_1\\)"}</MathJax> and <MathJax inline>{"\\( u_2\\)"}</MathJax> have 
            the same risk aversion measure, then <MathJax inline>{"\\( E[u_1(\\tilde x)] > E[u_1(\\tilde y)]  \\implies E[u_2(\\tilde x)] > E[u_2(\\tilde y)] \\)"}</MathJax>. In other words, if I prefer gamble <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> under utility <MathJax inline>{"\\( u_1 \\)"}</MathJax> and <MathJax inline>{"\\( u_1 \\)"}</MathJax> has the same risk aversion measure as <MathJax inline>{"\\( u_2 \\)"}</MathJax>, then I must also prefer gamble <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> under utility <MathJax inline>{"\\( u_2 \\)"}</MathJax>. 
            What we have so far does not guarantee this property. To see this, consider the following utility functions:
            <MathJax className='math-container'>
              {`\\[
              	\\begin{aligned}
                &u_1(z) = \\sqrt{x} &u_2(z) &= \\sqrt{x} + x \\\\
                &u_1'(z) = \\frac{1}{2\\sqrt{x}} &u_2'(z) &= \\frac{1}{2\\sqrt{x}} + 1  \\\\
                &u_1''(z) = \\frac{-1}{4x^{3/2}}  &u_2''(z) &= \\frac{-1}{4x^{3/2}} 
                \\end{aligned}
              \\]`}
            </MathJax> 
            These functions have the same second derivative, but they do not create the same preference ordering. Consider two gambles: The first offers $1 with probability 1/4 and $4 with probability 3/4. The second offers $1 with probability 1/2, $4 with probability 7/24, and $9 with probability 5/24. 
            The expected utility of these gambles under the two different utility functions is
            <MathJax className='math-container'>
              {`\\[
              	\\begin{aligned}
                \\frac{1}{4}u_1(1) + \\frac{3}{4}u_1(4) = \\frac{1}{4}(1) + \\frac{3}{4}(2) = 1.75 \\\\
                \\frac{1}{2}u_1(1) + \\frac{7}{24}u_1(4) + \\frac{5}{24}u_1(9) = \\frac{1}{2}(1) + \\frac{7}{24}(2) + \\frac{5}{24}(3) \\approx 1.71 \\\\
                \\frac{1}{4}u_2(1) + \\frac{3}{4}u_2(4) = \\frac{1}{4}(1 + 1) + \\frac{3}{4}(2 + 4) = 5 \\\\
                \\frac{1}{2}u_2(1) + \\frac{7}{24}u_2(4) + \\frac{5}{24}u_2(9) = \\frac{1}{2}(1 + 1) + \\frac{7}{24}(2 + 4) + \\frac{5}{24}(3 + 9) = 5.25 \\\\              
                \\end{aligned}
              \\]`}
            </MathJax> 
            Since <MathJax inline>{"\\( 1.75 > 1.71 \\)"}</MathJax>, we prefer gamble 1 under utility <MathJax inline>{"\\( u_1 \\)"}</MathJax>. Since <MathJax inline>{"\\( 5 < 5.25 \\)"}</MathJax>, we prefer gamble 2 under utility <MathJax inline>{"\\( u_2 \\)"}</MathJax>. Although these two utility functions have the same second derivative, 
            the first derivative of <MathJax inline>{"\\( u_2 \\)"}</MathJax> is greater than the first derivative of <MathJax inline>{"\\( u_1 \\)"}</MathJax>. If we want a given risk-aversion value to pin down a unique preference ordering, our measure for risk aversion must be some function of the first derivative and the second derivative.
            <MathJax className='math-container'>
              {`\\[
              	f(u'(x), u''(x))
              \\]`}
            </MathJax> 
            </p>
            <p>
            What should this function look like? Recall from the previous section that any affine transformation of a utility function preserves the preference ordering. Given a utility function <MathJax inline>{"\\( u(x) \\)"}</MathJax>, this means that all functions of the form <MathJax inline>{"\\( au(x) + b \\)"}</MathJax> will create the same preference ordering as <MathJax inline>{"\\( u \\)"}</MathJax>. 
            Thus, to ensure that our risk aversion measure uniquely determines preference orderings, we want our function to produce the same value for any affine transformation of <MathJax inline>{"\\( u \\)"}</MathJax>. Put differently, we want 
            <MathJax className='math-container'>
              {`\\[
              	f(u'(x), u''(x)) = f(au'(x), au''(x))
              \\]`}
            </MathJax> 
            for any constant <MathJax inline>{"\\( a \\)"}</MathJax>. This implies that our risk aversion measure should be some ratio of the two derivatives.
            </p>
            <p className='heading2'>Risk Aversion Measures</p>
            <p>
            To this point, we've been thinking about gambles solely in terms of the payouts offered in the gamble itself. But, our willingness to take on a gamble might depend not only on the payouts in the gamble itself but also on how much money we already have. 
            If I only start out with $50, then a gamble promising $100 or -$50 with equal probability might seem riskier than if I start out with $1 million. In this way, the relavant measure for the expected utility of a gamble <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> given initial wealth <MathJax inline>{"\\( w \\)"}</MathJax> should be 
            <MathJax className='math-container'>
              {`\\[
              	E[u(w + \\tilde x)]
              \\]`}
            </MathJax>
            Thus, when we're measuring risk aversion, we want to know an individual's taste for risk given their initial wealth level. 
            </p>
            <p>
            Let's introduce two measures of risk aversion. Absolute risk aversion is measured as
            <MathJax className='math-container'>
              {`\\[
              	A(w) = -\\frac{u''(w)}{u'(w)}
              \\]`}
            </MathJax> 
            Relative risk aversion is measured as 
            <MathJax className='math-container'>
              {`\\[
              	\\lambda(w) = -w\\frac{u''(w)}{u'(w)}
              \\]`}
            </MathJax> 
            Notice that <MathJax inline>{"\\( \\lambda(w) = wA(w) \\)"}</MathJax>. 
                        To understand the difference between these measures, let's first create a utility function for each measure that ensures the measure remains constant over wealth levels. 
            </p>
            <p>
           	<strong>CARA Utility.</strong> For absolute risk aversion, we want to find a function that makes it so <MathJax inline>{"\\( A \\)"}</MathJax> does not depend on <MathJax inline>{"\\( w \\)"}</MathJax>. If we let <MathJax inline>{"\\( A \\)"}</MathJax> be a constant, we have
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
              	&A = -\\frac{u''(w)}{u'(w)} \\\\
              	\\Leftrightarrow &\\log(u'(w))' = -A
              	\\end{aligned}
              \\]`}
            </MathJax> 
            Now we can take the integral of both sides to get 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
              	&\\log(u'(w)) = -Aw + C_0 \\\\ 
              	\\Leftrightarrow &u'(w) = e^{-Aw + C_0}
              	\\end{aligned}
              \\]`}
            </MathJax>      
            We can integrate again to get
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				u(w) = \\frac{-e^{-Aw + C_0}}{A} + C_1
              	\\end{aligned}
              \\]`}
            </MathJax> 
            If we let <MathJax inline>{"\\( C_0 = 0 \\)"}</MathJax> and <MathJax inline>{"\\( C_1 = \\frac{1}{A} \\)"}</MathJax>, we get
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				u(w) = \\frac{1-e^{-Aw}}{A}
              	\\end{aligned}
              \\]`}
            </MathJax> 
            Note that the function is not defined if <MathJax inline>{"\\( A = 0 \\)"}</MathJax>. But, using L'Hôpital's rule, we have that 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				\\lim_{A \\to 0} \\frac{1-e^{-Aw}}{A} = \\lim_{A \\to 0} we^{-Aw} = w
              	\\end{aligned}
              \\]`}
            </MathJax> 
            Thus, we'll define our utility function with constant absolute risk aversion (CARA) as 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				u(w) = 
				\\begin{cases}
					\\frac{1-e^{-Aw}}{A} & \\text{if } A \\neq 0 \\\\
					w & \\text{if } A = 0 
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax>  
            </p>
          	<p>
          	<strong>CRRA Utility.</strong> Now let's do the same thing with relative risk aversion. If we let <MathJax inline>{"\\( \\lambda \\)"}</MathJax> be a constant, we have 
            <MathJax className='math-container'>
              {`\\[
              	\\begin{aligned}
              	\\lambda = -w\\frac{u''(w)}{u'(w)} \\\\
              	\\Leftrightarrow \\left(\\log(u'(w))\\right)' = \\frac{-\\lambda}{w}
              	\\end{aligned}
              \\]`}
            </MathJax> 
            Now we can take the integral of both sides to get 
            <MathJax className='math-container'>
              {`\\[
              	\\begin{aligned}
				\\log(u'(w)) = \\log\\left(w^{-\\lambda}\\right) + C_0 \\\\
				\\Leftrightarrow u'(w) = e^{C_0}w^{-\\lambda}
              	\\end{aligned}
              \\]`}
            </MathJax>    
            We can integrate again to get 
            <MathJax className='math-container'>
              {`\\[
				u(w) = \\frac{e^{C_0}w^{1-\\lambda}}{1-\\lambda} + C_1
              \\]`}
            </MathJax>         
            If we let <MathJax inline>{"\\( C_0 = 0 \\)"}</MathJax> and <MathJax inline>{"\\( C_1 =\\frac{-1}{1-\\lambda}\\)"}</MathJax>, we get 
            <MathJax className='math-container'>
              {`\\[
				u(w) = \\frac{w^{1-\\lambda} - 1}{1-\\lambda}
              \\]`}
            </MathJax> 
            Note that this function is not defined if <MathJax inline>{"\\( \\lambda = 1 \\)"}</MathJax>. But, using L'Hôpital's rule, we have that 
            <MathJax className='math-container'>
              {`\\[
				\\lim_{\\lambda \\to 1} \\frac{w^{1-\\lambda} - 1}{1-\\lambda} = \\log(w)
              \\]`}
            </MathJax> 
            Thus, we'll define our utility function with constant relative risk aversion (CRRA) as
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				u(w) = 
				\\begin{cases}
					\\frac{w^{1-\\lambda} - 1}{1-\\lambda} & \\text{if } \\lambda \\neq 1 \\\\
					\\log(w) & \\text{if } \\lambda = 1
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax>  
          	</p>
          	<p className='heading2'>Absolute vs. Relative Risk Aversion</p>
          	<p>
          	To compare our two measures of risk aversion, we need a way to convert utility back into dollar amounts. We can do this using a certainty equivalent. Think of a certainty equivalent as the amount of money 
          	you would be willing to pay to take on a specified gamble <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> given that your preferences follow some utility function <MathJax inline>{"\\( u \\)"}</MathJax> and you have starting wealth <MathJax inline>{"\\( w \\)"}</MathJax>. 
          	We can write this in the following way:
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				&E[u(w+\\tilde x)] = u(w + C) \\\\
				&\\Leftrightarrow C(w) = u^{-1}\\left(E\\left[u(w + \\tilde x)\\right]\\right) - w
              	\\end{aligned}
              \\]`}
            </MathJax>  
            where <MathJax inline>{"\\( C \\)"}</MathJax> is the certainty equivalent. Note that we can take the inverse of CARA utility to get
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				u^{-1}(w) = 
				\\begin{cases}
					\\frac{-\\log\\left(1-Aw\\right)}{A} & \\text{if } A \\neq 0 \\\\
					w & \\text{if } A = 0 
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax>      
            and the inverse of CRRA utility to get 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				u^{-1}(w) = 
				\\begin{cases}
					\\left(w(1-\\lambda) +1\\right)^{\\frac{1}{1-\\lambda}} & \\text{if } \\lambda \\neq 1 \\\\
					e^w & \\text{if } \\lambda = 1
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax>       
            Then, we can find the certainty equivalent under CARA utility as
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				C_A = 
				\\begin{cases}
					\\frac{-\\log\\left(E\\left[e^{-A\\tilde x}\\right]\\right)}{A} & \\text{if } A \\neq 0 \\\\
					E[\\tilde x] & \\text{if } A = 0 
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax> 
            and the certainty equivalent under CRRA utility as 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				C_{\\lambda}(w) = 
				\\begin{cases}
					\\left(E\\left[(w+\\tilde x)^{1-\\lambda}\\right]\\right)^{\\frac{1}{1 - \\lambda}} - w & \\text{if } \\lambda \\neq 1 \\\\
					e^{E[\\log(w+\\tilde x)]} - w & \\text{if } \\lambda = 1
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax> 
            Note that the certainty equivalent under CARA utility does not depend on wealth. This means someone with constant absolute risk aversion does not change their taste for risk as they get richer. In contrast, the certainty 
            equivalent under CRRA utility does depend on wealth. This means that someone with constant relative risk aversion might value the same gamble differently depending on whether they have a lot of initial wealth 
            or only a little initial wealth. 
            </p>
            <p>
            Now, instead of defining our certainty equivalent in dollar terms, let's think about a certainty equivalent in wealth-percentage terms. 
            First, we'll need to redefine our gamble. Before, we thought of a gamble as a distribution of possible dollar payouts. Now, we want to think of a gamble as a distribution of percentages by which our initial wealth could change. 
            For example, a gamble in this context could be a deal in which, with equal probability, you either get half of however much money you already have or you give up a fourth of however much money you already have. In this case, the certainty equivalent 
            is the percentage change in wealth that would give you the same utility as undertaking the gamble. This gives us 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				&E[u(w\\tilde x)] = u(wc) \\\\
				&\\Leftrightarrow c(w) = \\frac{u^{-1}\\left(E\\left[u(w \\tilde x)\\right]\\right)}{w} 
              	\\end{aligned}
              \\]`}
            </MathJax>  
            where <MathJax inline>{"\\( c \\)"}</MathJax> is the percentage-change certainty equivalent. The percentage-change certainty equivalent under CARA utility 
            is given by 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				c_A(w) = 
				\\begin{cases}
					\\frac{-\\log\\left(E\\left[e^{-Aw\\tilde x}\\right]\\right)}{Aw} & \\text{if } A \\neq 0 \\\\
					E[\\tilde x] & \\text{if } A = 0 
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax> 
            and the percentage-change certainty equivalent under CRRA utility is given by
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
				c_{\\lambda} = 
				\\begin{cases}
					\\left(E\\left[\\tilde x^{1-\\lambda}\\right]\\right)^{\\frac{1}{1-\\lambda}} & \\text{if } \\lambda \\neq 1 \\\\
					e^{E[\\log(\\tilde x)]} & \\text{if } \\lambda = 1
				\\end{cases}
              	\\end{aligned}
              \\]`}
            </MathJax> 
            Note that the percentage-change certainty equivalent under CRRA utility does not depend on wealth. This means that someone with constant relative risk aversion 
            does not change their preferences about wealth-percentage gambles as their wealth increases. For example, suppose I have $100, and I am indifferent between receiving $10 with certainty 
            or receiving $50 with probability 1/2. Now, suppose my wealth increases to $1,000,000. If I have constant relative risk aversion, I now must be indifferent between receiving $100,000 with certainty or 
            receiving $500,000 with probability 1/2. In contrast, the percentage-change certainty equivalent under CARA utility does depend on wealth. 
            </p>
          <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              <MathJax inline>{"\\( \\lambda_1(w) = \\lambda_2(w) \\)"}</MathJax> or <MathJax inline>{"\\( A_1(w) = A_2(w) \\)"}</MathJax> implies 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
              	&\\frac{u_1''(w)}{u_1'(w)} = \\frac{u_2''(w)}{u_2'(w)} \\\\
              	\\Leftrightarrow &\\log(u_1'(w))' = \\log(u_2'(w))'
              	\\end{aligned}
              \\]`}
            </MathJax> 
            Now, we can take an integral of both sides to get
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                &\\log(u_1'(w)) + C_0 = \\log(u_2'(w)) \\\\
                \\Leftrightarrow &u_1'(w)e^{C_0} = u_2'(w) \\\\
                \\Leftrightarrow &C_1u_1'(w) = u_2'(w)
                \\end{aligned}
              \\]`}
            </MathJax> 
            We can take another integral to get
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                &C_1u_1(w) + C_2 = u_2(w)
                \\end{aligned}
              \\]`}
            </MathJax> 
            Thus, <MathJax inline>{"\\( u_2 \\)"}</MathJax> is an affine transformation of <MathJax inline>{"\\( u_1 \\)"}</MathJax>.
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> Given two utility functions <MathJax inline>{"\\( u_1(w) \\)"}</MathJax> and <MathJax inline>{"\\( u_2(w) \\)"}</MathJax>, show that, if <MathJax inline>{"\\( u_1 \\)"}</MathJax> and <MathJax inline>{"\\( u_2 \\)"}</MathJax> have the same absolute or relative risk aversion, <MathJax inline>{"\\( u_2 \\)"}</MathJax> must be an affine transformation 
            of <MathJax inline>{"\\( u_1 \\)"}</MathJax>.
            </p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              Here, we consider the certainty equivalent for CARA utility and risk aversion <MathJax inline>{"\\( A = 0.02\\)"}</MathJax>.
	            <MathJax className='math-container'>
	              {`\\[
	                \\begin{aligned}
					C_A &= \\frac{-\\log\\left(E\\left[e^{-A\\tilde x}\\right]\\right)}{A} \\\\
					&= \\frac{-\\log\\left(\\frac{1}{3}\\left(e^{-0.02(500)} + e^{-0.02(250)} + e^{-0.02(0)} \\right)\\right)}{0.02} \\\\
					&\\approx $54.59
	              	\\end{aligned}
	              \\]`}
	            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> Suppose I have CARA utility with <MathJax inline>{"\\( A = 0.02\\)"}</MathJax>. How much would I be willing to pay for an investment that offers $500 with probability 1/3, $250 with probability 1/3, and $0 with probability 1/3? Assume 
            I have no other investment opportunities.
            </p>
          </ExampleBox>
            </MathJaxContext>
        <PageNavigator group="Risk"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/risk">Contents</NavLink></div>
        </div>
  );
}

export default Risk2;