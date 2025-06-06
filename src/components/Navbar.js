import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><NavLink exact to="/" activeClassName="active-link">Home</NavLink></li>
                <li><NavLink to="/cv" activeClassName="active-link">CV</NavLink></li>
                <li><NavLink to="/research" activeClassName="active-link">Research</NavLink></li>

                {/* Teaching Dropdown */}
                <li className="dropdown">
                    <NavLink className="dropbtn">Teaching</NavLink>
                    <ul className="dropdown-content">
                        <li><NavLink to="/corp">Delaware Incorporation</NavLink></li>
                        <li><NavLink to="/time_discounting">Time Discounting</NavLink></li>
                        <li><NavLink to="/risk">Risk</NavLink></li>
                        <li><NavLink to="/black_scholes">Black-Scholes</NavLink></li>
                        <li><NavLink to="/fourier">Fourier Transform</NavLink></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}


export default Navbar;
