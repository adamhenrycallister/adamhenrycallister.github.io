import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CV from './pages/CV';
import Research from './pages/Research';
import './App.css';  // Assuming you have some global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/research" element={<Research />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

