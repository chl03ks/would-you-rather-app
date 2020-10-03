import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = ({ loggedInUser }) => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div
          className="collapse navbar-collapse"
          style={{ justifyContent: "space-between" }}
        >
          <ul className="navbar-nav">
            <NavLink
              to="/"
              exact
              activeClassName="active"
              className="nav-item nav-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              exact
              activeClassName="active"
              className="nav-item nav-link"
            >
              New Question
            </NavLink>
            <NavLink
              to="/leaderboard"
              exact
              activeClassName="active"
              className="nav-item nav-link"
            >
              Leaderboard
            </NavLink>
          </ul>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span
              className="navbar-text text-info"
              style={{ margin: "0 10px" }}
            >
              Hello {loggedInUser.name}
            </span>
            <span className="navbar-nav">
              <Link to="/logout">
                <button className="btn-sm btn-info">Logout</button>
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
