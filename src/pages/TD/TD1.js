import React from 'react';
import './TimeDiscounting.css';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../components/PageNavigator";

function TD1() {
  return (
    	<div className='TimeDiscounting'>
    	<PageNavigator group="TD" />
    		<p className='heading1'>Introduction</p>
    	<MathJaxContext>
    	<p className='heading2'>Explanations for Time Discounting</p>
    	<p>Suppose someone asks you to lend them $100 now with the promise that they will pay you back in a year. 
    	Let's ignore inflation and assume you have no other investment opportunities. 
    	How much should they pay you in a year to make it worth it for you to give them the money now? 
    	There are many reasons why your answer might be, "More than $100." 
    	</p>
    	<p>
		First, you might inherently prefer consuming more today over consuming more one year from now. 
		In other words, spending $100 in a year might not be worth as much to you as spending $100 today simply because you value your present welfare more than you do your future welfare. 
		Under this reasoning, time discounting, or the tendency to place a lower value on future utility or rewards compared to immediate utility or rewards, arises out of a rational, inherent prefence for more immediate benefits. 
		</p>
		<p>
		Second, you might equally prefer&mdash;or even favor&mdash;consumption one year from now, but you overvalue today's consumption because of a behavioral bias. In other words, it may be that spending $100 in a year would increase your overall welfare more than spending $100 today, but 
		you still choose consumption today because of impatience or lack of self control. Under this reasoning, deviations from rationality may also contribute to time discounting. 
		</p>
		<p>
		Third, even without an inherent preference for early consumption or a behavioral bias, you might still choose consumption today over consumption one year from now because of risk. If you choose to put off your consumption to one year from now, there is some chance that you will not be alive in a year to consume. 
		You also face the risk that the person you have lent money to will be unable to repay you in a year. In this way, variability in possible future outcomes might also lead you to prefer sure consumption today over uncertain consumption one year from now. However, we typically think of risk as a separate pricing mechanism from time discounting. 
		So, for now, we'll assume we can be certain about future outcomes and look to the first two reasons as an explanation for time discounting. 
    	</p>
    	<p className='heading2'>Discount Rate</p>
    	<p>
    	Stepping back from our simplified example without inflation or other investment opportunities, we can see that time discounting is baked into our financial systems. This means that even people without an individual preference for early consumption should still apply time discounting. We live in an economy where inflation decreases the nominal value of money over time. 
    	A bundle of goods purchased today will cost less than the same bundle of goods purchased one year from now. 
    	Thus, if offered the same amount of money today or in a year, you should prefer the money today because it will get you a bigger bundle of goods today than it would in a year.
    	</p>
    	<p>
    	We also live in an economy in which we can make a (almost) risk-free investment and expect to receive more money back than we put in. For example, consider a U.S. treasury bill (T-bill). T-bills are like an IOU from the U.S. government. Each bill has a face value that the government promises to pay at some future date (when the bill matures). 
    	Most people consider T-bills to be a (almost) riskless investment, meaning they believe the U.S. government will almost certainly pay the face value upon maturity. However, the U.S. government still issues T-bills for less than their face value. This means you can puchase a T-bill with a face value of $1,000 and a maturity date one year from now for less than $1,000. 
    	In this example, the ratio of the face value (or the money you will receive in the future) and the price (or the money you pay today) minus one is equal to the discount rate, <MathJax inline>{"\\( r \\)"}</MathJax>. 
        <MathJax className='math-container'>
          {`\\[
            r = \\frac{FV}{P} - 1
          \\]`}
        </MathJax>
        More generally, the discount rate can be thought of as a measure for how much you must be compensated to take on an investment. The discount rate includes both a time-discounting component and a risk component. In other words, you might expect compensation for investing because it (1) moves the time during which you can use your money further out into the future and (2) creates 
        uncertainty about your ability to eventually use your money. The discount rate for an investment with no risk is called the risk-free rate. 
    	</p>
    	<p>
    	 Given multiple investment opportunities, the discount rate can also be thought of as a measure of the opportunity cost of taking on an investment, or the payout you could receive from taking on the next best investment with similar risk. 
    	</p>
    	</MathJaxContext>
    	<PageNavigator group="TD"/>
        </div>
  );
}

export default TD1;