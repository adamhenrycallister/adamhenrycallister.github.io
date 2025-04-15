import React from 'react';

const DynamicTable = ({ columns, dataArrays }) => {
  const maxLength = Math.max(...dataArrays.map(arr => arr.length));

  const rows = Array.from({ length: maxLength }, (_, i) =>
    dataArrays.map(arr => arr[i] ?? '')
  );

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} style={{ border: '1px solid black', padding: '4px' }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, colIdx) => (
              <td key={colIdx} style={{ border: '1px solid gray', padding: '4px' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
