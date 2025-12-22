import React, { useState } from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
// import ExampleBox from "../../../components/ExampleBox";


function Risk5() {
  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
        <p className='heading1'>The Capital Asset Pricing Model (CAPM)</p>
        <MathJaxContext>
        <p>
        The Capital Asset Pricing Model (CAPM) is one of the central models in modern financial economics. 
        It provides a simple, quantitative relationship between the expected return of an asset and the risk 
        that asset contributes to a well-diversified portfolio.
        </p>

        <p>
        The key insight of the CAPM is that investors should only be compensated for systematic risk, 
        or risk that cannot be eliminated through diversification. Risk that is unique to a single asset can be 
        diversified away and therefore does not command a risk premium in equilibrium.
        </p>

        <p>
        The CAPM expresses this idea through the following equation:
        </p>

        <MathJax className='math-container'>
        {`\\[
        E[R_k] = R_f + \\beta_k\\left(E[R_m] - R_f\\right)
        \\]`}
        </MathJax>

        <p>
        Here, <MathJax inline>{"\\(R_f\\)"}</MathJax> is the risk-free rate, <MathJax inline>{"\\(E[R_m]\\)"}</MathJax> is the expected return on the market portfolio, 
        and <MathJax inline>{"\\(\\beta_k\\)"}</MathJax> measures how sensitive asset <MathJax inline>{"\\(k\\)"}</MathJax> is to movements in the overall market. The remainder of this page derives this relationship from basic 
        mean–variance portfolio choice and explains its economic interpretation.
        </p>
        <p className='heading2'>CAPM Assumptions</p>
        <p>
        The CAPM relies on few strong assumptions about investor behavior and market structure. These assumptions allow us to 
        move from individual portfolio choice to market-wide asset pricing.
        </p>

        <ul>
          <li>
            <strong>Mean–variance optimization:</strong> Investors care only about the expected return and variance 
            of their portfolios and choose portfolios that minimize variance for a given expected return.
          </li>
          <li>
            <strong>Homogeneous beliefs:</strong> All investors agree on expected returns, variances, and covariances 
            of asset returns.
          </li>
          <li>
            <strong>Single-period horizon:</strong> Investors make portfolio decisions over the same investment horizon.
          </li>
          <li>
            <strong>Risk-free borrowing and lending:</strong> Investors can borrow and lend unlimited amounts at the 
            same risk-free rate <MathJax inline>{"\\(R_f\\)"}</MathJax>.
          </li>
          <li>
            <strong>Perfect markets:</strong> There are no taxes, transaction costs, or short-selling constraints, 
            and assets are perfectly divisible.
          </li>
        </ul>

        <p>
        Under these assumptions, all investors face the same optimization problem and therefore choose the same 
        optimal risky portfolio. In equilibrium, this portfolio must coincide with the market portfolio.
        </p>

        <p className='heading2'>Optimal Portfolio</p>
        <p>
        To derive the CAPM, we'll start by finding the optimal portfolio within the same "many assets" setup that we considered on the previous page. Namely, we'll suppose there are <MathJax inline>{"\\( N \\)"}</MathJax> assets with returns <MathJax inline>{"\\(  R_1, R_2, \\dots,  R_N \\)"}</MathJax>.
         We can construct a portfolio by assigning a weight to each asset <MathJax inline>{"\\( w_1, w_2, \\dots, w_N \\)"}</MathJax> such that 
        all the weights add up to one <MathJax inline>{"\\(\\left(\\sum^N_{i=1}w_i = 1\\right)  \\)"}</MathJax>. Recall that the expected return and variance of such a portfolio are given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             E[R_p]
            &= \\sum^N_{i=1}w_i E[R_i] \\\\ \\\\
            \\text{var}(R_p) 
            &= \\sum^N_{i=1}\\sum^N_{j=1}w_iw_j\\text{cov}(R_i,R_j) 
            \\end{aligned}
          \\]`}
        </MathJax> 
        We'll choose our desired expected return <MathJax inline>{"\\( \\bar R \\)"}</MathJax> and construct a portfolio that will give us the minimum variance for that return. 
        Thus, we want to solve the following optimization problem:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\underset{\\{w_1,...,w_N\\}}{\\text{min}} &\\text{var}(R_p) \\\\
            \\text{s.t. } &\\sum^N_{i=1}w_iE[R_i]  = \\bar R \\\\
            & \\sum^N_{i=1}w_i = 1
            \\end{aligned}
          \\]`}
        </MathJax> 
        Here, we want to find the least amount of variance for our chosen expected return <MathJax inline>{"\\( \\bar R \\)"}</MathJax> by deciding how much to invest in each asset (the weights <MathJax inline>{"\\( w_1,w_2,\\dots,w_N \\)"}</MathJax>). We can deal with the constraints by using a Lagrangian with multipliers <MathJax inline>{"\\( \\lambda \\)"}</MathJax> and <MathJax inline>{"\\( \\gamma \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            L &= \\text{var}(R_p) - \\lambda \\left(\\sum^N_{i=1}w_iE [R_i]  - \\bar R\\right) - \\gamma\\left(\\sum^N_{i=1}w_i - 1\\right) \\\\
            &= \\sum^N_{i=1}\\sum^N_{j=1}w_iw_j\\text{cov}(R_i,R_j) - \\lambda \\left(\\sum^N_{i=1}w_iE[R_i]  - \\bar R\\right) - \\gamma\\left(\\sum^N_{i=1}w_i - 1\\right) 
            \\end{aligned}
          \\]`}
        </MathJax> 
        The derivative of the Lagrangian with respect to a single weight <MathJax inline>{"\\( w_k \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\frac{\\partial L}{\\partial w_k} &= 2\\sum^N_{i=1}w_i\\text{cov}(R_k,R_i) - \\lambda E[R_k] - \\gamma \\\\
            &= 2\\text{cov}\\left(R_k,\\sum^N_{i=1}w_iR_i\\right) - \\lambda E[R_k] - \\gamma \\\\
            &= 2\\text{cov}(R_k, R_p) - \\lambda E[R_k] - \\gamma 
            \\end{aligned}
          \\]`}
        </MathJax> 
        We solve for the optimal weight by setting this derivative equal to zero.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\frac{\\partial L}{\\partial w_k} = 2\\text{cov}(R_k, R_p) - \\lambda E[R_k] - \\gamma  = 0 \\quad\\quad\\quad \\text{(1)}
            \\end{aligned}
          \\]`}
        </MathJax> 
        This holds not only for a single weight but for all weights. Thus, we have the following series of equations to satisfy:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            2\\text{cov}(R_1, R_p) - \\lambda E[R_1] - \\gamma  &= 0 \\\\
            2\\text{cov}(R_2, R_p) - \\lambda E[R_2] - \\gamma  &= 0 \\\\
            &\\vdots \\\\
            2\\text{cov}(R_N, R_p) - \\lambda E[R_N] - \\gamma  &= 0
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p> 
        <p>
        We're going to use two tricks to get rid of the Lagrange multipliers (<MathJax inline>{"\\(\\lambda \\)"}</MathJax> and <MathJax inline>{"\\(\\gamma \\)"}</MathJax>). 
        First, we're going to multiply each equation by its weight and sum up all the equations. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &2w_1\\text{cov}(R_1, R_p) - \\lambda w_1  E[R_1] - \\gamma w_1 \\\\
            + &2w_2\\text{cov}(R_2, R_p) - \\lambda w_2 E[R_2] - \\gamma w_2 \\\\
            &\\;\\;\\vdots \\\\
            + &2w_N\\text{cov}(R_N, R_p) - \\lambda w_N E[R_N] - \\gamma w_N = 0
            \\end{aligned} 
          \\]`}
        </MathJax> 
        We'll use the resulting equation to solve for <MathJax inline>{"\\(\\gamma \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             &2\\sum^N_{k=1}w_k\\text{cov}(R_k, R_p) - \\lambda \\sum^N_{k=1}w_k E[R_k] - \\gamma \\sum^N_{k=1}w_k = 0 \\\\
             &\\Leftrightarrow 2\\text{cov}\\left(\\sum^N_{k=1}w_k R_k, R_p\\right) - \\lambda \\bar R- \\gamma = 0  \\\\
             &\\Leftrightarrow 2\\text{cov}(R_p, R_p) - \\lambda \\bar R- \\gamma = 0  \\\\
             &\\Leftrightarrow 2\\text{var}(R_p) - \\lambda \\bar R- \\gamma = 0 \\\\
             &\\Leftrightarrow \\gamma = 2\\text{var}(R_p) - \\lambda \\bar R \\quad\\quad\\quad\\quad\\quad\\quad\\quad\\quad\\quad\\quad\\quad\\quad   \\text{(2)}
            \\end{aligned}
          \\]`}
        </MathJax> 
        Now, we plug in our expression for <MathJax inline>{"\\(\\gamma \\)"}</MathJax> (given by equation 2) to equation 1. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &2\\text{cov}(R_k, R_p) - \\lambda E[R_k] - \\left(2\\text{var}(R_p) - \\lambda \\bar R\\right)  = 0 \\\\
            &\\Leftrightarrow \\text{cov}(R_k, R_p) - \\text{var}(R_p) = \\frac{\\lambda}{2}\\left(E[R_k] - \\bar R\\right) \\quad\\quad\\quad \\text{(3)}
            \\end{aligned} 
          \\]`}
        </MathJax> 
        Our second trick is to apply equation 3 to a risk-free asset with return <MathJax inline>{"\\(R_f \\)"}</MathJax>. In this case, the covariance term will go away and leave us with 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &\\text{cov}(R_f, R_p) - \\text{var}(R_p) = \\frac{\\lambda}{2}(R_f - \\bar R) \\\\
            &\\Leftrightarrow \\lambda = \\frac{2\\text{var}(R_p)}{\\bar R - R_f} \\quad\\quad\\quad\\quad\\quad\\quad\\quad\\quad\\quad \\text{(4)}
            \\end{aligned}
          \\]`}
        </MathJax> 
        Now, we plug in our expression for <MathJax inline>{"\\(\\lambda \\)"}</MathJax> (given by equation 4) to equation 3. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &\\text{cov}(R_k, R_p) - \\text{var}(R_p) = \\frac{\\left(\\frac{2\\text{var}(R_p)}{\\bar R - R_f}\\right)}{2}\\left(E[R_k]- \\bar R\\right) \\\\
            &\\Leftrightarrow \\text{cov}(R_k, R_p)  = \\text{var}(R_p)\\left(\\frac{E[R_k] - \\bar R}{\\bar R - R_f}  + 1\\right) \\\\
            &\\Leftrightarrow \\frac{\\text{cov}(R_k, R_p)}{\\text{var}(R_p)} = \\frac{E[R_k] - R_f}{\\bar R - R_f} \\\\
            &\\Leftrightarrow E[R_k] - R_f = \\frac{\\text{cov}(R_k, R_p)}{\\text{var}(R_p)}(\\bar R - R_f) \\quad\\quad\\quad\\quad\\quad (5)
            \\end{aligned}
          \\]`}
        </MathJax>
        Equation 5 relates the difference between an individual asset's expected return and the risk-free rate <MathJax inline>{"\\( \\left(E[R_k]- R_f\\right) \\)"}</MathJax>, or the asset's "excess return," to the difference between the target expected return and the risk-free rate <MathJax inline>{"\\( (\\bar R- R_f) \\)"}</MathJax>. 
        </p> 
        <p className='heading2'>Market Portfolio</p>
        <p>
        What can we say about the optimal portfolio we've constructed? Because it offers the minimum variance for a given target expected return, this portfolio must lie along the efficient frontier. 
        Because of two-fund separation, we also know the portfolio must lie along the capital market line, or consist of some linear combination of the risk-free asset and the tangency portfolio. 
        Thus, we can write the portfolio return as <MathJax inline>{"\\( R_p = \\alpha R_m  + (1-\\alpha)R_f\\)"}</MathJax> where <MathJax inline>{"\\( \\alpha \\)"}</MathJax> is the proportion invested in the tangency portfolio (with return <MathJax inline>{"\\( R_m \\)"}</MathJax>) and <MathJax inline>{"\\( (1-\\alpha) \\)"}</MathJax> is the proportion invested in the risk-free asset. 
        Plugging this in to equation 5 gives us 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E[R_k] - R_f &= \\frac{\\text{cov}(R_k, \\alpha R_m  + (1-\\alpha)R_f)}{\\text{var}(\\alpha R_m  + (1-\\alpha)R_f)}\\left(\\alpha E[R_m]  + (1-\\alpha)R_f - R_f\\right) \\\\
            &= \\frac{\\alpha \\text{cov}(R_k, R_m)}{\\alpha^2 \\text{var}( R_m)}\\alpha\\left( E[R_m]  - R_f \\right)  \\\\
            &= \\frac{\\text{cov}(R_k, R_m)}{\\text{var}( R_m)}\\left( E[R_m]  - R_f \\right) 
            \\end{aligned}
          \\]`}
        </MathJax>
        If all investors are mean-variance optimizers and have the same beliefs about expected returns, variances, and covariances, then the tangency portfolio should reflect actual investment in the market. In this case, <MathJax inline>{"\\( R_m \\)"}</MathJax> is 
        the overall return on all assets in the market, or the return on the "market portfolio." 
        </p>
        <p>
        In this way, the CAPM creates a theoretical relationship between any asset's excess return and the overall return of all assets in the market. 
        The <MathJax inline>{"\\( \\frac{\\text{cov}(R_k, R_m)}{\\text{var}( R_m)} \\)"}</MathJax> portion of the CAPM equation is called the asset's beta. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E[R_k] - R_f 
            &= \\frac{\\text{cov}(R_k, R_m)}{\\text{var}( R_m)}\\left( E[R_m]  - R_f \\right)  \\\\
            &= \\beta_k\\left( E[R_m]  - R_f \\right)  
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>
        <p className='heading2'>Beta</p>
        <p>
        To gain some intuition about how different assets are priced under the CAPM, let's rewrite beta in terms of the correlation coefficient between the individual asset and the market portfolio.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\beta_k =  \\frac{\\text{cov}(R_k, R_m)}{\\text{var}( R_m)} = \\frac{\\rho_{k,m}\\sqrt{\\text{var}(R_k)\\text{var}(R_m)}}{\\text{var}(R_m)} = \\rho_{k,m}\\frac{\\sigma_k}{\\sigma_m}
            \\end{aligned}
          \\]`}
        </MathJax>
        Here, <MathJax inline>{"\\( \\rho_{k,m} \\)"}</MathJax> is the correlation between the asset and the market portfolio and <MathJax inline>{"\\( \\sigma_k\\)"}</MathJax> and <MathJax inline>{"\\( \\sigma_m\\)"}</MathJax> are the standard deviations of the asset and the market portfolio respectively. 
        Beta increases as the correlation between the asset and the market portfolio increases. What does this mean for the price of the asset? 
        </p>
        <p>
        Let's consider the current purchase price of an asset with no dividends (<MathJax inline>{"\\( P_{k,B}\\)"}</MathJax>) given an uncertain future sale price <MathJax inline>{"\\( P_{k,S}\\)"}</MathJax>. We can plug in <MathJax inline>{"\\( R_k = \\frac{P_{k,S} - P_{k,B}}{P_{k,B}}\\)"}</MathJax> to the CAPM equation 
        and solve for this purchase price in terms of the asset's beta. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &E\\left[\\frac{P_{k,S} - P_{k,B}}{P_{k,B}}\\right] - R_f = \\beta_k\\left( E[R_m]  - R_f \\right)  \\\\
            &\\Leftrightarrow P_{k,B} = \\frac{E[P_{k,S}]}{\\beta_k\\left(E[R_m] - R_f\\right) + (1+R_f)} \\qquad\\qquad (6)
            \\end{aligned}
          \\]`}
        </MathJax> 
        Equation 6 shows that the price of an asset decreases as the asset's beta increases. The intuition here is that assets that are more correlated with the market portfolio require a higher return than assets that are not as correlated with the market portfolio. To create a higher return for an asset that is more correlated with the market portfolio, the asset's current price must be lower than the price of a comparable asset with a lower market correlation. 
        </p>
        <p className='heading2'>Diversifiable vs. Systematic Risk</p>
        <p>
        One of the most important implications of the CAPM is its distinction between diversifiable risk and 
        systematic (or market) risk.
        </p>

        <p>
        Diversifiable risk refers to risk that is specific to an individual asset, such as firm-specific shocks, 
        management decisions, or idiosyncratic events. Because these risks are largely uncorrelated across assets, 
        they can be reduced or eliminated by holding a sufficiently diversified portfolio.
        </p>

        <p>
        Systematic risk, on the other hand, reflects economy-wide fluctuations that affect many assets at once. 
        This type of risk cannot be diversified away and is captured by an asset’s covariance with the market portfolio.
        </p>

        <p>
        The CAPM shows that only systematic risk is priced. An asset’s expected excess return depends not on its 
        own variance, but on how much it co-moves with the market:
        </p>

        <MathJax className='math-container'>
        {`\\[
        E[R_k] - R_f = \\beta_k\\left(E[R_m] - R_f\\right)
        \\]`}
        </MathJax>

        <p>
        An asset with a high variance but little correlation with the market may have a low beta and therefore 
        require only a modest risk premium. Conversely, an asset that closely tracks market movements will have 
        a high beta and must offer a higher expected return to compensate investors.
        </p>

        <p>
        In this sense, beta measures an asset’s contribution to the risk of a well-diversified portfolio, which 
        is the risk that investors actually care about in equilibrium.
        </p>

        <p className='heading2'>Capital Market Line and Security Market Line</p>

        <p>
        On the previous page, we introduced the capital market line (CML), which describes the set of 
        efficient portfolios available to investors when a risk-free asset is available.
        </p>

        <p>
        The CML gives the expected return of any efficient portfolio as a function of its total risk 
        (measured by standard deviation):
        </p>

        <MathJax className='math-container'>
        {`\\[
        E[R_p] = R_f + \\frac{E[R_m] - R_f}{\\sigma_m}\\,\\sigma_p
        \\]`}
        </MathJax>

        <p>
        Every portfolio on the capital market line is a linear combination of the risk-free asset and the 
        market (tangency) portfolio. Importantly, the CML applies <em>only</em> to efficient portfolios.
        </p>

        <p>
        The Capital Asset Pricing Model answers a different question: how should <em>individual assets</em> be priced 
        in equilibrium? This leads to a different relationship, known as the security market line (SML).
        </p>

        <p>
        The SML relates an asset’s expected return to its systematic risk, measured by beta:
        </p>

        <MathJax className='math-container'>
        {`\\[
        E[R_k] = R_f + \\beta_k\\left(E[R_m] - R_f\\right)
        \\]`}
        </MathJax>

        <p>
        While the CML uses total risk (<MathJax inline>{"\\(\\sigma_p\\)"}</MathJax>), the SML uses systematic risk 
        (<MathJax inline>{"\\(\\beta_k\\)"}</MathJax>). This difference reflects the fact that individual assets are 
        not necessarily efficient on their own, and that idiosyncratic risk can be diversified away.
        </p>

        <p>
        In equilibrium, all correctly priced assets and portfolios—efficient or not—must lie on the security 
        market line. Only efficient portfolios lie on the capital market line.
        </p>

        </MathJaxContext>
        <PageNavigator group="Risk"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/risk">Contents</NavLink></div>
        </div>
  );
}

export default Risk5;