import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; 

const Navbar = () => {
  return (
    <div>
      <h1>Recipe Finder App</h1>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Recipe</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;