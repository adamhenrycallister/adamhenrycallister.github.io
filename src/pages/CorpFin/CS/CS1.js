import React, { useState } from 'react';
import './CS.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import ExampleBox from "../../../components/ExampleBox";


function CS1() {
  return (
        <div className='CS'>
        <PageNavigator group="CS" />
        <p className='heading1'>Modigliani and Miller Theorem</p>
        <MathJaxContext>
            <p className='heading2'>Capital Structure Basics</p>
            <p>
            Firms need money to invest in projects. Broadly speaking, firms can raise money in two ways:
            <ol>
              <li>Debt (borrowing money with the promise to repay it in the future)</li>
              <li>Equity (selling ownership interests in the firm)</li>
            </ol>
            A firm's capital structure describes how much of its financing comes from debt and how much comes from equity.
            </p>
            <p>
            Suppose a firm has 10,000 bonds outstanding (each trading at a price of $950) and 5 million shares outstanding (each trading at a price of $30). If the firm 
            has no other financing, the total value of the firm is 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                V = D + E
                \\end{aligned}
              \\]`}
            </MathJax>  
            where <MathJax inline>{"\\( D = 10,000\\times $950 = $9.5 \\)"}</MathJax> million is the market value of the debt, and <MathJax inline>{"\\( E = 5,000,000 \\times $30 = $150 \\)"}</MathJax> million is the market value of the 
            equity. 
            </p>
            <p>
            Thus, <MathJax inline>{"\\( V = $159.5 \\)"}</MathJax> million, and the firm is comprised of 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                \\omega_D &= \\frac{D}{V} = \\frac{9.5}{159.5} \\approx 6\\% \\text{ debt} \\\\ \\\\
                \\omega_E &= \\frac{E}{V} = \\frac{150}{159.5} \\approx 94\\% \\text{ equity}
                \\end{aligned}
              \\]`}
            </MathJax>  
            </p>
            <p>
            There are many ways to finance a firm besides corporate bonds and common stock. Different securities are more "debt-like" or "equity-like" depending on 
            their priority in bankruptcy, cash-flow rights, information sensitivity, and other factors. 
            </p>
            <table className="capital-structure-table">
              <thead>
                <tr>
                  <th>Security</th>
                  <th>Bankruptcy Priority</th>
                  <th>Cash Flow Rights</th>
                  <th>Information Sensitivity</th>
                  <th>Debt–Equity Spectrum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Senior Secured Debt</td>
                  <td>Highest</td>
                  <td>Fixed Interest & Principal</td>
                  <td>Very Low</td>
                  <td>Most Debt-Like</td>
                </tr>
                <tr>
                  <td>Senior Unsecured Debt</td>
                  <td>High</td>
                  <td>Fixed Interest & Principal</td>
                  <td>Low</td>
                  <td>Debt-Like</td>
                </tr>
                <tr>
                  <td>Subordinated Debt</td>
                  <td>Medium</td>
                  <td>Fixed Interest & Principal</td>
                  <td>Moderate</td>
                  <td>Mostly Debt</td>
                </tr>
                <tr>
                  <td>Convertible Debt</td>
                  <td>Medium</td>
                  <td>Debt + Conversion Option</td>
                  <td>Moderate–High</td>
                  <td>Hybrid</td>
                </tr>
                <tr>
                  <td>Preferred Stock</td>
                  <td>Low</td>
                  <td>Preferred Dividends</td>
                  <td>High</td>
                  <td>Mostly Equity</td>
                </tr>
                <tr>
                  <td>Common Stock</td>
                  <td>Lowest</td>
                  <td>Residual Claim</td>
                  <td>Very High</td>
                  <td>Most Equity-Like</td>
                </tr>
              </tbody>
            </table>
            <p>
            <strong>Bankruptcy priority</strong> determines the order in which investors are paid if a firm cannot meet its obligations and enters bankruptcy. Investors with higher priority are paid before investors with lower priority. 
            For example: 
            </p>
            <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{display: "flex", flexDirection: "row", gap: "clamp(12px, 15%, 500px)", width: "90%"}}>
            <p>
            Suppose a firm has assets worth $100 million but owes:
            <ul>
              <li>$50 million to senior secured lenders</li>
              <li>$30 million to bondholders</li>
              <li>$40 million to preferred shareholders</li>
              <li>Common shareholders own the residual claim</li>
            </ul>
            </p>
            <p>
            If the firm liquidates for $100 million:
            <ol>
              <li>Senior secured lenders receive $50 million</li>
              <li>Bondholders receive $30 million</li>
              <li>Preferred shareholders receive $20 million</li>
              <li>Common shareholders receive $0</li>
            </ol>
            </p>
            </div>
            </div>
            <p>
            <strong>Cash flow rights</strong> determine how investors receive money from the firm during normal operations. <strong>Information sensitivity</strong> measures how much the value of a security changes when investors learn new information about the firm's prospects.
            </p>
            <p>
            The most debt-like securities are typically paid first in bankruptcy, have predetermined interest and principal payments, and experience relatively little price reaction to news. 
            The most equity-like securities are typically paid last in bankrutpcy, have rights to the residual cash flows of the firm, and experience the most price reaction to news. 
            </p>
            <p>
            Most financing instruments fall somewhere between these extremes. For example, convertible bonds and preferred stock are "hybrid" securities that combine characteristics of both debt and equity. 
            Despite this continuum, corporate finance often treats financing as a binary choice between debt and equity. In practice, analysts typically classify instruments according to their dominant characteristics or legal form, placing convertible bonds on the debt side of the line and preferred stock on the equity side. 
            While this cutoff is somewhat arbitrary, it provides a useful framework for comparing the financial "leverage" (i.e., the total debt relative to equity) of different firms.
            </p>
            <p className='heading2'>Modigliani and Miller Assumptions</p>
            <p>
            The famous <a className='link' href='https://www.jstor.org/stable/pdf/1809766.pdf' target="_blank">Modigliani and Miller (1958)</a> result shows that a firm's value does not depend on its capital structure. In other words, 
            the amount of debt a firm takes on does not change its overall value. This result relies on the assumption of perfect capital markets, or 
            <ol>
              <li>no transaction costs,</li>
              <li>no taxes,</li>
              <li>symmetric information,</li>
              <li>competitive markets, and</li>
              <li>investors and firms borrow/lend at the same rates.</li>
            </ol>
            </p>
            <p className='heading2'>Modigliani and Miller Proof</p>
            <p>
                Suppose we have two firms: Firm <MathJax inline>{"\\( U \\)"}</MathJax> ("unlevered," financed entirely with equity) and Firm <MathJax inline>{"\\( L \\)"}</MathJax> ("levered," financed partially with debt). 
                Let <MathJax inline>{"\\( V_U\\)"}</MathJax> and <MathJax inline>{"\\( V_L\\)"}</MathJax> denote the values of firms <MathJax inline>{"\\( U\\)"}</MathJax> and <MathJax inline>{"\\( L \\)"}</MathJax> respectively. 
                Assume the two firms have the same underlying assets and the same cash flows (denoted by <MathJax inline>{"\\(  X \\)"}</MathJax>). The firms differ only in their capital structure. 
                The Modigliani and Miller (MM) Theorem says that 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                V_U = V_L
                \\end{aligned}
              \\]`}
            </MathJax>  
            We can also write the value of the unlevered firm as <MathJax inline>{"\\( V_U = E_U \\)"}</MathJax>, since it is financed entirely by equity, and the value of the levered firm as <MathJax inline>{"\\( V_L = D + E_L \\)"}</MathJax>, 
            since it is financed by both debt and equity. Let <MathJax inline>{"\\( P \\)"}</MathJax> denote the required payment owed to the debt holders of the levered firm. 
            </p>
            <p>
            Our strategy will be to create two assets with the same payoff by (1) purchasing shares of the levered firm and (2) purchasing shares of the unlevered firm and 
            borrowing money in the form of a personal loan. 
            </p>
            <p>
            First, let's purchase a <MathJax inline>{"\\( \\omega \\)"}</MathJax> fraction of the levered firm's equity. The cost of this investment is given by <MathJax inline>{"\\( \\omega E_L \\)"}</MathJax>. Since the levered firm has future cash flows <MathJax inline>{"\\( X \\)"}</MathJax> and debt payments <MathJax inline>{"\\( P \\)"}</MathJax>, 
            the payoff on this investment is given by 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                    \\omega(X-P)
                \\end{aligned}
              \\]`}
            </MathJax>  
            (Assume the firm's cash flows are always sufficient to repay its debt, or <MathJax inline>{"\\( X \\geq P \\)"}</MathJax>, so debt is risk-free.
            The MM result also holds with risky debt, but the notation becomes more involved.)
            </p>
            <p>
            Next, let's purchase the same <MathJax inline>{"\\( \\omega \\)"}</MathJax> fraction of the unlevered firm's equity and borrow money equal to a <MathJax inline>{"\\( \\omega \\)"}</MathJax> fraction of the levered firm's total debt <MathJax inline>{"\\( D \\)"}</MathJax> (i.e., borrow the amount <MathJax inline>{"\\( \\omega D \\)"}</MathJax>). 
            A key MM assumption is that individuals can borrow and lend at the same market interest rate as firms.
            Recall that <MathJax inline>{"\\( D \\)"}</MathJax> is the market value of the debt today, while <MathJax inline>{"\\( P \\)"}</MathJax> is the future repayment promised to debtholders. Thus borrowing <MathJax inline>{"\\( \\omega D \\)"}</MathJax> today requires repayment <MathJax inline>{"\\( \\omega P \\)"}</MathJax> later. 
            The cost of this investment is given by <MathJax inline>{"\\( \\omega E_U - \\omega D \\)"}</MathJax>.
            The investor receives the unlevered firm's cash flow (<MathJax inline>{"\\( \\omega X \\)"}</MathJax>) but must repay the personal loan (<MathJax inline>{"\\( \\omega P \\)"}</MathJax>). Hence the net payoff is
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                    \\omega X - \\omega P = \\omega (X-P)
                \\end{aligned}
              \\]`}
            </MathJax>  
            </p>
            <p>
            Notice that the two assets we've created have the same payoff:
            <table class="minimal-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Cost</th>
                  <th>Payoff</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Levered Firm</td>
                  <td><MathJax inline>{"\\( \\omega E_L \\)"}</MathJax></td>
                  <td><MathJax inline>{"\\( \\omega(X-P) \\)"}</MathJax></td>
                </tr>
                <tr>
                  <td>Unlevered Firm + Borrowing</td>
                  <td><MathJax inline>{"\\( \\omega(E_U - D) \\)"}</MathJax></td>
                  <td><MathJax inline>{"\\( \\omega(X-P) \\)"}</MathJax></td>
                </tr>
              </tbody>
            </table>
            Under the MM assumptions (perfect capital markets and no arbitrage), two portfolios with identical payoffs in every future state must have the same market value. Otherwise, 
            an arbitrage opportunity exists (i.e., investors could earn a risk-free profit by purchasing the cheaper asset and selling the more expensive one).
            Thus, we can set the cost of the first asset equal to the cost of the second 
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                    &\\omega E_L = \\omega(E_U - D) \\\\
                    &\\Leftrightarrow D + E_L = E_U \\\\
                    &\\Leftrightarrow V_L = V_U
                \\end{aligned}
              \\]`}
            </MathJax> 
            Therefore, both firms have the same value, even though one has debt and the other does not.
            </p>
            <p className='heading2'>Intuition</p>
            <p>The key insight behind the Modigliani and Miller theorem is that financial leverage can be created either by the firm or by the investor. 
            If investors can borrow and lend at the same interest rates as firms, then they do not need a firm to borrow on their behalf.
            </p>
            <p>
            Suppose an investor wants the higher-risk, higher-return payoff associated with a levered firm. 
            Even if the firm is completely unlevered, the investor can simply purchase shares of the unlevered firm and finance part of the purchase with a personal loan. 
            This creates "homemade leverage" because the investor has replicated the firm's capital structure using their own borrowing.
            </p>
            <p>
            Likewise, if a firm is levered but an investor prefers a less risky investment, they can simply buy a smaller amount of the firm's equity and invest the remaining money in risk-free assets. In other words, investors can adjust their own leverage to whatever level they prefer.
            </p>
            <p>
            Because investors can freely create or undo leverage on their own, a firm's financing decisions cannot increase or decrease its total value. If two firms have identical underlying assets and differ only in how they are financed, investors can always replicate one firm's payoff using the other. If the two firms were priced differently, investors would buy the cheaper replication and sell the more expensive one, creating an arbitrage opportunity. Competition would eliminate this price difference, forcing both firms to have the same value.
            </p>
            <p className='heading2'>Numerical Example</p>
            <p>
            Consider a single period investment in a firm with 10 million shares. At the end of the period the firm will either be worth $1 billion (in state 1) or $200 million (in state 2). Assume these two states of the world are equally likely. 
             The risk-free rate over the period is 4%. 
            </p>
            <p>
            If the firm is unlevered, it's state 1 stock price is <MathJax inline>{"\\( \\frac{1,000}{10} = \\$100 \\)"}</MathJax>, and it's state 2 stock price is <MathJax inline>{"\\( \\frac{200}{10} = \\$20 \\)"}</MathJax>. Suppose instead that the firm borrows <MathJax inline>{"\\( $192.3 \\)"}</MathJax> million at the risk-free rate and must repay  <MathJax inline>{"\\( $200 \\)"}</MathJax> million at the end of the period. 
            This levered version of the firm has a state 1 stock price of <MathJax inline>{"\\( \\frac{1,000 - 200}{10} = \\$80 \\)"}</MathJax> and a state 2 stock price of <MathJax inline>{"\\( \\frac{200 - 200}{10} = \\$0 \\)"}</MathJax>. 
            </p>
            <p>If the market index has a current trading price of $50 per share, a state 1 price of $70, and a state 2 price of $40, then the current price of the unlevered firm is $50, and the current price of the levered firm is $30.77. (See Example 1 to calculate these prices using CAPM.)</p>
            <table class="minimal-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Current Share Price</th>
                  <th>State 1 Share Price</th>
                  <th>State 2 Share Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Unlevered Firm</td>
                  <td>$50</td>
                  <td>$100</td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td>Levered Firm</td>
                  <td>$30.77</td>
                  <td>$80</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Market Index</td>
                  <td>$50</td>
                  <td>$70</td>
                  <td>$40</td>
                </tr>
              </tbody>
            </table>
            <p>
            Suppose I want to guarantee a payoff of $100 in state 1 and $20 in state 2. I could either 
            <ol>
              <li>Purchase 1 share of the unlevered firm for $50; or</li>
              <li>Purchase 1 share of the levered firm for $30.77 and lend $19.23 at the risk-free rate for a total cost of $50</li>
            </ol>
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                \\begin{array}{ccccc}
                \\text{State 1 Payoff} \\ = \\ & 
                \\overbrace{\\$80}^{\\text{Levered Firm Equity}} & + & \\overbrace{\\$20}^{\\text{Debt Payment}} & = & \\$100 \\\\
                \\text{State 2 Payoff} \\ = \\ & \\$0 & + & \\$20 & = & \\$20
                \\end{array}
                \\end{aligned}
              \\]`}
            </MathJax> 
            </p>
            <p>
            Suppose I want to guarantee a payoff of $80 in state 1 and $0 in state 2. I could either 
            <ol>
              <li>Purchase 1 share of the levered firm for $30.77; or</li>
              <li>Purchase 1 share of the unlevered firm for $50 and borrow $19.23 at the risk-free rate for a total cost of $30.77</li>
            </ol>
            <MathJax className='math-container'>
              {`\\[
                \\begin{aligned}
                \\begin{array}{ccccc}
                \\text{State 1 Payoff} \\ = \\ & 
                \\overbrace{\\$100}^{\\text{Unlevered Firm Equity}} & - & \\overbrace{\\$20}^{\\text{Debt Payment}} & = & \\$80 \\\\
                \\text{State 2 Payoff} \\ = \\ & \\$20 & - & \\$20 & = & \\$0
                \\end{array}
                \\end{aligned}
              \\]`}
            </MathJax> 
            </p>
            <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              Recall the CAPM equation:
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                        E[R_i] - R_f = \\beta(E[R_m] - R_f)
                    \\end{aligned}
                  \\]`}
                </MathJax>   
                where <MathJax inline>{"\\( \\beta =\\frac{\\text{cov}(R_i, R_m)}{\\text{var}(R_m)} \\)"}</MathJax>.
              </p>
              <p>
              First, let's write <MathJax inline>{"\\( E[R_m] \\)"}</MathJax>, <MathJax inline>{"\\( E[R_i] \\)"}</MathJax>, <MathJax inline>{"\\( \\text{cov}(R_i,R_m) \\)"}</MathJax>, and <MathJax inline>{"\\( \\text{var}(R_m) \\)"}</MathJax> in terms of current 
              prices <MathJax inline>{"\\( (P_{i,0}, P_{m,0}) \\)"}</MathJax>, state 1 prices <MathJax inline>{"\\( (P_{i,1}, P_{m,1}) \\)"}</MathJax>, and state 2 prices <MathJax inline>{"\\( (P_{i,2}, P_{m,2}) \\)"}</MathJax>.
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                        E[R_m] &= \\frac{1}{2}\\left(\\frac{P_{m,1} - P_{m,0}}{P_{m,0}}\\right) + \\frac{1}{2}\\left(\\frac{P_{m,2} - P_{m,0}}{P_{m,0}}\\right) \\\\
                        &= \\frac{P_{m,1} + P_{m,2}}{2 P_{m,0}} - 1 \\\\ \\\\
                        E[R_i] &= \\frac{P_{i,1} + P_{i,2}}{2 P_{i,0}} - 1 \\\\ \\\\
                        \\text{cov}(R_i, R_m) &= \\frac{1}{2}\\left(\\frac{P_{i,1} - P_{i,0}}{P_{i,0}} - E[R_i]\\right)\\left(\\frac{P_{m,1} - P_{m,0}}{P_{m,0}} - E[R_m]\\right) \\\\
                        &+ \\frac{1}{2}\\left(\\frac{P_{i,2} - P_{i,0}}{P_{i,0}} - E[R_i]\\right)\\left(\\frac{P_{m,2} - P_{m,0}}{P_{m,0}} - E[R_m]\\right) \\\\
                        &= \\frac{(P_{i,1} - P_{i,2})(P_{m,1} - P_{m,2})}{4 P_{i,0}P_{m,0}} \\\\ \\\\
                        \\text{var}(R_m) &= \\frac{1}{2}\\left(\\frac{P_{m,1} - P_{m,0}}{P_{m,0}} - E[R_m]\\right)^2 
                        + \\frac{1}{2}\\left(\\frac{P_{m,2} - P_{m,0}}{P_{m,0}} - E[R_m]\\right)^2 \\\\
                        &= \\frac{(P_{m,1}-P_{m,2})^2}{4 P_{m,0}^2}
                    \\end{aligned}
                  \\]`}
                </MathJax>  
                Next we can plug these expressions into the CAPM equation and solve for <MathJax inline>{"\\( P_{i,0} \\)"}</MathJax>.
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                        &\\frac{P_{i,1} + P_{i,2}}{2 P_{i,0}} - 1 - R_f = \\frac{\\frac{(P_{i,1} - P_{i,2})(P_{m,1} - P_{m,2})}{4 P_{i,0}P_{m,0}} }{\\frac{(P_{m,1}-P_{m,2})^2}{4 P_{m,0}^2}}\\left(\\frac{P_{m,1} + P_{m,2}}{2 P_{m,0}} - 1 - R_f\\right) \\\\
                        &\\Leftrightarrow P_{i,0} = \\frac{P_{i,1} + P_{i,2}}{2(1+R_f)} - \\left(\\frac{P_{i,1}-P_{i,2}}{P_{m,1} - P_{m,2}}\\right)\\left(\\frac{P_{m,1}+P_{m,2}}{2(1+R_f)} - P_{m,0}\\right)
                    \\end{aligned}
                  \\]`}
                </MathJax>  
                Notice that the first term of this expression is the stock's discounted expected future value. The second term adjusts for systematic risk. Assets that covary more strongly with the market receive a larger discount. 
              </p>
              <p>
                Finally, we can plug in the values for each variable to solve for the current stock prices. 
              </p>
              <p>
              The current price of the first stock is
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                        \\frac{100 + 20}{2(1+0.04)} - \\left(\\frac{100-20}{70 - 40}\\right)\\left(\\frac{70+40}{2(1+0.04)} - 50\\right)
                        = \\$50
                    \\end{aligned}
                  \\]`}
                </MathJax> 
              </p>
              <p>
              The current price of the second stock is
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                       \\frac{80 + 0}{2(1+0.04)} - \\left(\\frac{80-0}{70 - 40}\\right)\\left(\\frac{70+40}{2(1+0.04)} - 50\\right)
                        = \\$30.77
                    \\end{aligned}
                  \\]`}
                </MathJax> 
              </p>
              <p>
              In the context of the unlevered and levered firms example, notice that CAPM pricing is entirely consistent with Modigliani and Miller's homemade leverage argument. 
              The unlevered stock is worth exactly the same as the levered stock plus a risk-free bond paying $20 at the end of the period. Because investors can borrow or lend on their own account, 
              CAPM assigns the same price to these equivalent investment strategies.
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                      \\overbrace{\\$50}^{\\text{Unlevered Equity Price}} - \\overbrace{\\$30.77}^{\\text{Levered Equity Price}} = \\$19.23 = \\frac{\\overbrace{\\$20}^{\\text{Debt Payment Per Share}}}{1 + \\underbrace{0.04}_{\\text{risk-free rate}}}
                    \\end{aligned}
                  \\]`}
                </MathJax> 
              </p>
            </>
          }>
            <div>
            <p><strong>Example 1:</strong> Consider a single period investment. At the end of the period, the stock of a firm will be worth $100 if state 1 occurs and $20 if state 2 occurs. The market index is currently trading at $50 and will be worth $70 if state 1 occurs and $40 if state 2 occurs. 
            State 1 and state 2 are equally likely, and the risk-free rate is 4%.
            </p>
            <p>
            Show that the current price of the firm's stock must be $50 under CAPM assumptions.
            </p>
            <p>
            Show that the current price of a stock that will be worth $80 in state 1 and $0 in state 2 must be $30.77.
            </p>
            </div>
          </ExampleBox>
        </MathJaxContext>
        <PageNavigator group="CS"/>
        </div>
  );
}

export default CS1;