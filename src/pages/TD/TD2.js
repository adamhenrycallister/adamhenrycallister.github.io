import React, { useState }  from 'react';
import './TimeDiscounting.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";
import ExampleBox from "../../components/ExampleBox";
import ContinuousCompounding from "./ContinuousCompounding";

function TD2() {
  const [r, setr] = useState(0.15);  
  const [n, setn] = useState(1);  
  return (
    	<div className='TimeDiscounting'>
    	<PageNavigator group="TD" />
    		<p className='heading1'>Compound Interest</p>
    	<MathJaxContext>
        <p className='heading2'>Preliminaries</p>
        <p>
        Suppose we know our discount rate, <MathJax inline>{"\\( r \\)"}</MathJax>, and we want to consider an investment promising a series of payouts over time. The net present value of the investment is 
        the amount we would be willing to pay to take on the investment today given our discount rate. Let's introduce some notation. We'll say that the value of our investment at time <MathJax inline>{"\\( t \\)"}</MathJax> is given 
        by <MathJax inline>{"\\( X_t \\)"}</MathJax>, with the initial value of the investment given by <MathJax inline>{"\\( X_0 \\)"}</MathJax>. We can find the initial value of an investment with a single payout at time <MathJax inline>{"\\( t=1 \\)"}</MathJax> as 
        <MathJax className='math-container'>
          {`\\[
            X_0 = \\frac{X_1}{(1 + r)}
          \\]`}
        </MathJax>
        Note that we can just as easily write this equation as 
        <MathJax className='math-container'>
          {`\\[
            X_1 = X_0(1 + r)
          \\]`}
        </MathJax>   
        When we know what the future payout of the investment is (<MathJax inline>{"\\( X_1 \\)"}</MathJax>) and want to find the initial value (<MathJax inline>{"\\( X_0 \\)"}</MathJax>), we talk about the problem in terms of a discount rate. 
        When we know what the initial price is (<MathJax inline>{"\\( X_0 \\)"}</MathJax>) and want to find the future value (<MathJax inline>{"\\( X_1 \\)"}</MathJax>), we talk about the problem in terms of an interest rate. 
        As we derive pricing equations, we'll use whichever paradigm is most convenient, but be aware that we can always rewrite the equation in terms of a different <MathJax inline>{"\\( X_t \\)"}</MathJax>.
        </p>
        <p>
        Note that our time periods can be measured in any unit we want. To keep things consistent, we simply require that <MathJax inline>{"\\( r \\)"}</MathJax> be the discount/interest rate that applies to a single period of time. For example, if our time periods are in months, and we have only the yearly interest rate, <MathJax inline>{"\\( r_y \\)"}</MathJax>, 
        we must calculate the monthly interest rate <MathJax inline>{"\\( r = \\frac{r_y}{12} \\)"}</MathJax> to use in our equations.
        </p>
        <p>
        A final note before we begin: It might be tempting to simply memorize the different equations for each setting without thinking through how each equation is derived. However, gaining an understanding of how to think through the process of creating an equation to match a given setting will make your 
        understanding more robust to variations in notation, variable definitions, and setup. 
        </p>
    	<p className='heading2'>No Compounding</p>
        <p>
        We begin by considering the future value of an investment with a per period interest rate <MathJax inline>{"\\( r \\)"}</MathJax>, when the investment is never compounded. This simply means that interest is only ever applied once, at the end of the investment period. 
        For an investment with an initial value of <MathJax inline>{"\\( X_0 \\)"}</MathJax> that ends at period <MathJax inline>{"\\( t \\)"}</MathJax>, the value of the investment at period <MathJax inline>{"\\( t \\)"}</MathJax> is 
        <MathJax className='math-container'>
          {`\\[
            X_t = X_0(1 + rt)
          \\]`}
        </MathJax> 
        All we've done here is adjust the interest rate from <MathJax inline>{"\\( r \\)"}</MathJax> to <MathJax inline>{"\\( rt \\)"}</MathJax> to account for the fact that we are possibly waiting more than one period for the investment to end. 
        </p>
        <p className='heading2'>Compounding Every Period</p>
        <p>
        Now, we consider an investment with interest that compounds every period. In other words, each time we reach a new period, we add in the interest that the investment accrued in the previous period to the value of the investment before we go on to the next period. 
        After one period, such an investment has a value of 
        <MathJax className='math-container'>
          {`\\[
            X_1 = X_0(1 + r)
          \\]`}
        </MathJax> 
        After two periods, the value becomes
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            X_2 &= X_1(1 + r) \\\\
            &= \\left(X_0(1+r)\\right)(1 + r) \\\\
            &= X_1(1+r)^2
            \\end{aligned}
          \\]`}
        </MathJax>  
        After <MathJax inline>{"\\( t \\)"}</MathJax> periods, the value becomes 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            X_t &= X_{t-1}(1 + r) \\\\
            &= \\left(X_{t-2}(1+r)\\right)(1 + r) \\\\
            &= \\left(X_{t-3}(1+r)\\right)(1 + r)^2 \\\\
            &\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\vdots \\\\
            &= \\left(X_0(1+r)\\right)(1+r)^{t-1} \\\\
            &= X_0(1+r)^t
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Compounding <MathJax inline>{"\\( n \\)"}</MathJax> Times Per Period</p>
        <p>
        At this point, we'll introduce a small addition to our notation. We'll add another subscript to our <MathJax inline>{"\\( X \\)"}</MathJax>'s to denote how many 
        times per period interest is compounding. Thus, <MathJax inline>{"\\( X_{n,t} \\)"}</MathJax> gives the value of the investment at period <MathJax inline>{"\\( t \\)"}</MathJax> when 
        interest is compounding <MathJax inline>{"\\( n \\)"}</MathJax> times per period. Note that <MathJax inline>{"\\( X_0 \\)"}</MathJax> does not change depending on how many 
        times interest is compounded per period. We'll save some excess notation by simply writing <MathJax inline>{"\\( X_0 = X_{n,0} \\)"}</MathJax>. 
        </p>
        <p>
        Suppose we compound twice per period: once in the middle of the period and once at the end of the period. 
        After one period, our investment has a value of 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            X_{2,1} &= \\left(X_0\\left(1+\\frac{r}{2}\\right)\\right)\\left(1+\\frac{r}{2}\\right) \\\\
            &= X_0\\left(1 + \\frac{r}{2}\\right)^2
            \\end{aligned}
          \\]`}
        </MathJax> 
        After <MathJax inline>{"\\( t \\)"}</MathJax> periods, the value becomes
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            X_{2,t} &= X_{2, t-1}\\left(1 + \\frac{r}{2}\\right)^2 \\\\
            &= \\left(X_{2, t-2}\\left(1 + \\frac{r}{2}\\right)^2\\right)\\left(1 + \\frac{r}{2}\\right)^{2*2} \\\\
            &= \\left(X_{2, t-3}\\left(1 + \\frac{r}{2}\\right)^2\\right)\\left(1 + \\frac{r}{2}\\right)^{2*3} \\\\
            &\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\vdots \\\\
            &= \\left(X_0\\left(1 + \\frac{r}{2}\\right)^2\\right)\\left(1 + \\frac{r}{2}\\right)^{2(t-1)} \\\\
            &= X_0\\left(1 + \\frac{r}{2}\\right)^{2t}
            \\end{aligned}
          \\]`}
        </MathJax> 
        Now, suppose we compound <MathJax inline>{"\\( n \\)"}</MathJax> times per period. 
        After one period, our investment has a value of 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            X_{n,1} &= X_0\\overbrace{\\left(1+\\frac{r}{n}\\right)\\left(1+\\frac{r}{n}\\right) \\cdots \\left(1+\\frac{r}{n}\\right)}^{n} \\\\
            &= X_0\\left(1 + \\frac{r}{n}\\right)^n
            \\end{aligned}
          \\]`}
        </MathJax> 
        After <MathJax inline>{"\\( t \\)"}</MathJax> periods, the value becomes
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            X_{n,t} &= X_{n,t-1}\\left(1 + \\frac{r}{n}\\right)^n \\\\
            &= \\left(X_{n, t-2}\\left(1 + \\frac{r}{n}\\right)^n\\right)\\left(1 + \\frac{r}{n}\\right)^{2n} \\\\
            &= \\left(X_{n,t-3}\\left(1 + \\frac{r}{n}\\right)^n\\right)\\left(1 + \\frac{r}{n}\\right)^{3n} \\\\
            &\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\vdots \\\\
            &= \\left(X_0\\left(1 + \\frac{r}{n}\\right)^n\\right)\\left(1 + \\frac{r}{n}\\right)^{n(t-1)} \\\\
            &= X_0\\left(1 + \\frac{r}{n}\\right)^{nt}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        Another way to get this equation is to do a change of variables using our once-per-period compounding equation. Here, we'll try to come up with a new time varible <MathJax inline>{"\\( \\tau \\)"}</MathJax> and 
        a new interest rate variable <MathJax inline>{"\\( r_{\\tau} \\)"}</MathJax> such that 
        <MathJax className='math-container'>
          {`\\[
            X_{\\tau} = X_0(1+r_{\\tau})^{\\tau}
          \\]`}
        </MathJax>
        Instead of having one period in which we compound <MathJax inline>{"\\( n \\)"}</MathJax> times, we'll now have <MathJax inline>{"\\( n \\)"}</MathJax> periods in which we compound once each. This gives 
        us <MathJax inline>{"\\( \\tau = nt \\)"}</MathJax>. If we change our time units, we also have to change the interest rate variable to get <MathJax inline>{"\\( r_{\\tau} = \\frac{r}{n} \\)"}</MathJax>.
        </p>
        <p className='heading2'>Continuous Compounding</p>
        <p>
        Now we consider what happens to our pricing equation as the number of times we compound each period approaches infinity, or <MathJax inline>{"\\( \\underset{n \\to \\infty}{\\lim} X_{n,t}\\)"}</MathJax>. 
        </p>
        <p>
        First, let's transform our equation for <MathJax inline>{"\\( X_{n,t}\\)"}</MathJax> into something that will be easier to take the limit of. We'll start by taking the natural log of both sides 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\log \\left(X_{n,t}\\right) &= \\log\\left(X_0\\left(1 + \\frac{r}{n}\\right)^{nt} \\right) \\\\
            &= \\log\\left(X_0\\right)  + \\log\\left(\\left(1 + \\frac{r}{n}\\right)^{nt}\\right) \\\\
            &= \\log\\left(X_0\\right)  + nt\\log\\left(1 + \\frac{r}{n}\\right) \\\\
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        Now, let's come up with another way of writing the function <MathJax inline>{"\\( f(x) = \\log\\left(1 + x\\right)\\)"}</MathJax>. To do this, we'll 
        take the Taylor Expansion of the function centered around zero. For a function, <MathJax inline>{"\\( f(x) \\)"}</MathJax>, that is infinitely differentiable at some value <MathJax inline>{"\\( c  \\)"}</MathJax>, 
        the Taylor Expansion of <MathJax inline>{"\\( f(x) \\)"}</MathJax> centered at <MathJax inline>{"\\( c \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f(x) &= f(c) + f'(c)(x-c) + \\frac{f''(c)(x-c)^2}{2!} + \\frac{f'''(c)(x-c)^3}{3!} + \\cdots + \\frac{f^{(k)}(c)(x-c)^k}{k!} + \\cdots \\\\
            &= \\sum^{\\infty}_{k=0}\\frac{f^{(k)}(c)(x-c)^k}{k!}
            \\end{aligned}
          \\]`}
        </MathJax> 
        In our case, we have the following derivatives of <MathJax inline>{"\\( f(x) = \\log\\left(1 + x\\right)\\)"}</MathJax>:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            f'(x) &=  (1+x)^{-1} \\\\
            f''(x) &= -(1+x)^{-2} \\\\
            f'''(x) &= 2(1+x)^{-3} \\\\
            f^{(4)}(x) &= -(2\\times3)(1+x)^{-4} \\\\
            \\;\\;\\;\\;\\;\\;\\;\\vdots \\\\
            f^{(k)}(x) &= (-1)^{k+1}(1+x)^{-k}(k-1)! \\\\
            \\Leftrightarrow f^{(k)}(0) &= (-1)^{k+1}(k-1)!
            \\end{aligned}
          \\]`}
        </MathJax> 
        Then, if we center at zero, we can write <MathJax inline>{"\\( f(x) = \\log\\left(1 + x\\right)\\)"}</MathJax> as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\log\\left(1 + x\\right) &= \\log(1) + \\sum^{\\infty}_{k=1}\\frac{(-1)^{k+1}x^k(k-1)!}{k!}  \\\\
            &= \\sum^{\\infty}_{k=1}\\frac{(-1)^{k+1}x^k}{k} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        Plugging in <MathJax inline>{"\\( x = \\frac{r}{n}\\)"}</MathJax>, we can rewrite our transformed equation as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\log \\left(X_{n,t}\\right) &= \\log\\left(X_0\\right)  + nt\\sum^{\\infty}_{k=1}\\frac{(-1)^{k+1}\\left(\\frac{r}{n}\\right)^k}{k}  \\\\
            &= \\log\\left(X_0\\right) + t\\left(r + \\sum^{\\infty}_{k=1}\\frac{(-1)^{k}\\frac{r^{k+1}}{n^k}}{k+1}\\right)
            \\end{aligned}
          \\]`}
        </MathJax> 
        Now, if we take the limit of both sides, we get 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\underset{n \\to \\infty}{\\lim} \\log \\left(X_{n,t}\\right) &= \\log\\left(X_0\\right) + t\\left(r + \\underset{n \\to \\infty}{\\lim} \\sum^{\\infty}_{k=1}\\frac{(-1)^{k}\\frac{r^{k+1}}{n^k}}{k+1}\\right) \\\\
            &= \\log\\left(X_0\\right) + rt
            \\end{aligned}
          \\]`}
        </MathJax> 
        If we denote the value of the investment at time <MathJax inline>{"\\( t \\)"}</MathJax> with continuously compounding interest as <MathJax inline>{"\\( X_{c,t}\\)"}</MathJax>, then we can solve for <MathJax inline>{"\\( X_{c,t}\\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &\\log \\left(X_{c,t}\\right) = \\log\\left(X_0\\right) + rt \\\\
            &\\Leftrightarrow  \\log \\left(\\frac{X_{c,t}}{X_0}\\right) = rt \\\\
            &\\Leftrightarrow  \\frac{X_{c,t}}{X_0} = e^{rt} \\\\
            &\\Leftrightarrow  X_{c,t} = X_0e^{rt} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        The graph below plots the growth of an investment with an initial value of <MathJax inline>{"\\( X_0 = 10 \\)"}</MathJax>. The blue line shows growth when interest is compounded <MathJax inline>{"\\( n \\)"}</MathJax> times per period, and 
        the dotted red line shows growth when interest is continuously compounded. Note that as you increase <MathJax inline>{"\\( n \\)"}</MathJax>, the blue line approaches the dotted red line. 
        </p>
        <div className='graph-container'>
        <ContinuousCompounding r={r} n={n}/>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                
                <div className="input-bars">
                  <label>
                    <MathJax inline>{"\\( n \\)"}</MathJax> (# of times compounded per period)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
                    <button onClick={() => setn((prev) => Math.max(1, prev - 1))}>◀</button>
                    <span style={{ margin: "0 10px" }}>{n}</span>
                    <button onClick={() => setn((prev) => Math.min(50, prev + 1))}>▶</button>
                  </div>
                </div>

                <div className="input-bars">
                  <label>
                    <MathJax inline>{"\\( r \\)"}</MathJax> (discount rate)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", paddingTop: "2px" }}>
                    <button onClick={() => setr((prev) => Math.max(0, prev - 0.01))}>◀</button>
                    <span style={{ margin: "0 10px" }}>{r.toFixed(2)}</span>
                    <button onClick={() => setr((prev) => Math.min(1, prev + 0.01))}>▶</button>
                  </div>
                </div>
              </div>
        </div>
        <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              Using our equation for compounding multiple times per period, we have <MathJax inline>{"\\( X_0 = 100 \\)"}</MathJax>, <MathJax inline>{"\\( r = .05 \\)"}</MathJax>, <MathJax inline>{"\\( n = 4 \\)"}</MathJax>, 
              and <MathJax inline>{"\\( t = 5 \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                X_{4,5} &= 100\\left(1 + \\frac{.05}{4}\\right)^{4*5}  \\\\
                &\\approx $128.20
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> I invest $100 in a fund that guarantees a 5% annual interest rate compounded quarterly. How much is my investment worth in 5 years?</p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              We'll start with our equation for compounding every period.
            <MathJax className='math-container'>
              {`\\[
                X_t = X_0(1 + r)^t
              \\]`}
            </MathJax> 
            Now, in this case, we know <MathJax inline>{"\\( X_t \\)"}</MathJax> and we want <MathJax inline>{"\\( X_0 \\)"}</MathJax>. So, we'll rearrange things to get 
            <MathJax className='math-container'>
              {`\\[
                X_0 = \\frac{X_t}{(1 + r)^t}
              \\]`}
            </MathJax> 
            Now we recognize that <MathJax inline>{"\\( X_{10} = 100 \\)"}</MathJax>, <MathJax inline>{"\\( t = 10 \\)"}</MathJax>, and <MathJax inline>{"\\( r = .03 \\)"}</MathJax>.
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                X_0 &= \\frac{100}{(1 + .03)^{10}} \\\\
                &\\approx $74.41
                \\end{aligned}
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> What is the net present value of an investment that pays out $100 in 10 years given an annual discount rate of 3% that compounds yearly?</p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              First, let's consider what this would look like if we compounded every two periods. On the second period, we would have 
            <MathJax className='math-container'>
              {`\\[
                X_2 = X_0(1+2r)
              \\]`}
            </MathJax> 
            On the fourth period, we would have 
            <MathJax className='math-container'>
              {`\\[
                X_4 = X_0(1+2r)^2
              \\]`}
            </MathJax> 
            On the <MathJax inline>{"\\( 2t^{\\text{th}} \\)"}</MathJax> period, we would have
            <MathJax className='math-container'>
              {`\\[
                X_{2t} = X_0(1+2r)^t
              \\]`}
            </MathJax> 
            Now, if we consider compounding every <MathJax inline>{"\\( m \\)"}</MathJax> periods, this becomes
            <MathJax className='math-container'>
              {`\\[
                X_{mt} = X_0(1+ mr)^t
              \\]`}
            </MathJax> 
              </p>
            </>
          }>
            <p><strong>Example 3:</strong> Find an equation for the value of an investment at time <MathJax inline>{"\\( mt \\)"}</MathJax> that compounds every <MathJax inline>{"\\( m \\)"}</MathJax> periods. 
            Assume the interest rate <MathJax inline>{"\\( r \\)"}</MathJax> is in terms of a single period.</p>
          </ExampleBox>
    	</MathJaxContext>
    	<PageNavigator group="TD"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/time_discounting">Contents</NavLink></div>
        </div>
  );
}

export default TD2;