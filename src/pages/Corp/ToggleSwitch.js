import React, { useState } from "react";
import "./Corp.css"; 

export default function ToggleSwitch({ onToggle }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newVal = !enabled;
    setEnabled(newVal);
    onToggle(newVal ? "mkt_cap" : "count");
  };

  return (
    <div className="toggle-container">
      <span className={!enabled ? "label active" : "label"}>Count</span>
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      <span className={enabled ? "label active" : "label"}>Market Cap %</span>
    </div>
  );
}
