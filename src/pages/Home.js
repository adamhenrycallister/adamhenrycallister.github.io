import React from 'react';
import './Home.css';
import {BrowserView, MobileView} from "react-device-detect";
import ContactIcons from "../components/ContactIcons";

function Home() {
  return (
    <main>
      <BrowserView>
        <div className='homeCenter'>
          <div className='container'>
            <div className='oval'/>
            <div className='wordContainer'>
              <p className='Name'>ADAM CALLISTER</p>
              <p className='intro'>
                I am a JD-PhD candidate in financial economics at Yale, entering the academic job market in Fall 2025. 
                I study how legal rules function in complex institutional environments where their effects depend on market structure, 
                litigation dynamics, and stakeholder incentives. Using tools from economics—including formal modeling, causal inference, 
                and natural language processing—I analyze how regulation interacts with preexisting systems in sometimes unexpected ways.
                Much of my work uses securities fraud class actions as an empirical setting, but my approach extends to broader questions 
                in administrative law, corporate governance, and professional responsibility.
              </p>
            <div className='intro'><ContactIcons /></div>
            </div>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className='homeCenterMobile'>
          <div className='picBoxMobile'/>
          <p className='NameMobile'>ADAM CALLISTER</p>
          <p className='introMobile'>
            I am a JD-PhD candidate in financial economics at Yale, entering the academic job market in Fall 2025. 
                I study how legal rules function in complex institutional environments where their effects depend on market structure, 
                litigation dynamics, and stakeholder incentives. Using tools from economics—including formal modeling, causal inference, 
                and natural language processing—I analyze how regulation interacts with preexisting systems in sometimes unexpected ways.
                Much of my work uses securities fraud class actions as an empirical setting, but my approach extends to broader questions 
                in administrative law, corporate governance, and professional responsibility.
          </p>
        <div className='introMobile'><ContactIcons /></div>
        </div>
      </MobileView>
    </main>
  );
}

export default Home;
