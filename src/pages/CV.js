import React from 'react';
import './CV.css';

function CV() {
  return (
    <div className="cv-container">
      <div className="cv-embed">
        <iframe
          src="https://docs.google.com/document/d/11lMoIrDzSa9Y4ClB-695SmJS_WXZh2lo/preview"
          width="100%"
          height="600"
          allow="autoplay"
        ></iframe>
      </div>
      <a
        className="cv-download"
        href="https://docs.google.com/document/d/11lMoIrDzSa9Y4ClB-695SmJS_WXZh2lo/export?format=pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download CV
      </a>
    </div>
  );
}

export default CV;
