import React from 'react';
import './CV.css';

function CV() {
  return (
    <div className="cv-container">
      <div className="cv-embed">
        <iframe
          src="https://drive.google.com/file/d/1jkxm7kJstUlWbaieu3q3UAIRMv88GV3P/preview"
          width="100%"
          height="600"
          allow="autoplay"
        ></iframe>
      </div>
      <a
        className="cv-download"
        href="https://drive.google.com/uc?export=download&id=1jkxm7kJstUlWbaieu3q3UAIRMv88GV3P"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download CV
      </a>
    </div>
  );
}

export default CV;
