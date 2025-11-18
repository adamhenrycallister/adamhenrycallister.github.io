import React from 'react';
import './MA.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function MA() {
  return (
    	<div className=''>
    	<PageNavigator group="MA" />
    		<p className='heading1'>Mergers & Acquisitions</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='MA-link' to="/ma/del_incorp">Delaware Incorporation</NavLink></li>            
                </div>
            </ul>
            </div>
    	<PageNavigator group="MA"/>
        </div>
  );
}

export default MA;