import React, { useState } from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import ExampleBox from "../../../components/ExampleBox";
import VennDiagram from "./VennDiagram";

function Risk3() {
  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
        <p className='heading1'>Diversification</p>
        <MathJaxContext>
        <p className='heading2'>Independent Gambles</p>
        <p>
        So far, we've been treating each gamble as if it lives in its own world. What happens in one gamble doesn't tell us anything about what happens in another. In other words, we've been treating all gambles as independent. We say two gambles are independent if knowing the outcome of one does not tell us anything about either the outcome or the probability of the other. 
        </p>
        <p>
        In the real world, the outcomes of different gambles may actually be correlated. Suppose company A and company B are both developing new products, which will either succeed or fail. The possible outcomes are 
        </p>
        <ol>
          <li>Both companies' products succeed</li>
          <li>Company A's product succeeds and company B's product fails</li>
          <li>Company B's product succeeds and company A's product fails</li>
          <li>Both companies' products fail</li>
        </ol>
        <p>
        Let's denote the probability of company A's product succeeding <MathJax inline>{"\\( Pr(A) \\)"}</MathJax> and the probability of company B's product succeeding <MathJax inline>{"\\( Pr(B) \\)"}</MathJax>. 
        We'll also denote the probability that they both succeed <MathJax inline>{"\\( Pr(A \\cap B) \\)"}</MathJax>. With these three probabilities, we can determine the likelihood of all possible outcomes. To do this, note that the 
        probability of some binary event <MathJax inline>{"\\( C \\)"}</MathJax> not happening is simply one minus the probability of the event happening, or <MathJax inline>{"\\( 1 - Pr(C) \\)"}</MathJax>. 
        </p>
        <div style={{display: "flex", justifyContent: "center"}}><VennDiagram a={0.4} b={0.4} overlap={0.05} /></div>
        <p>
        Using the above diagram, we have the following probabilities for each outcome:
        </p>
        <ol>
          <li><MathJax inline>{"\\( Pr(A \\cap B) \\)"}</MathJax></li>
          <li><MathJax inline>{"\\( Pr(A) - Pr(A \\cap B) \\)"}</MathJax></li>
          <li><MathJax inline>{"\\( Pr(B) - Pr(A \\cap B) \\)"}</MathJax></li>
          <li><MathJax inline>{"\\( 1 - Pr(A) - Pr(B) + Pr(A \\cap B)  \\)"}</MathJax></li>
        </ol>
        <p>
        Let's suppose knowing whether company A's product succeeds does not tell us anything about whether company B's product succeeds (i.e., these are independent events). If we know company A's product succeeds, then we are either in outcome 1 or 2. 
        If there is no additional information about company B's likelihood of success to be learned from company A's success, then the probabilities of these outcomes must reduce to <MathJax inline>{"\\( Pr(B) \\)"}</MathJax> and <MathJax inline>{"\\( 1 - Pr(B) \\)"}</MathJax> respectively. 
        On the other hand, if we know company A's product fails, then we are either in outcome 3 or 4. If this tells us nothing about company B's likelihood of success, then the probabilities of these outcomes must also reduce to <MathJax inline>{"\\( Pr(B) \\)"}</MathJax> and <MathJax inline>{"\\( 1 - Pr(B) \\)"}</MathJax> respectively. 
        To sum up, the following must be true if the events are independent:
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "safe center", // The "safe" keyword prevents the left-side cutoff
            overflowX: "auto",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              padding: "10px", // Optional: prevents content from touching edges
              flexShrink: 0,   // Ensures the inner div doesn't collapse
            }}
          >
            <div>
              <p><MathJax inline>{"\\( Pr(A) = 1 \\implies \\)"}</MathJax></p>
              <ol>
                <li><MathJax inline>{"\\( Pr(A \\cap B) \\rightarrow Pr(B) \\)"}</MathJax></li>
                <li><MathJax inline>{"\\( Pr(A) - Pr(A \\cap B) \\rightarrow 1 - Pr(B)\\)"}</MathJax></li>
              </ol>
            </div>

            <div>
              <p><MathJax inline>{"\\( Pr(A) = 0 \\implies \\)"}</MathJax></p>
              <ol start="3">
                <li><MathJax inline>{"\\( Pr(B) - Pr(A \\cap B) \\rightarrow Pr(B) \\)"}</MathJax></li>
                <li><MathJax inline>{"\\( 1 - Pr(A) - Pr(B) + Pr(A \\cap B) \\rightarrow 1 - Pr(B) \\)"}</MathJax></li>
              </ol>
            </div>
          </div>
        </div>
        <p>
        We can satisfy all these conditions if we impose <MathJax inline>{"\\( Pr(A \\cap B) = Pr(A)Pr(B) \\)"}</MathJax>. Thus, we say that events <MathJax inline>{"\\( A \\)"}</MathJax> and <MathJax inline>{"\\( B \\)"}</MathJax> are independent if <MathJax inline>{"\\( Pr(A \\cap B) = Pr(A)Pr(B) \\)"}</MathJax>.
        </p>
        <p className='heading2'>Risk Aversion and Diversification</p>
        <p>
        Continuing with our example, let's say that, if a product succeeds, the company's stock price will go up by $<MathJax inline>{"\\( X \\)"}</MathJax>. 
        Let's assume the stock price of each company starts at $50. I have $100 to invest, and I want to choose among (1) buying two shares of company A, (2) buying two shares of company B, and (3) buying one share of company A and one share of company B. Here are my possible outcomes in each state of the world:
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head">State of the World</th>
              <th className="table-entry-head">Probability</th>
              <th className="table-entry-head">Buy 2 Shares of Company A</th>
              <th className="table-entry-head">Buy 1 Share of Each Company</th>
              <th className="table-entry-head">Buy 2 Shares of Company B</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">Both companies' products succeed</td>
              <td className="table-entry"><MathJax inline>{"\\( Pr(A \\cap B) \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Company A's product succeeds and company B's product fails</td>
              <td className="table-entry"><MathJax inline>{"\\( Pr(A) - Pr(A \\cap B) \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Company B's product succeeds and company A's product fails</td>
              <td className="table-entry"><MathJax inline>{"\\( Pr(B) - Pr(A \\cap B) \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Both companies' products fail</td>
              <td className="table-entry"><MathJax inline>{"\\( 1 - Pr(A) - Pr(B) + Pr(A \\cap B) \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        Let's find the expected value of each investment option. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            EV_A &= 2X Pr(A\\cap B) + 2X[Pr(A) - Pr(A\\cap B)] = 2X Pr(A) \\\\ \\\\
            EV_{A,B} &= 2X Pr(A\\cap B) + X[Pr(A) - Pr(A\\cap B)]  + X[Pr(B) - Pr(A\\cap B)] = X (Pr(A) + Pr(B)) \\\\ \\\\
            EV_{B} &= 2X Pr(A\\cap B) + 2X[Pr(A) - Pr(A\\cap B)] = 2X Pr(B) 
            \\end{aligned}
          \\]`}
        </MathJax> 
        If both companies have the same probability of success (<MathJax inline>{"\\( Pr(A) = Pr(B) \\)"}</MathJax>), then the expected value of all three investment options is the same. 
        </p>
        <p>
        Recall that we can represent risk aversion using a concave utility function. Suppose my risk preferences are represented by the utility function <MathJax inline>{"\\( u(x)= \\sqrt{x} \\)"}</MathJax>. 
        Let's find my expected utility under each investment option.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            EU_A &= u(2X) Pr(A\\cap B) + u(2X)[Pr(A) - Pr(A\\cap B)] \\\\
            &= \\sqrt{2X} Pr(A) \\\\ \\\\
            EU_{A,B} &= u(2X) Pr(A\\cap B) + u(X)[Pr(A) - Pr(A\\cap B)]  + u(X)[Pr(B) - Pr(A\\cap B)] \\\\
            &=  \\sqrt{2X} Pr(A\\cap B) + \\sqrt{X}[Pr(A) + Pr(B) - 2Pr(A\\cap B)] \\\\ \\\\
            EU_{B} &= u(2X) Pr(A\\cap B) + u(2X)[Pr(A) - Pr(A\\cap B)] \\\\
            &= \\sqrt{2X} Pr(B) 
            \\end{aligned}
          \\]`}
        </MathJax> 
        This time, if both companies have the same probability of success (<MathJax inline>{"\\( Pr(A) = Pr(B) \\)"}</MathJax>), then the expected utility of investing in only company A or only company B is the same. 
        But, the expected utility of investing in both companies is actually greater. To see this, let's denote <MathJax inline>{"\\( p = Pr(A) = Pr(B) \\)"}</MathJax> and <MathJax inline>{"\\( q = Pr(A\\cap B) \\)"}</MathJax>. Now,
        the expected utility of investing in both companies is greater if 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             &\\sqrt{2X} Pr(A\\cap B) + \\sqrt{X}[Pr(A) + Pr(B) - 2Pr(A\\cap B)] \\geq \\sqrt{2X} Pr(A)  \\\\
             &\\Leftrightarrow \\sqrt{2X} q + \\sqrt{X}[2p- 2q] \\geq \\sqrt{2X}p \\\\
             &\\Leftrightarrow 2\\sqrt{X} (p-q) \\geq \\sqrt{2X}(p-q)
            \\end{aligned}
          \\]`}
        </MathJax>  
        This inequality holds since <MathJax inline>{"\\( p \\geq q \\)"}</MathJax> (or <MathJax inline>{"\\( Pr(A) \\geq Pr(A\\cap B) \\)"}</MathJax>) and <MathJax inline>{"\\( 2\\sqrt{X} > \\sqrt{2X} \\)"}</MathJax>. 
        Thus, under risk aversion, I prefer to diversify, or split my investment between the two companies, rather than purchase shares in only one company.
        </p>
        <p className='heading2'>Correlation and Diversification</p>
        <p>
        Notice from the inequality <MathJax inline>{"\\( 2\\sqrt{X} (p-q) \\geq \\sqrt{2X}(p-q)\\)"}</MathJax> that I will tend to like diversification more as <MathJax inline>{"\\( (p - q) \\)"}</MathJax> increases, or as <MathJax inline>{"\\( q\\)"}</MathJax> <MathJax inline>{"\\( \\left(Pr(A\\cap B)\\right) \\)"}</MathJax> decreases. 
        Intuitively, diversification is more beneficial for me when it helps to balance out my outcomes across the different states of the world (i.e., reduce my outcome variance). Thus, I would prefer for company A to be successful when company B is not successful and company B to be successful when company A is not successful rather than having both companies be successful or not successful at the same time. 
        To see this, let's consider the table from before under our assumption that <MathJax inline>{"\\( Pr(A) = Pr(B) = p  \\)"}</MathJax>.
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head">State of the World</th>
              <th className="table-entry-head">Probability</th>
              <th className="table-entry-head">Buy 2 Shares of Company A</th>
              <th className="table-entry-head">Buy 1 Share of Each Company</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">Both companies' products succeed</td>
              <td className="table-entry"><MathJax inline>{"\\( q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Company A's product succeeds and company B's product fails</td>
              <td className="table-entry"><MathJax inline>{"\\( p - q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Company B's product succeeds and company A's product fails</td>
              <td className="table-entry"><MathJax inline>{"\\( p - q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Both companies' products fail</td>
              <td className="table-entry"><MathJax inline>{"\\( 1 - 2p + q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        The option to buy 2 shares in the same company reduces down to a gamble offering <MathJax inline>{"\\( 2X\\)"}</MathJax> with probability <MathJax inline>{"\\( p \\)"}</MathJax> and <MathJax inline>{"\\( 0\\)"}</MathJax> with probability <MathJax inline>{"\\( 1- p\\)"}</MathJax>.
        What would the option to diversify look like if there was no overlap of success between the companies, or if <MathJax inline>{"\\( q  = 0\\)"}</MathJax>? In this case, buying 1 share in each company reduces down to a gamble offering <MathJax inline>{"\\( X\\)"}</MathJax> with probability <MathJax inline>{"\\( 2p\\)"}</MathJax> and <MathJax inline>{"\\( 0\\)"}</MathJax> with probability <MathJax inline>{"\\( 1-2p\\)"}</MathJax>. 
        Here, we have reduced our outcome variance as much as we can through diversification. In fact, if <MathJax inline>{"\\( p  = \\frac{1}{2}\\)"}</MathJax>, then diversification offers a certain $<MathJax inline>{"\\( X\\)"}</MathJax> outcome, while buying shares in only one company still carries a 50% chance of receiving nothing. 
        </p>
        <p>
        At the other extreme, if <MathJax inline>{"\\( q  = p\\)"}</MathJax>, then buying 1 share in each company reduces down to the same gamble as the option to buy 2 shares in the same company. In this case, diversification does nothing to balance out outcomes. 
        </p>
        <p>
        To take this one step further, let's look at how <MathJax inline>{"\\( p \\)"}</MathJax> and <MathJax inline>{"\\( q  \\)"}</MathJax> are related to the correlation between the two companies' outcomes. Let's denote the outcome from buying 1 share of company A as <MathJax inline>{"\\( Z_A \\)"}</MathJax> and the outcome from buying 1 share of company B is <MathJax inline>{"\\( Z_B\\)"}</MathJax>. 
        The correlation between these outcomes is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             \\text{corr}_{A,B} = \\frac{\\text{cov}(Z_A, Z_B)}{\\sqrt{\\text{var}(Z_A)\\text{var}(Z_B)}}
            \\end{aligned}
          \\]`}
        </MathJax>  
        where <MathJax inline>{"\\( \\text{cov}(Z_A, Z_B) = E[Z_AZ_B] - E[Z_A]E[Z_B]\\)"}</MathJax> and <MathJax inline>{"\\( \\text{var}(Z_A) = E[Z_A^2] - (E[Z_A])^2\\)"}</MathJax>. Here, <MathJax inline>{"\\( E[\\cdot]\\)"}</MathJax> denotes the expected value. To calculate all these expected values, let's find outcomes in each state of the world.
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head">State of the World</th>
              <th className="table-entry-head">Probability</th>
              <th className="table-entry-head"><MathJax inline>{"\\( Z_A \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( Z_B \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( Z_A^2 \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( Z_B^2 \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( Z_AZ_B \\)"}</MathJax></th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">Both companies' products succeed</td>
              <td className="table-entry"><MathJax inline>{"\\( q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X^2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X^2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X^2 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Company A's product succeeds and company B's product fails</td>
              <td className="table-entry"><MathJax inline>{"\\( p - q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X^2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Company B's product succeeds and company A's product fails</td>
              <td className="table-entry"><MathJax inline>{"\\( p - q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( X^2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">Both companies' products fail</td>
              <td className="table-entry"><MathJax inline>{"\\( 1 - 2p + q \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        Using the above table, we can calculate the expected values as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             E[Z_A] = E[Z_B] = pX \\\\ 
             E[Z_A^2] = E[Z_B^2] = pX^2 \\\\
             E[Z_AZ_B] = qX^2
            \\end{aligned}
          \\]`}
        </MathJax> 
        and the correlation coefficient as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
             \\text{cov}(Z_A, Z_B) &= E[Z_AZ_B] - E[Z_A]E[Z_B]] \\\\
             &= X^2(q - p^2) \\\\ \\\\
             \\text{var}(Z_A) &= \\text{var}(Z_B) = E[Z_A^2] - (E[Z_A])^2 \\\\
             &= X^2(p - p^2) \\\\ \\\\
             \\text{corr}_{Z_A,Z_B} &= \\frac{\\text{cov}(Z_A, Z_B)}{\\sqrt{\\text{var}(Z_A)\\text{var}(Z_B)}} \\\\
             &= \\frac{X^2(q - p^2)}{\\sqrt{[X^2(p - p^2)]^2}} \\\\
             &= \\frac{q - p^2}{p - p^2}
            \\end{aligned}
          \\]`}
        </MathJax> 
        If <MathJax inline>{"\\( q = 0 \\)"}</MathJax>, then the correlation coefficient reduces to <MathJax inline>{"\\(  \\text{corr}_{Z_A,Z_B} = \\frac{- p}{1 - p} \\)"}</MathJax>. In this case, the outcomes are perfectly negativley correlated. If <MathJax inline>{"\\( q = p \\)"}</MathJax>, then 
        the correlation coefficient is 1, and the outcomes are perfectly positively correlated. Note that the correlation coefficient will always be between -1 and 1. 
        </p>
        <p>
        In general, when assets are not perfectly positively correlated (correlation coefficient is less than 1), an investor can form a diversified portfolio with strictly lower variance than at least one of the individual assets, holding expected return fixed. 
        Because risk-averse investors prefer lower variance for a given expected return, and diversification reduces variance whenever returns are not perfectly positively correlated, risk-averse investors prefer diversified portfolios to concentrated ones.
        </p>
          <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              We want to find the certainty equivalent of the diversified investment and the undiversified investment. First, we'll calculate the expected utility of each investment option as
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                    EU_D &= \\sqrt{2X} q + 2\\sqrt{X}(p - q) \\\\ 
                    &= 4\\sqrt{2}\\left(\\frac{1}{4}\\right) + 8\\left(\\frac{1}{2} - \\frac{1}{4}\\right) \\\\
                    &= \\sqrt{2} + 2 \\\\ \\\\\
                    EU_U &= \\sqrt{2X} p \\\\
                    &= 4\\sqrt{2}\\left(\\frac{1}{2}\\right) \\\\
                    &= 2\\sqrt{2}
                    \\end{aligned}
                  \\]`}
                </MathJax> 
              Next, we'll use these expected utilities to find the certainty equivalents.
                <MathJax className='math-container'>
                  {`\\[
                    \\begin{aligned}
                    u(CE_D) &= \\sqrt{2} + 2 \\\\ 
                    CE_D &= (\\sqrt{2} + 2)^2 \\\\
                    &= 6 + 4\\sqrt{2} \\approx $11.66 \\\\ \\\\
                    u(CE_U) &= 2\\sqrt{2} \\\\
                    CE_U &= (2\\sqrt{2})^2 \\\\
                    &= $8
                    \\end{aligned}
                  \\]`}
                </MathJax>   
                Thus, I would be willing to pay <MathJax inline>{"\\( 11.66 - 8 = $3.66 \\)"}</MathJax> for the opportunity to diversify.   
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> Using the setting above, how much would I be willing to pay for the opportunity to diversify my investment if <MathJax inline>{"\\( X = 16 \\)"}</MathJax>, <MathJax inline>{"\\( Pr(A) = Pr(B) = \\frac{1}{2} \\)"}</MathJax>, <MathJax inline>{"\\( Pr(A \\cap B) = \\frac{1}{4} \\)"}</MathJax>, and my risk preferences are represented by the utility function <MathJax inline>{"\\( u(x)=\\sqrt{x} \\)"}</MathJax>?
            </p>
          </ExampleBox>
        </MathJaxContext>
        <PageNavigator group="Risk"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/risk">Contents</NavLink></div>
        </div>
  );
}

export default Risk3;