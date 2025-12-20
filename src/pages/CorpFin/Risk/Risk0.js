import React from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";

function Risk0() {
  return (
    	<div className='Risk'>
    	<PageNavigator group="Risk" />
    		<p className='heading1'>Risk</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='Risk-link' to="/corporate_finance/risk/intro">Introduction</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Risk-content'>Comparing Gambles</li>
                        <li className='Risk-content'>Expected Utility</li>
                        <li className='Risk-content'>Certainty Equivalent</li>
                        <li className='TD-content'>Examples</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Risk-link' to="/corporate_finance/risk/risk_aversion">Risk Aversion Measures</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Risk-content'>Concavity</li>
                        <li className='Risk-content'>Unique Preference Ordering</li>
                        <li className='Risk-content'>Risk Aversion Measures</li>
                        <li className='Risk-content'>Absolute vs. Relative Risk Aversion</li>
                        <li className='Risk-content'>Examples</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Risk-link' to="/corporate_finance/risk/diversification">Diversification</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Risk-content'>Independent Gambles</li>
                        <li className='Risk-content'>Risk Aversion and Diversification</li>
                        <li className='Risk-content'>Examples</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Risk-link' to="/corporate_finance/risk/efficient_frontier">Efficient Frontier</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Risk-content'>Portfolio Returns</li>
                        <li className='Risk-content'>Diversification</li>
                        <li className='Risk-content'>Mean and Variance Combinations</li>
                        <li className='Risk-content'>Many Assets</li>
                        <li className='Risk-content'>Risk-Free Asset</li>
                    </ul>
                </div>
            </ul>
            </div>
    	<PageNavigator group="Risk"/>
        </div>
  );
}

export default Risk0;