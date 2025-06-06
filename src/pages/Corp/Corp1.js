import React, { useEffect, useState } from 'react';
import './Corp.css';
import { NavLink } from 'react-router-dom';
import PageNavigator from "../../components/PageNavigator";
import data from "./incorporationData.json";
import yearlyData from "./incorporationDataYears.json"; 
import CorpMap from "./CorpMap.js";
import ToggleSwitch from "./ToggleSwitch";
import YearSelector from "./YearSelector";
import IncorpTime from "./IncorpTime";

function Corp1() {
  const [dataField, setDataField] = useState("count");
  const [year, setYear] = useState(2024);

  return (
  	<div className='Corp'>
          <p className='heading1'>Incorporating in Delaware</p>
          <p>The map below shows how many public companies were incorporated in each state in 2024. Hover over a state to see exact counts. 
          Note that Delaware has over 60% of all public companies incorporated in the U.S.</p>
          <p>Another way to consider this data is to look at the size of the companies incorporated in each state rather than the number of companies. 
          Use the button below to switch the graph to the total share of the U.S. public market covered by companies incorporated in each state. 
          Delaware is even more dominant under this metric, covering over 67% of the total U.S. public market capitalization.</p>
          <p>Because Delaware is so dominant, both color scales in the graph are based on log instead of level values. Without this scaling, 
          it is not possible to see any meaningful variation in the other states.</p>
          <div>
            <CorpMap data={data} dataField={dataField} year={year}/>
            <div className='input-container'>
                <ToggleSwitch onToggle={setDataField} />
                <YearSelector year={year} setYear={setYear} />
            </div>
          </div>
          <p>Time trends back to 1990 show that Delaware has long been the dominant state for corporate law. 
          The graph below plots over time the number of U.S. public companies incorporated in (i) Delaware, (ii) the same state as the company's headquarters, and (iii) a state other than Delaware or the company's headquarter state.</p>
          <div className='graph-container'><IncorpTime data={yearlyData} /></div>
          <p>Data for these figures includes all companies in the Compustat database with a valid CIK and CUSIP.</p>
    </div>
  );
}

export default Corp1;