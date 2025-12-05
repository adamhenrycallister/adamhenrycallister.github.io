import React from 'react';
import './Mortgages.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";

function Mortgages0() {
  return (
    	<div className='Mortgages'>
    	<PageNavigator group="Mortgages" />
    		<p className='heading1'>Mortgages</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='Mortgages-link' to="/mortgages/points">Mortgage Points</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Mortgages-content'>Monthly Payment Savings</li>
                        <li className='Mortgages-content'>Home Equity</li>
                        <li className='Mortgages-content'>Time Discounting</li>
                        <li className='Mortgages-content'>Alternative Setup</li>
                        <li className='Mortgages-content'>Decision Rule Comparisons</li>
                        <li className='Mortgages-content'>Taxes</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Mortgages-link' to="/mortgages/points_calculator">Mortgage Points Calculator</NavLink></li>
                </div>
            </ul>
            </div>
    	<PageNavigator group="Mortgages"/>
        </div>
  );
}

export default Mortgages0;