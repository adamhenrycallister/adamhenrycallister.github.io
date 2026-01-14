import React from 'react';
import './Stats.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";

function Stats0() {
  return (
    	<div className='Stats'>
    	<PageNavigator group="Stats" />
    		<p className='heading1'>Statistics</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='Stats-link' to="/stats/single_random_variable">Single Random Variable</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Stats-content'>Rolling Two Dice</li>
                        <li className='Stats-content'>Distribution</li>
                        <li className='Stats-content'>Expected Value</li>
                        <li className='Stats-content'>Variance</li>
                        <li className='Stats-content'>Placing a Settlement</li>
                        <li className='Stats-content'>Examples</li>
                    </ul>
                    <li><NavLink className='Stats-link' to="/stats/multiple_random_variable">Multiple Random Variables</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Stats-content'>Placing a Settlement Revisted</li>
                        <li className='Stats-content'>Expected Value</li>
                        <li className='Stats-content'>Covariance</li>
                        <li className='Stats-content'>Correlation</li>
                        <li className='Stats-content'>Examples</li>
                    </ul>
                    <li><NavLink className='Stats-link' to="/stats/samples">Samples</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Stats-content'>Population vs. Sample</li>
                        <li className='Stats-content'>Probabilities and Observations</li>
                        <li className='Stats-content'>Sample Statistics</li>
                    </ul>
                    <li><NavLink className='Stats-link' to="/stats/regression">Regression</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Stats-content'>Relationship Between Two Variables</li>
                        <li className='Stats-content'>Fitting a Line</li>
                        <li className='Stats-content'>Minimizing Squared Error</li>
                        <li className='Stats-content'>Interpreting Slope</li>
                    </ul>
                    <li><NavLink className='Stats-link' to="/stats/multivariate_regression">Regression with Multiple Variables</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Stats-content'>Matrix Form</li>
                        <li className='Stats-content'>Matrix Rules</li>
                        <li className='Stats-content'>Matrix Derivatives</li>
                        <li className='Stats-content'>Solving for Beta</li>
                        <li className='Stats-content'>Single Variable Case</li>
                        <li className='Stats-content'>Matrices Simplify Notation</li>
                    </ul>
                </div>
            </ul>
            </div>
    	<PageNavigator group="Stats"/>
        </div>
  );
}

export default Stats0;