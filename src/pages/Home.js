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
              <p className='intro'>I am a JD-PhD student in financial economics at Yale with an expected graduation date in the fall of 2025 or spring of 2026.</p>
			       <p className='intro'>I research the incentive structures of the U.S. securities fraud system as well as the regulation of information disclosure and market participation more broadly. Much of my research uses modeling and natural language data to offer normative insights into the effectiveness of different legal regimes.</p>
            </div>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className='homeCenterMobile'>
          <div className='picBoxMobile'/>
          <p className='NameMobile'>ADAM CALLISTER</p>
              <p className='introMobile'>I am a JD-PhD student in financial economics at Yale with an expected graduation date in the fall of 2025 or spring of 2026.</p>
			<p className='introMobile'>I research the incentive structures of the U.S. securities fraud system as well as the regulation of information disclosure and market participation more broadly. Much of my research uses modeling and natural language data to offer normative insights into the effectiveness of different legal regimes.</p>
        </div>
      </MobileView>
    </main>
  );
}

export default Home;
