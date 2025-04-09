import React from 'react';
import './Fourier.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";

function Fourier0() {
  return (
    	<div className='Fourier'>
    	<PageNavigator group="Fourier" />
    		<p className='heading1'>Fourier Transform</p>
            <div style={{ display: "flex", paddingLeft: "10vw"}}>
            <ul className='toc-list'>
                <div className='content-group'>
                    <li><NavLink className='Fourier-link' to="/fourier/complex_numbers">Complex Numbers</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Fourier-content'>Euler's Identity</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Fourier-link' to="/fourier/series">Fourier Series</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Fourier-content'>Definition</li>
                        <li className='Fourier-content'>Box Function</li>
                        <li className='Fourier-content'>Examples</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Fourier-link' to="/fourier/transform">Fourier Transform</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Fourier-content'>Definition</li>
                        <li className='Fourier-content'>Gaussian Function</li>
                        <li className='Fourier-content'>Convolution</li>
                    </ul>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Fourier-link' to="/fourier/heat_equation">Heat Equation</NavLink></li>
                </div>
                <div className='content-group'>
                    <li><NavLink className='Fourier-link' to="/fourier/discrete">Discrete Fourier Transform</NavLink></li>
                    <ul className='toc-list'>
                        <li className='Fourier-content'>Definition</li>
                        <li className='Fourier-content'>Approximation</li>
                        <li className='Fourier-content'>Numerical Example</li>
                        <li className='Fourier-content'>Graph</li>
                    </ul>
                </div>
            </ul>
            </div>
    	<PageNavigator group="Fourier"/>
        </div>
  );
}

export default Fourier0;