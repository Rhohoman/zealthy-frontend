import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.css";

export const Header = () => {
  return (
    <div className="header">
      <Link id="logo" to="/" className="logo">
        Zealthy
      </Link>
      <span className="header-links">
        <Link to="/admin" className="header-link">
          Admins
        </Link>
        <a
          href="https://github.com/Rhohoman/zealthyproject"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/rhoho/"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </span>
    </div>
  );
};
