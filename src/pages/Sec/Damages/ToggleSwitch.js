import React, { useState } from "react";
import "./Damage.css"; 

export default function ToggleSwitch({ onToggle }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newVal = !enabled;
    setEnabled(newVal);
    onToggle(newVal ? true : false);
  };

  return (
    <div className="toggle-container">
      <label className={enabled ? "label active" : "label"}>Price Maintenance</label>
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
}