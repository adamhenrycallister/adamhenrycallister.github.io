import React from 'react';
import './Research.css';

function Research() {
  return (
    	<div className='Research'>
    		<p className='heading1'>Dissertation</p>

    		<p className='article'>Pricing in Securities Fraud (Job Talk Paper)</p>
    		<p className='abstract'>
          Calculating damages in securities fraud class actions typically involves comparing the price investors actually
          paid for their shares with the hypothetical price they would have paid had the fraud not occurred. Experts
          estimate this counterfactual using the abnormal stock price drop following the revelation of the fraud. I
          leverage variation in legal standards across federal circuits to show that this price drop reflects not only the
          market’s reassessment of the firm’s intrinsic value, but also investors’ expectations about the costs of future
          securities fraud litigation. As a result, the standard method overstates damages by conflating misinformation
          losses with litigation risk. I develop a model to show how courts could adjust damages awards to isolate
          the portion of the price drop attributable to the fraud itself. Such an adjustment could reduce damages in
          the average case by about 7.5% but must account for feedback effects, or the way a change in the damage
          calculation alters investors’ expectations about the costs of future securities suits. I also examine the role of
          directors and officers (D&O) insurance in absorbing litigation costs and argue that the price effect created by
          the presence of securities liability may enhance deterrence goals.
        </p>
    		<p className='article'><a className='link' href='https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5309471' target="_blank">Expert Asymmetry: Evidence from Securities Litigation</a> (with {' '}
          <a className='link' href="https://sites.google.com/view/andrewgranato/" target="_blank" rel="noopener noreferrer">
            Andrew Granato 
        </a>{' '}and{' '} 
        <a className='link' href="https://sites.google.com/yale.edu/belisapang" target="_blank" rel="noopener noreferrer">
            Belisa Pang
        </a>)</p>
    		<p className='journal'>
          <i>Journal of Empirical Legal Studies</i> (Revise and Resubmit)
 			  </p>
    		<p className='abstract'>
          Modern litigation often involves two separate, extra-legal features: (1) contingency fee arrangements
          with the plaintiff-side attorney, and (2) a “battle of the experts” where the outcome of the case rests
          on conflicting expert witness testimony. We construct a model to illustrate that when these features
          occur simultaneously, in contexts where plaintiff-side attorneys bear the cost of hiring experts upfront,
          defendants will spend systematically more than plaintiffs on hiring expert witnesses. Our model is
          motivated by hand-collected data from a decade of securities class action litigation, where we show that
          experts polarize into almost entirely plaintiff-side vs. defense-side experts, that defense-side experts are
          more “prestigious” in terms of educational and academic affiliations, and that defense-side experts are at
          least 37% more expensive in per-hour terms. We argue that expert asymmetry could be closed through
          optimal contracting in certain individual claims, but it is likely a necessary feature of all class actions, such
          as toxic torts or consumer protection, in an “adversarial” litigation system. This defense-side advantage
          therefore provides a newly identified rationale for “inquisitorial” litigation systems, including increased
          use of court-appointed experts under Federal Rule of Evidence 706 and state law analogues.
        </p>
    		<p className='article'>The Informative Value of Optional IPO Fraud Liability</p>
    		<p className='abstract'>
        The judiciary’s strict interpretation of Section 11 tracing has set us on a path toward a world in
        which companies can effectively choose whether they want to be subject to strict fraud liability for their
        IPO disclosures. Using a noisy valuation model, I characterize a separating equilibrium in which the
        decision to opt out of liability reveals that a company has reported high-noise disclosures that suggest an
        inflated stock value. In this equilibrium, investors use the information provided by an opt-out decision
        to appropriately discount the stock price and more accurately value the company. I suggest a simple
        regulatory change that would force managers to reveal their liability decision and make separation based
        on disclosure quality possible. Further, I show that increasing the costs of bringing a Section 11 claim or
        decreasing the potential damages available under Section 11 might encourage firms to separate themselves
        based on their liability decision.
        </p>

        <p className='heading1'>Works in Progress</p>

        <p className='article'>Securities Fraud Liability Under Profitable Fraud</p>
        <p className='abstract'>
        When managers of a public company undertake legally suspect projects, they expose the firm to two types
        of legal risk: (1) primary liability for the unlawful act itself; and (2) secondary liability for failing to disclose
        the act to investors, typically through a securities fraud class action. Secondary liability may deter socially
        inefficient corporate behavior, especially if primary enforcement is weak. But compensating investors for
        losses caused by managerial decisions that were <i>ex ante</i> profitable for the firm disincentivizes investors from
        uncovering fraud or putting in place monitoring mechanism to deter it. I use a model to examine this tradeoff
        and show conditions under which profit-maximizing investors would prefer the company not be subject to
        securities fraud liability for failure to disclose legally suspect conduct. Investors prefer no securities fraud
        liability precisely when it may be most socially valuable, or when primary enforcement of the socially inefficient
        conduct is low. I explore implications of these findings and argue for greater use of public, rather than private,
        securities fraud enforcement in cases of “profitable fraud.”
        </p>

        <p className='heading1'>Undergraduate Publications</p>

        <p><a className='link' href='https://doi.org/10.1007/s12134-021-00852-y' target='_blank'>Politics and Prejudice: 
        Using the Term 'Undocumented Immigrant' over 'Illegal Immigrant'</a><br /><i>Journal of International Migration 
        and Integration</i> (2022) (with Quinn Galbraith and Alexandra Carlile)</p>

        <p><a className='link' href='https://doi.org/10.1111/asap.12218' target='_blank'>Deportation in the Trump Era: 
        Americans Weigh In</a><br /><i>Analyses of Social Issues and Public Policy</i> (2020) (with Quinn Galbraith and Alexandra Carlile)</p>

        <p><a className='link' href='https://doi.org/10.1177/0739986319899738' target='_blank'>Why Would Hispanics Vote for Trump? 
        Explaining the Controversy of the 2016 Election</a><br /><i>Hispanic Journal of Behavioral Sciences</i> (2020) (with Quinn Galbraith)</p>

        <p><a className='link' href='https://doi.org/10.1177/0739986319840717' target='_blank'>Immigration, Deportation, and Discrimination: 
        Hispanic Political Opinion Since the Election of Donald Trump</a><br /><i>Hispanic Journal of Behavioral Sciences</i> (2019) (with Quinn Galbraith and Spencer Galbraith)</p>

        <p><a className='link' href='https://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=6805&context=facpub' target='_blank'>Constructing Meaning through Connection: 
        Religious Perspectives on the Purpose of Life</a><br /><i>International Journal of Religion & Spirituality in Society</i> (2019) (with Quinn Galbraith and Heather Kelley)</p>

          <p><a className='link' href='http://dx.doi.org/10.25595/1417' target='_blank'>Have Academic Libraries Overcome the Gender Wage Gap? 
          An Analysis of Gender Pay Inequality</a><br /><i>College & Research Libraries</i> (2019) (with Quinn Galbraith and Heather Kelley)</p>

        </div>
  );
}

export default Research;