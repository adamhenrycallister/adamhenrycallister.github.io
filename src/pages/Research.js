import React from 'react';
import './Research.css';

function Research() {
  return (
    	<div className='Research'>
    		<p className='heading1'>Working Papers</p>

    		<p className='article'>The Informative Value of an Optional Section 11 Regime</p>
    		<p className='abstract'>Abstract: The judiciary’s strict interpretation of Section 11’s tracing requirement has set us on a path toward a world in which companies can effectively choose whether they want to be subject to liability for false statements in their IPO disclosures. Section 11 liability has the potential to increase managers’ incentives to perform adequate due diligence and lead to greater deterrence of fraud. However, allowing companies to opt out of Section 11 liability may reveal valuable information about the quality of the company’s disclosures. Using a noisy valuation model, I characterize a separating equilibrium in which the decision to opt out of liability reveals that a company has reported high-noise disclosures that suggest an inflated stock value. In this equilibrium, investors use the information provided by an opt-out decision to appropriately discount the stock price and more accurately value the company. To fully take advantage of the informative value of managers’ liability decisions, I suggest a simple regulatory change that would force companies to inform investors when they have chosen to opt out of Section 11 liability. Further, I show that increasing the costs of bringing a Section 11 claim or decreasing the potential damages available under Section 11 will likely encourage firms to separate themselves based on their liability decision.</p>

    		<p className='article'>Rethinking Securities Fraud Damages</p>
    		<p className='abstract'>Abstract: Our current securities fraud system partially insures investors against the risk of buying in at an inflated stock price by compensating them with securities fraud damages in the event the company pays out a settlement in a securities class action. However, compensation should not be the goal of securities fraud liability because there are instances in which even investors who receive securities fraud damages would do better in a world without securities fraud liability. Instead, securities fraud liability must be about deterring company managers from committing fraud. This can happen both directly through imposing monetary costs for committing fraud and indirectly through increasing investor incentives to put in place monitoring mechanism and conduct research aimed at uncovering fraud. To increase research incentives and ultimately reduce fraudulent activity, I propose a regulatory change that would remove the partial insurance of securities fraud liability and allow investors to more credibly reveal evidence of fraud to the market.</p>

        </div>
  );
}

export default Research;