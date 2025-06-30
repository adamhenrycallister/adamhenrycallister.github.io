import React from 'react';
import './Home.css';
import {BrowserView, MobileView} from "react-device-detect";

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
                My research examines how overlapping legal regimes—particularly in securities fraud enforcement—shape 
                incentives for investors, managers, and regulators. I use tools from law, economics, and data science 
                to assess whether these systems function as intended and produce normatively desirable outcomes.
              </p>
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
            My research examines how overlapping legal regimes—particularly in securities fraud enforcement—shape 
            incentives for investors, managers, and regulators. I use tools from law, economics, and data science 
            to assess whether these systems function as intended and produce normatively desirable outcomes.
          </p>
        </div>
      </MobileView>
    </main>
  );
}

export default Home;
