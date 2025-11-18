import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CV from './pages/CV';
import Research from './pages/Research';
import Teaching from './pages/Teaching';
import CorpFin from './pages/CorpFin/CorpFin';
import MA from './pages/MA/MA';
import Misc from './pages/Misc/Misc';
import Sec from './pages/Sec/Sec';
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
            <Route path="/corporate_finance" element={<CorpFin />} />
            <Route path="/ma" element={<MA />} />
            <Route path="/misc" element={<Misc />} />
            <Route path="/sec_reg" element={<Sec />} />
            {routes.map(({ path, component, group, course }) => {
              const Component = require(`./pages/${course}/${group}/${component}`).default;
              return <Route key={path} path={path} element={<Component />} />;
            })}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

