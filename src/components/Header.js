import React from "react";
import "../styles/components/Header.css";
import image from "../styles/assets/wellness.png";

export const Header = () => {
  return (
    <div className="header">
      <a id="logo" href="/">
        Zealthy
      </a>
      <span className="header-links">
        <a href="/admin">Admins</a>
        <a href="https://github.com/Rhohoman/zealthyproject">Github</a>
        <a href="#">Contact</a>
      </span>
      {/* <img src={image} alt="Wellness-img" /> */}
    </div>
  );
};
