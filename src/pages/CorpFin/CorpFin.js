import React from 'react';
import './CorpFin.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function CorpFin() {
  return (
    	<div className=''>
    	<PageNavigator group="CorpFin" />
    		<p className='heading1'>Corporate Finance</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='CorpFin-link' to="/corporate_finance/time_discounting">Time Discounting</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/time_discounting/intro">Introduction</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/time_discounting/compound_interest">Compound Interest</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/time_discounting/annuities">Annuities</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/time_discounting/bonds">Bonds</NavLink></li>
                    </ul>  
                    <li><NavLink className='CorpFin-link' to="/corporate_finance/risk">Risk</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/risk/intro">Introduction</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/risk/risk_aversion">Risk Aversion</NavLink></li>
                    </ul>
                    <li><NavLink className='CorpFin-link' to="/corporate_finance/black_scholes">Black-Scholes</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/preliminaries">Preliminaries</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/stochastic_calculus">Stochastic Calculus</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/equation">Black-Scholes Equation</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/transformation">Black-Scholes Transformation</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/pricing">Pricing a European Call Option</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/statics">Comparative Statics</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/calculator_graph">Calculator/Graph</NavLink></li>
                        <li className='TD-content'><NavLink className='CorpFin-sublink' to="/corporate_finance/black_scholes/volatility">Volatility</NavLink></li>
                    </ul>               
                </div>
            </ul>
            </div>
    	<PageNavigator group="CorpFin"/>
        </div>
  );
}

export default CorpFin;