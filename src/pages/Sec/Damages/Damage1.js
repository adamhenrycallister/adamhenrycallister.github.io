import React, { useState } from 'react';
import './Damage.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";


function Damage1() {
  return (
        <div className='Damage'>
        <PageNavigator group="Damages" />
        <p className='heading1'>Rule 10b-5 Damages</p>
        <MathJaxContext>
        <p>
        Damages for an individual plaintiff in a Rule 10b-5 case depend on two separate measures: (1) the plaintiff's actual loss, 
        or the difference between the price at which she purchased her shares and the price at which she sold her shares and (2) the plaintiff's fraud loss, 
        or the difference between what her outcome would have been without fraud and her actual outcome. These inherently distinct concepts show up in a mixture of statutes and case law in 
        a way that almost always benefits defendants. 
        </p>
        <p className='heading2'>Actual Loss</p>
        <p>
        Plaintiffs in a Rule 10b-5 case cannot claim damages if they did not suffer a net loss over all their transactions in the company's stock. Section 28(a) of the Exchange Act 
        limits recovery under an Exchange Act claim to "the actual damages" suffered by the plaintiff (<a className='inline-link' href="https://www.law.cornell.edu/uscode/text/15/78bb" target="_blank">15 U.S. Code &sect; 78bb(a)</a>). 
        </p>
        <p>
        This cap on damages likely prevents many meritorious cases from being brought. To see why, consider two companies, <MathJax inline>{"\\( A \\)"}</MathJax> and <MathJax inline>{"\\( B \\)"}</MathJax>, whose managers release false good news that causes a stock price increase at each company. 
        Assume the false news creates the same mispricing effect at both companies. However, suppose investors discover the fraud at company <MathJax inline>{"\\( A \\)"}</MathJax> at the same time that company <MathJax inline>{"\\( A \\)"}</MathJax> experiences an unrelated positive price shock. For example, 
        perhaps <MathJax inline>{"\\( A \\)"}</MathJax> is in an industry that is particularly reliant on foreign supply chains, and the government announces a reduction in tariffs around the same time that the market discovers the fraud at company <MathJax inline>{"\\( A \\)"}</MathJax>. Suppose company <MathJax inline>{"\\( B \\)"}</MathJax> does not experience a positive price shock at the time of fraud revelation. 
        If the positive shock to company <MathJax inline>{"\\( A \\)"}</MathJax>'s stock price is greater than the price inflation caused by managers' mistatements, then <MathJax inline>{"\\( A \\)"}</MathJax>'s stock price should not drop upon revelation of fraud. Without an actual loss, investors who purchased during the period of price inflation cannot recover damages from company <MathJax inline>{"\\( A \\)"}</MathJax>. In contrast, without an offsetting 
        positive price shock at company <MathJax inline>{"\\( B \\)"}</MathJax>, investors who bought during price inflation can bring a claim against company <MathJax inline>{"\\( B \\)"}</MathJax>. 
        </p>
        <p>
        The above example shows how a cap limiting damages to an investor's actual loss is problematic for two reasons: First, managers at both companies had the same fraudulent intent and caused the same amount of mispricing with their false statements. But, because of external market factors, company <MathJax inline>{"\\( A \\)"}</MathJax> does not face any private securities fraud enforcement while company <MathJax inline>{"\\( B \\)"}</MathJax> does. 
        If the goal is to deter managers from committing fraud, then our fraud enforcement system should create the same liability exposure for both companies. Second, although investors in company <MathJax inline>{"\\( A \\)"}</MathJax> did not have a net loss, they missed out on the full gains from the positive price shock. Put differently, investors in company <MathJax inline>{"\\( A \\)"}</MathJax> did 
        worse than they would have if managers had not committed fraud. If the goal is to compensate investors in a way that makes them as well off as they would have been had managers not lied, then our fraud enforcement system should allow company <MathJax inline>{"\\( A \\)"}</MathJax>'s investors to recover damages from company <MathJax inline>{"\\( A \\)"}</MathJax>.
        </p>
        <p className='heading2'>Out-of-Pocket Damages</p>
        <p>
            Suppose in the example above that, instead of a positive price shock, company <MathJax inline>{"\\( A \\)"}</MathJax> experienced a negative price shock around the same time that investors discovered the fraud. For example, perhaps the government announced an increase rather than a reduction in tariffs. In this case, investors in company <MathJax inline>{"\\( A \\)"}</MathJax> experience an actual net loss much greater than the value of the false information 
            that managers put into the market. Can the portion of the loss attributable to the unrelated negative price shock be included in damages? No. Plaintiffs in a Rule 10b-5 case can only claim damages for losses attributable to fraud. 
        </p>
        <p>
            This concept of adjusting actual losses to account for non-fraud-related price movements shows up in the articulation of plaintiffs' "out-of-pocket" damages in a Rule 10b-5 case. 
            Out-of-pocket damages are measured as "the difference between the fair value of all that the [plaintiff] received and the fair value of what he would have received had there been no fraudulent conduct"
            (<a className='inline-link' href="https://supreme.justia.com/cases/federal/us/406/128/" target="_blank"><i>Affiliated Ute Citizens of Utah v. United States</i>, 406 U.S. 128, 155 (1972)</a>) or, in the case of securities traded in an efficient market, the difference between the price at which investors purchased their 
            shares and the price at which they would have purchased their shares had there been no fraud.
        </p>
        <p>
        Calculating out-of-pocket damages involves the creation of a counterfactual price line at which the stock would have traded in the absence of fraud. The difference between the actual price and the counterfactual no-fraud price can vary over time if there are multiple instances of false disclosure or if the market discovers the fraud gradually over time through multiple corrective disclosures. 
        Expert economists estimate this counterfactual no-fraud price line using event studies around each relevant information disclosure date. The goal of an event study is to measure what portion of the price movement around a news event can be attributed to investors pricing in the value of the news (as opposed to other market factors). A standard event study involves (1) training a model to predict the company's stock price returns using past pricing data, 
        (2) using this model to predict stock price returns during the event window, or the period of time during which the market prices in the news, (3) calculating abnormal returns during the event window as the difference between the actual return and the predicted return, and (4) summing up abnormal returns over the event window to capture the full price effect from the news. The sum of the abnormal returns over the event window is called the cumulative abnormal return, which 
        can be used to estimate by how much the news event caused the stock price to increase or decrease.
        </p>
        <p>
        To see how this works in practice, let's construct a counterfactual no-fraud price line together using the results from event studies around 4 relevant information dates. At date 1, managers release false good news about the company that increases price by $3 per share; at date 2, managers release more false news that increases price by $2 per share; at date 3, investors discover that some of the news was false, which causes the price to fall by $1; finally, at date 4, 
        investors discover the full truth, which causes the price to fall by $4 per share.
        </p>
        <div className='figure'>
        <svg width="400" height="120">
          {/* Main horizontal line */}
          <line x1="20" y1="60" x2="360" y2="60" stroke="black" strokeWidth="2" />

          {/* Arrow at the right end */}
          <line x1="360" y1="60" x2="380" y2="60" stroke="black" strokeWidth="2" />
          <polygon points="380,60 370,55 370,65" fill="black" />

          {/* Tick marks */}
          <line x1="80" y1="50" x2="80" y2="70" stroke="black" />
          <line x1="160" y1="50" x2="160" y2="70" stroke="black" />
          <line x1="240" y1="50" x2="240" y2="70" stroke="black" />
          <line x1="320" y1="50" x2="320" y2="70" stroke="black" />

          {/* Tick labels */}
          <text x="80" y="85" textAnchor="middle">1</text>
          <text x="160" y="85" textAnchor="middle">2</text>
          <text x="240" y="85" textAnchor="middle">3</text>
          <text x="320" y="85" textAnchor="middle">4</text>

          <text x="78" y="40" textAnchor="middle">+$3</text>
          <text x="158" y="40" textAnchor="middle">+$2</text>
          <text x="238" y="40" textAnchor="middle">-$1</text>
          <text x="318" y="40" textAnchor="middle">-$4</text>

          <text x="200" y="105" textAnchor="middle">Date</text>
          <text x="200" y="20" textAnchor="middle">Abnormal Price Reaction</text>
        </svg>
        </div>
        <p>
        Using these abnormal price reactions, we can find the amount of price inflation during each period. Before date 1, price inflation was $0; between date 1 and date 2, 
        price inflation was $3; between date 2 and date 3, price inflation was $3 + $2 = $5; between date 3 and date 4, price inflation was $3 + $2 - $1 = $4; finally, after date 4, price inflation was 
        $3 + $2 - $1 - $4 = $0. If the counterfactual price without fraud were a straight line at $10, the actual price graph would look like this
        </p>
        <div className='figure'>
        <svg width="440" height="240">
          <line x1="60" y1="80" x2="380" y2="80" stroke="#CC79A7" strokeWidth="2" stroke-dasharray="5,5" />

          <polygon points="420,180 410,175 410,185" fill="black" />
          <polygon points="55,20 60,10 65,20" fill="black" />

          <text x="240" y="220" textAnchor="middle">Date</text>
          <text x="17" y="105" textAnchor="middle">Price</text>


          <line x1="50" y1="130" x2="70" y2="130" stroke="black" />
          <line x1="50" y1="80" x2="70" y2="80" stroke="black" />
          <line x1="50" y1="30" x2="70" y2="30" stroke="black" />

          <text x="43" y="135" textAnchor="middle">5</text>
          <text x="40" y="85" textAnchor="middle">10</text>
          <text x="40" y="35" textAnchor="middle">15</text>

          <line x1="120" y1="190" x2="120" y2="170" stroke="black" />
          <line x1="200" y1="190" x2="200" y2="170" stroke="black" />
          <line x1="280" y1="190" x2="280" y2="170" stroke="black" />
          <line x1="360" y1="190" x2="360" y2="170" stroke="black" />

          <text x="120" y="205" textAnchor="middle">1</text>
          <text x="200" y="205" textAnchor="middle">2</text>
          <text x="280" y="205" textAnchor="middle">3</text>
          <text x="360" y="205" textAnchor="middle">4</text>

          <line x1="60" y1="80" x2="120" y2="80" stroke="#56B4E9" strokeWidth="2" />
          <line x1="120" y1="50" x2="200" y2="50" stroke="#56B4E9" strokeWidth="2" />
          <line x1="200" y1="30" x2="280" y2="30" stroke="#56B4E9" strokeWidth="2" />
          <line x1="280" y1="40" x2="360" y2="40" stroke="#56B4E9" strokeWidth="2" />
          <line x1="360" y1="80" x2="380" y2="80" stroke="#56B4E9" strokeWidth="2" />

          <line x1="120" y1="80" x2="120" y2="50" stroke="#56B4E9" strokeWidth="2" />
          <line x1="200" y1="50" x2="200" y2="30" stroke="#56B4E9" strokeWidth="2" />
          <line x1="280" y1="30" x2="280" y2="40" stroke="#56B4E9" strokeWidth="2" />
          <line x1="360" y1="40" x2="360" y2="80" stroke="#56B4E9" strokeWidth="2" />

          <line x1="60" y1="180" x2="420" y2="180" stroke="black" strokeWidth="2" />
          <line x1="60" y1="180" x2="60" y2="20" stroke="black" strokeWidth="2" />
        </svg>
        </div>
        <p className='heading2'>PSLRA 90-Day Lookback</p>
        <p>
        The Private Securities Litigation Reform Act of 1995 (PSLRA) imposes a 90-day lookback provision that limits recovery to 
        the difference between the price at which investors purchased their shares and the average closing price of the stock from 
        the day the fraud is discovered to the day the investor sells her shares. The averaging stops after 90 days. So, if the investor 
        does not sell her shares for over 90 days after the revelation of fraud, the damage cap is calculated as the difference between the 
        purchase price and the average closing price of the stock from the day the fraud is discovered to 90 days after the fraud is discovered (<a className='inline-link' href="https://www.law.cornell.edu/uscode/text/15/78u-4" target="_blank">15 U.S.C. &sect; 78u-4(e)</a>).
        </p>
        <p>
        The 90-day lookback provision is written with a "standard" claimant under price inflation in mind who buys at an inflated price and sells after the fraud is revealed. It is not clear whether or how the provision would apply to claimants whose transactions all occur before the revelation of fraud. 
        The text of the statute also does not coherently define a damage cap in the case of a claimant who sells during a period of price depression and repurchases after the revelation of fraud. 
        </p>
        <p>
        Suppose the revelation of fraud occurs at time <MathJax inline>{"\\( t=0 \\)"}</MathJax>. Consider a buy/sell transaction pair. 
        For our purposes, we will apply the 90-day lookback rule to the transaction pair as follows: If both transactions occur before the revelation of fraud, do not impose a cap. 
        If the date of sale, <MathJax inline>{"\\( S \\)"}</MathJax>, occurs after the revelation of fraud and the date of purchase, <MathJax inline>{"\\( B \\)"}</MathJax>, occurs before the revelation of fraud, 
        the 90-day lookback limitation is given by <MathJax inline>{"\\( L_{90} = P_B - P_S^{90} \\)"}</MathJax>, where
        <MathJax className='math-container'>
            {`\\[
              P_S^{90} = 
              \\begin{cases}
                \\frac{1}{S}\\sum^{S}_{t=1}P_t & \\text{if } S < 90 \\\\
                \\frac{1}{90}\\sum^{90}_{t=1}P_t & \\text{if } S \\geq 90 
              \\end{cases}
            \\]`}
        </MathJax>
        If the date of purchase occurs after the revelation of fraud and the date of sale occurs before the revelation of fraud, 
        the 90-day lookback limitation is given by <MathJax inline>{"\\( L_{90} = P_B^{90} - P_S \\)"}</MathJax>, where
        <MathJax className='math-container'>
            {`\\[
              P_B^{90} = 
              \\begin{cases}
                \\frac{1}{S}\\sum^{B}_{t=1}P_t & \\text{if } B < 90 \\\\
                \\frac{1}{90}\\sum^{90}_{t=1}P_t & \\text{if } B \\geq 90 
              \\end{cases}
            \\]`}
        </MathJax>
        This formulation of the rule allows for a meaningful limitation in cases where investors short the stock during a period of price depression and then purchase to close their short position after the revelation of fraud.
        </p>
        <p className='heading2'>Nonstandard Claimants</p>
        <p>
        The typical plaintiff in a Rule 10b-5 case is a long-position equity investor that buys during a period of price inflation and sells after the revelation of fraud. However, many different types of security holders can be harmed by the mispricing caused by fraud, including bondholders, options traders, and short sellers. 
        In addition, fraud may cause a stock price decrease (price depression) rather than a stock price increase (price inflation). Consider the following ways that you could be harmed by fraud:
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr className="table-row table-group-header">
              <th className="table-entry-head" colSpan={3}>Price Inflation</th>
              <th className="table-entry-head" colSpan={3}>Price Depression</th>
            </tr>
            <tr className="table-row table-column-label">
              <th className="table-entry-head">Before</th>
              <th className="table-entry-head">During</th>
              <th className="table-entry-head">After</th>
              <th className="table-entry-head">Before</th>
              <th className="table-entry-head">During</th>
              <th className="table-entry-head">After</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">short the stock</td>
              <td className="table-entry">close the short position</td>
              <td className="table-entry"></td>
              <td className="table-entry">buy the stock</td>
              <td className="table-entry">sell the stock</td>
              <td className="table-entry"></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">buy a put</td>
              <td className="table-entry">let the put expire</td>
              <td className="table-entry"></td>
              <td className="table-entry">buy a call</td>
              <td className="table-entry">let the call expire</td>
              <td className="table-entry"></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">write a call</td>
              <td className="table-entry">deliver stock to exercising counterparty</td>
              <td className="table-entry"></td>
              <td className="table-entry">write a put</td>
              <td className="table-entry">receive stock from exercising counterparty</td>
              <td className="table-entry"></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">buy the stock</td>
              <td className="table-entry">sell the stock</td>
              <td className="table-entry"></td>
              <td className="table-entry">short the stock</td>
              <td className="table-entry">close the short position</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">buy a call</td>
              <td className="table-entry">let the call expire</td>
              <td className="table-entry"></td>
              <td className="table-entry">buy a put</td>
              <td className="table-entry">let the put expire</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"></td>
              <td className="table-entry">write a put</td>
              <td className="table-entry">receive stock from exercising counterparty</td>
              <td className="table-entry"></td>
              <td className="table-entry">write a call</td>
              <td className="table-entry">deliver stock to exercising counterparty</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p className='heading2'>Price Maintenance</p>
        <p>
        So far, we have thought of fraud as having two visible price effects, one on the front end when managers release the false news and the other on the back end when the market discovers the fraud. 
        Fraud can also occur with only one visible price effect on the back end. In this scenario, rather than affirmatively release false news about the company, managers simply hide true news about the company that, if revealed, would change the stock price. 
        Here, rather than inflate or depress the stock price with false information, managers maintain the current (incorrect) stock price by withholding material information from investors. 
        </p>
        <p>
        Because there is no front-end price effect and damages are limited to actual investor losses, the ways in which an investor can be harmed by fraud in the price maintenance case are more limited. Consider the following potential plaintiffs under price maintenance:
        </p>
       <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr className="table-row table-group-header">
              <th className="table-entry-head" colSpan={2}>Withhold Bad News</th>
              <th className="table-entry-head" colSpan={2}>Withhold Good News</th>
            </tr>
            <tr className="table-row table-column-label">
              <th className="table-entry-head">During</th>
              <th className="table-entry-head">After</th>
              <th className="table-entry-head">During</th>
              <th className="table-entry-head">After</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">buy the stock</td>
              <td className="table-entry">sell the stock</td>
              <td className="table-entry">short the stock</td>
              <td className="table-entry">close the short position</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">buy a call</td>
              <td className="table-entry">let the call expire</td>
              <td className="table-entry">buy a put</td>
              <td className="table-entry">let the put expire</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">write a put</td>
              <td className="table-entry">receive stock from exercising counterparty</td>
              <td className="table-entry">write a call</td>
              <td className="table-entry">deliver stock to exercising counterparty</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
         To recover damages based on a transaction pair that straddles the date when the fraud enters the market under price maintenance, there must be other, non-fraud-related price shocks that move in the same direction as the fraud during the class period. For example, 
         suppose company managers withhold true good news about the company that would have led to a price increase. Further, shortly after managers hide the good news, there is a market-wide downturn that leads to a price decline in the company's stock. An investor who purchases shares before the fraud event and sells shares before the revelation of fraud 
         has a valid claim against the company. Here, the investor has an actual loss because of the market-wide downturn as well as a fraud loss because he would have sold at a higher price had managers not withheld the information.
        </p>
        <p className='heading2'>How to Calculate Damages</p>
        <p>
        Suppose we have a buy/sell transaction pair, where <MathJax inline>{"\\( P_B \\)"}</MathJax> and <MathJax inline>{"\\( P_S \\)"}</MathJax> represent the actual purchase and sale prices and <MathJax inline>{"\\( P_B' \\)"}</MathJax> and <MathJax inline>{"\\( P_S' \\)"}</MathJax> represent 
        the counterfactual no-fraud purchase and sale prices. There are three steps to determining damages:
        <ol>
          <li>Calculate actual investor loss: <MathJax inline>{"\\( L = P_B - P_S \\)"}</MathJax>.</li>
          <li>Calculate fraud loss: <MathJax inline>{"\\( L_f = L - (P_B' - P_S') = (P_B - P_S) - (P_B' - P_S') \\)"}</MathJax>.</li>
          <li>If applicable, limit damages by the 90-day lookback rule.</li>
        </ol>
        If <MathJax inline>{"\\( L \\leq 0 \\)"}</MathJax> or <MathJax inline>{"\\( L_f \\leq 0 \\)"}</MathJax>, there are no damages. If <MathJax inline>{"\\( L, L_f > 0 \\)"}</MathJax> and the transactions straddle the date of fraud discovery, then we calculate the 90-day lookback 
        limitation, <MathJax inline>{"\\( L_{90} \\)"}</MathJax>, as described above. If <MathJax inline>{"\\( L, L_f > 0 \\)"}</MathJax> and the transactions both occur before fraud discovery, then we do not apply a 90-day lookback limitation. 
        Finally, we take the smallest of the measures we have calculated. If we have a 90-day lookback limitation, damages are given by 
        <MathJax className='math-container'>
            {`\\[
              D = \\text{max}\\{0, \\text{min} \\{L, L_f, L_{90}\\}\\}
            \\]`}
        </MathJax>
        If we do not have a 90-day lookback limitation, damages are given by 
        <MathJax className='math-container'>
            {`\\[
              D = \\text{max}\\{0, \\text{min} \\{L, L_f\\}\\}
            \\]`}
        </MathJax>     
        </p>
        <p>
        Let's go through the steps using a table format. First, identify the actual purchase and sale prices and the counterfactual no-fraud purchase and sale prices and write them in a table like this 
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th></th>
              <th className="table-entry-head" colSpan={2}>Price</th>
            </tr>
            <tr>
              <th></th>
              <th className="table-entry-head">Actual</th>
              <th className="table-entry-head">Without Fraud</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry-head">Purchase</td>
              <td className="table-entry"><MathJax inline>{"\\( P_B \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_B' \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-head">Sale</td>
              <td className="table-entry"><MathJax inline>{"\\( P_S \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_S' \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        Next, subtract the "Sale" row from the "Purchase" row to get a "Loss" row.
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th></th>
              <th className="table-entry-head" colSpan={2}>Price</th>
            </tr>
            <tr>
              <th></th>
              <th className="table-entry-head">Actual</th>
              <th className="table-entry-head">Without Fraud</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry-head">Purchase</td>
              <td className="table-entry"><MathJax inline>{"\\( P_B \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_B' \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-head">Sale</td>
              <td className="table-entry"><MathJax inline>{"\\( P_S \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_S' \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-head">Loss</td>
              <td className="table-entry"><MathJax inline>{"\\( (P_B - P_S) \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( (P_B' - P_S') \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
         Now, subtract the "Actual Loss" entry from the "Without Fraud Loss" entry as so 
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th></th>
              <th className="table-entry-head" colSpan={2}>Price</th>
            </tr>
            <tr>
              <th></th>
              <th className="table-entry-head">Actual</th>
              <th className="table-entry-head">Without Fraud</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry-head">Purchase</td>
              <td className="table-entry"><MathJax inline>{"\\( P_B \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_B' \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-head">Sale</td>
              <td className="table-entry"><MathJax inline>{"\\( P_S \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_S' \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-head">Loss</td>
              <td className="table-entry"><MathJax inline>{"\\( (P_B - P_S) \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( (P_B' - P_S') \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( (P_B - P_S) - (P_B' - P_S') \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        This gives us the actual loss and the fraud loss
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th></th>
              <th className="table-entry-head" colSpan={2}>Price</th>
            </tr>
            <tr>
              <th></th>
              <th className="table-entry-head">Actual</th>
              <th className="table-entry-head">Without Fraud</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry-head">Purchase</td>
              <td className="table-entry"><MathJax inline>{"\\( P_B \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_B' \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-head">Sale</td>
              <td className="table-entry"><MathJax inline>{"\\( P_S \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( P_S' \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry-head">Loss</td>

              {/* L = (P_B - P_S) */}
              <td className="table-entry">
                <span className="circle-label">
                  <MathJax inline>{"\\( (P_B - P_S) \\)"}</MathJax>
                  <span className="circle-tag"><MathJax inline>{"\\( L \\)"}</MathJax></span>
                </span>
              </td>

              <td className="table-entry">
                <MathJax inline>{"\\( (P_B' - P_S') \\)"}</MathJax>
              </td>

              {/* L_f = (P_B - P_S) - (P_B' - P_S') */}
              <td className="table-entry">
                <span className="circle-label">
                  <MathJax inline>{"\\( (P_B - P_S) - (P_B' - P_S') \\)"}</MathJax>
                  <span className="circle-tag"><MathJax inline>{"\\( L_f \\)"}</MathJax></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        If either the actual or fraud loss are negative, then there are no damages, and we are done. If <MathJax inline>{"\\( L, L_f > 0\\)"}</MathJax>, then we 
        move on to see whether the 90-day lookback limitation applies. If the transactions straddle the date of fraud discovery, then we calculate <MathJax inline>{"\\( L_{90} \\)"}</MathJax> as described above.
        </p>
        <p>
        Finally, we take the smallest of the three measures (<MathJax inline>{"\\( L \\)"}</MathJax>, <MathJax inline>{"\\( L_f \\)"}</MathJax>, <MathJax inline>{"\\( L_{90} \\)"}</MathJax>) as our final damage measure.
        </p>
        <p>
        Use the graph on the next page to practice calculating damages under different fraud settings.</p>
        </MathJaxContext>
        <PageNavigator group="Damages"/>
        </div>
  );
}

export default Damage1;