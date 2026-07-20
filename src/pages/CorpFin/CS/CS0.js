import React from 'react';
import './CS.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";

function CS0() {
  return (
    	<div className='CS'>
    	<PageNavigator group="CS" />
    		<p className='heading1'>Capital Structure</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='CS-link' to="/corporate_finance/capital_structure/mm">Modigliani and Miller Theorem</NavLink></li>
                    <ul className='toc-list'>
                        <li className='CS-content'>Capital Structure Basics</li>
                        <li className='CS-content'>Modigliani and Miller Assumptions</li>
                        <li className='CS-content'>Modigliani and Miller Proof</li>
                        <li className='CS-content'>Intuition</li>
                        <li className='CS-content'>Numerical Example</li>
                        <li className='CS-content'>Examples</li>
                    </ul>
                </div>
            </ul>
            </div>
    	<PageNavigator group="CS"/>
        </div>
  );
}

export default CS0;