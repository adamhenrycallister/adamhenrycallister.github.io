import React from 'react';
import './BlackScholes.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function BS0() {
  return (
    	<div className='BlackScholes'>
    	<PageNavigator group="BS" />
    		<p className='heading1'>Black-Scholes Derivative Pricing</p>
    		<p>The famous Black-Scholes equation is used to price derivatives, or financial contracts whose value is determined by the price of another, underlying asset. 
    		Here, we'll go through the process of deriving the Black-Scholes equation, use it to price a European call option, and talk about how different factors influence derivative pricing. 
    		A working knowledge of first-year calculus is assumed. We'll introduce more advanced topics as needed for the derivation. 
    		To follow along, make sure you are comfortable with the concepts in the "Preliminaries" section. </p>
            <MathJaxContext>
    		<div style={{ display: "flex", paddingLeft: "10vw"}}>
    		<ul className='toc-list'>
    			<div className='content-group'>
    			    <li><NavLink className='BS-link' to="/black_scholes/preliminaries">Preliminaries</NavLink></li>
	                <ul className='toc-list'>
	                	<li className='BS-content'>Change of Variables</li>
	                	<li className='BS-content'>Differential Equations</li>
	                	<li className='BS-content'>Normal Distribution</li>
                        <li className='BS-content'>Implicit Differentiation</li>
	                </ul>
    			</div>
    			<div className='content-group'>
    				<li><NavLink className='BS-link' to="/black_scholes/stochastic_calculus">Stochastic Calculus</NavLink></li>
	                <ul className='toc-list'>
	                	<li className='BS-content'>Brownian Motion</li>
	                	<li className='BS-content'>Ito's Lemma</li>
	                	<li className='BS-content'>Geometric Brownian Motion</li>
	                </ul>   				
    			</div>
                <div className='content-group'>
                	<li><NavLink className='BS-link' to="/black_scholes/equation">Black-Scholes Equation</NavLink></li>
           	        <ul className='toc-list'>
	                	<li className='BS-content'>Setup</li>
	                	<li className='BS-content'>Risk-Free Portfolio</li>
	                	<li className='BS-content'>No-Arbitrage Condition</li>
	                </ul>
                </div>
                <div className='content-group'>
                	<li><NavLink className='BS-link' to="/black_scholes/transformation">Black-Scholes Transformation</NavLink></li>
           	        <ul className='toc-list'>
	                	<li className='BS-content'>Overview</li>
	                	<li className='BS-content'>Change of Variables - Stock Price</li>
	                	<li className='BS-content'>Change of Variables - Time and Derivative Price</li>
	                </ul>
                </div>
                <div className='content-group'>
                	<li><NavLink className='BS-link' to="/black_scholes/pricing">Pricing a European Call Option</NavLink></li>
           	        <ul className='toc-list'>
	                	<li className='BS-content'>Overview</li>
	                	<li className='BS-content'>Initial Condition</li>
	                	<li className='BS-content'>Transformed Solution</li>
	                	<li className='BS-content'>Pricing Equation</li>
                        <li className='BS-content'>Example</li>
	                </ul>
                </div>
                <div className='content-group'>
                	<li><NavLink className='BS-link' to="/black_scholes/statics">Comparative Statics</NavLink></li>
           	        <ul className='toc-list'>
	                	<li className='BS-content'>Overview</li>
	                	<li className='BS-content'>Stock Price</li>
	                	<li className='BS-content'>Strike Price</li>
	                	<li className='BS-content'>Risk-free Rate</li>
	                	<li className='BS-content'>Volatility</li>
	                	<li className='BS-content'>Time to Expiration</li>
                        <li className='BS-content'>Summary</li>
	                </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='BS-link' to="/black_scholes/calculator_graph">Calculator/Graph</NavLink></li>
                </div>
                <div className='content-group'>
                    <li><NavLink className='BS-link' to="/black_scholes/volatility">Volatility</NavLink></li>
                    <ul className='toc-list'>
                        <li className='BS-content'>Realized Volatility</li>
                        <li className='BS-content'>Implied Volatility</li>
                        <li className='BS-content'>Expected Volatility</li>
                        <li className='BS-content'>Implied Volatility <MathJax inline>{"\\( \\neq \\)"}</MathJax> Expected Volatility</li>
                        <li className='BS-content'>Imperfect Hedging Graph</li>
                    </ul>
                </div>
            </ul>
            </div>
            </MathJaxContext>
    	<PageNavigator group="BS"/>
        </div>
  );
}

export default BS0;