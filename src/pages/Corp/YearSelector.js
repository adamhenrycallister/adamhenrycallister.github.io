import { useState } from "react";

export default function YearSelector({ year, setYear }) {
  const years = Array.from({ length: 2024 - 1998 + 1 }, (_, i) => 1998 + i);

  return (
    <label className='label1'>
      Year:{" "}
      <select value={year} onChange={e => setYear(Number(e.target.value))}>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </label>
  );
}
