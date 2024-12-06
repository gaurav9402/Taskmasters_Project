import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <NavLink
        to="/"
        style={{ margin: "10px", color: "#fff", textDecoration: "none" }}
        activeStyle={{ fontWeight: "bold", color: "#4CAF50" }}
      >
        Home
      </NavLink>
      <NavLink
        to="/create"
        style={{ margin: "10px", color: "#fff", textDecoration: "none" }}
        activeStyle={{ fontWeight: "bold", color: "#4CAF50" }}
      >
        Create
      </NavLink>
      <NavLink
        to="/tasks"
        style={{ margin: "10px", color: "#fff", textDecoration: "none" }}
        activeStyle={{ fontWeight: "bold", color: "#4CAF50" }}
      >
        View Tasks
      </NavLink>
      <NavLink
        to="/about"
        style={{ margin: "10px", color: "#fff", textDecoration: "none" }}
        activeStyle={{ fontWeight: "bold", color: "#4CAF50" }}
      >
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;
