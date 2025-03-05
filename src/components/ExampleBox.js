import { useState } from "react";
import './ExampleBox.css';

const ExampleBox = ({ children, solution }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="example-box">
      <div className="problem-text">{children}</div> {/* Supports multiple elements */}

      <span
        className="toggle-button"
        onClick={() => setShowSolution(!showSolution)}
      >
        {showSolution ? "Hide Solution" : "Show Solution"}
      </span>

      {showSolution && <div className="solution-text">{solution}</div>}
    </div>
  );
};

export default ExampleBox;
