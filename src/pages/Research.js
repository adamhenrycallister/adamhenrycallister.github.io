import React from 'react';
import './Research.css';

function Research() {
  return (
    	<div className='Research'>
    		<p className='heading1'>Working Papers</p>

    		<p className='article'>Pricing in Securities Fraud</p>
    		<p className='abstract'>When investors find out that a company lied in its disclosures to artificially inflate its stock price, the company's stock price should drop to reflect the perceived value of the false information. It is an open question whether, as an empirical matter, this stock price drop also includes investors' expectations of the costs the company may incur in future securities fraud litigation related to the lie. I leverage variation in the legal standards applied by different judicial circuits to test whether investors price in the expected costs of a future securities suit upon revelation of fraud using both a propensity score matching and reverse difference-in-differences approach. Both identification strategies suggest that part of the stock price drop following the revelation of fraud includes investors' expectations of the costs of a future securities suit. Courts can adjust the potential damages in a securities suit to account for this price effect by estimating expected settlement amounts using past cases. Such an adjustment could reduce potential damages in the average case by about 7.5%. In addition, this price effect creates new questions about the role of D&O insurance and has positive implications for fraud deterrence. </p>

    		<p className='article'>Experts in Securities Litigation</p>
    		<p className='coauthors'>With{' '}
    			<a className='link' href="https://sites.google.com/view/andrewgranato/" target="_blank" rel="noopener noreferrer">
  					Andrew Granato 
				</a>{' '}and{' '} 
				<a className='link' href="https://sites.google.com/yale.edu/belisapang" target="_blank" rel="noopener noreferrer">
  					Belisa Pang
				</a>
 			</p>
    		<p className='abstract'>Modern litigation often involves two separate, extra-legal features: (1) contingency fee arrangements with the plaintiff-side lawyer, and (2) a "battle of the experts" where the outcome of the case rests on conflicting expert witness testimony about scientific or social scientific issues. We construct a model to illustrate that when these features occur simultaneously, in class action contexts where plaintiff-side lawyers bear the cost of hiring experts upfront, defendants will be willing to spend systematically more than plaintiffs to hire "better" expert witnesses. Our model is motivated by our empirical findings in the securities litigation context, where we show that experts polarize into almost entirely plaintiff-side vs. defense-side experts, that defense-side experts are more "prestigious" in terms of educational and academic affiliations, and that defense-side experts are at least 37% more expensive in per-hour terms. We argue that this asymmetry could be equalized through optimal contracting in individual claims, but it is likely a necessary feature of all class action litigation, such as toxic torts or consumer protection.</p>

    		<p className='article'>The Informative Value of Optional IPO Fraud Liability</p>
    		<p className='abstract'>The judiciary's strict interpretation of Section 11 tracing has set us on a path toward a world in which companies can effectively choose whether they want to be subject to strict fraud liability for their IPO disclosures. Using a noisy valuation model, I characterize a separating equilibrium in which the decision to opt out of liability reveals that a company has reported high-noise disclosures that suggest an inflated stock value. In this equilibrium, investors use the information provided by an opt-out decision to appropriately discount the stock price and more accurately value the company. I suggest a simple regulatory change that would force managers to reveal their liability decision and make separation based on disclosure quality possible. Further, I show that increasing the costs of bringing a Section 11 claim or decreasing the potential damages available under Section 11 might encourage firms to separate themselves based on their liability decision.</p>

        </div>
  );
}

export default Research;