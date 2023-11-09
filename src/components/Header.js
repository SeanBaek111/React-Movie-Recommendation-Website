// Header.js
import React from 'react';
import { NavLink } from "react-router-dom";
import '../App.css'; // <-- Import App.css instead

import Home from '../pages/Home';
import Recommendation from '../pages/RecommendationPage';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/recommendation">Recommended</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/signup">Signup</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
