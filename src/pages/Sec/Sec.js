import React from 'react';
import './Sec.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function Sec() {
  return (
    	<div className=''>
    	<PageNavigator group="Sec" />
    		<p className='heading1'>Securities Regulation</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='Sec-link' to="/sec_reg/damages">Damages</NavLink></li>      
                    <ul className='toc-list'>
                        <li className='TD-content'><NavLink className='Misc-sublink' to="/sec_reg/damages/10b5">Rule 10b-5 Damages</NavLink></li>
                        <li className='TD-content'><NavLink className='Misc-sublink' to="/sec_reg/damages/10b5_graph">Rule 10b-5 Damage Graph</NavLink></li>
                    </ul>        
                </div>
            </ul>
            </div>
    	<PageNavigator group="Sec"/>
        </div>
  );
}

export default Sec;