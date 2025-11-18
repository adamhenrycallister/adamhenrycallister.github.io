import React from 'react';
import './Damage.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../../components/PageNavigator";

function Damage0() {
  return (
      <div className='Damage'>
      <PageNavigator group="Damages" />
        <p className='heading1'>Damages</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='Damage-link' to="/sec_reg/damages/10b5">Rule 10b-5</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Damage-content'>Actual Loss</li>
                        <li className='Damage-content'>Out-of-Pocket Damages</li>
                        <li className='Damage-content'>PSLRA 90-Day Lookback</li>
                        <li className='Damage-content'>Nonstandard Claimants</li>
                        <li className='Damage-content'>Price Maintenance</li>
                        <li className='Damage-content'>How to Calculate Damages</li>
                    </ul>
                    <li><NavLink className='Damage-link' to="/sec_reg/damages/10b5_graph">Rule 10b-5 Graph</NavLink></li>
                </div>
            </ul>
            </div>
      <PageNavigator group="Damages"/>
        </div>
  );
}

export default Damage0;