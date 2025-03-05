import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CV from './pages/CV';
import Research from './pages/Research';
import Teaching from './pages/Teaching';
import './App.css';  
import routes from "./routes";

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
            <Route path="/teaching" element={<Teaching />} />
            {routes.map(({ path, component, group }) => {
              const Component = require(`./pages/${group}/${component}`).default;
              return <Route key={path} path={path} element={<Component />} />;
            })}
            <Route path="*" element={<Navigate to="/black_scholes" />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

