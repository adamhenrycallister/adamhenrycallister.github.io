import React from 'react';
import './Misc.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function Misc() {
  return (
    	<div className=''>
    	<PageNavigator group="Misc" />
    		<p className='heading1'>Miscellaneous</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='Misc-link' to="/fourier">Fourier Transform</NavLink></li>
                    <ul className='toc-list'>
                        <li className='TD-content'><NavLink className='Misc-sublink' to="/fourier/complex_numbers">Complex Numbers</NavLink></li>
                        <li className='TD-content'><NavLink className='Misc-sublink' to="/fourier/series">Fourier Series</NavLink></li>
                        <li className='TD-content'><NavLink className='Misc-sublink' to="/fourier/transform">Fourier Transform</NavLink></li>
                        <li className='TD-content'><NavLink className='Misc-sublink' to="/fourier/heat_equation">Heat Equation</NavLink></li>
                        <li className='TD-content'><NavLink className='Misc-sublink' to="/fourier/discrete">Discrete Fourier Transform</NavLink></li>
                    </ul>               
                </div>
            </ul>
            </div>
    	<PageNavigator group="Misc"/>
        </div>
  );
}

export default Misc;