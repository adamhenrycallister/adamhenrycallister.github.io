import React from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../components/PageNavigator";
import ExampleBox from "../../components/ExampleBox";

function Risk3() {
  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
            <p className='heading1'>Critiques</p>
        	<MathJaxContext>
            <p>

            </p>
            </MathJaxContext>
        <PageNavigator group="Risk"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/risk">Contents</NavLink></div>
        </div>
  );
}

export default Risk3;