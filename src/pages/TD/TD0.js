import React from 'react';
import './TimeDiscounting.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function TD0() {
  return (
    	<div className='TimeDiscounting'>
    	<PageNavigator group="TD" />
    		<p className='heading1'>Time Discounting</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='TD-link' to="/time_discounting/intro">Introduction</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'>Explanations for Time Discounting</li>
                        <li className='TD-content'>Discount Rate</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='TD-link' to="/time_discounting/compound_interest">Compound Interest</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'>Preliminaries</li>
                        <li className='TD-content'>No Compounding</li>
                        <li className='TD-content'>Compounding Every Period</li>
                        <li className='TD-content'>Compounding n Times Per Period</li>
                        <li className='TD-content'>Continuous Compounding</li>
                        <li className='TD-content'>Examples</li>
                    </ul>                   
                </div>
                <div className='content-group'>
                    <li><NavLink className='TD-link' to="/time_discounting/annuities">Annuities</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'>Preliminaries</li>
                        <li className='TD-content'>General Annuity Formula</li>
                        <li className='TD-content'>Perpetuity</li>
                        <li className='TD-content'>Fixed Payment Annuity</li>
                        <li className='TD-content'>Growth Annuity</li>
                        <li className='TD-content'>Examples</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='TD-link' to="/time_discounting/bonds">Bonds</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'>Preliminaries</li>
                        <li className='TD-content'>No-Coupon Bonds</li>
                        <li className='TD-content'>Coupon Bonds</li>
                        <li className='TD-content'>Convertible Bonds</li>
                        <li className='TD-content'>Examples</li>
                    </ul>
                </div>
            </ul>
            </div>
    	<PageNavigator group="TD"/>
        </div>
  );
}

export default TD0;