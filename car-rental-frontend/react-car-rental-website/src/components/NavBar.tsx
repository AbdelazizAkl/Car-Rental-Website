import React, { useState } from "react";
import "../css/navBar.css";

interface NavbarProps {
  home?: boolean;
} // Define props if needed in the future

const Navbar: React.FC<NavbarProps> = ({ home }: NavbarProps) => {
  return (
    <div className="topnav">
      {home && (
        <a className="nav-link" href="#home-section">
          Home
        </a>
      )}
      {!home && (
        <a className="nav-link" href="/">
          Home
        </a>
      )}
      <a className="nav-link" href="/searchPage">
        Search
      </a>
      <a className="nav-link" href="/pricingPage">
        Pricing
      </a>
      <a className="nav-link" href="/carsPage">
        Cars
      </a>
      {home && (
        <a className="nav-link" href="#about-section">
          Contact
        </a>
      )}
      {home && (
        <a className="nav-link" href="#about-section">
          About
        </a>
      )}
      <div className="topnav-right">
        <a className="nav-link" href="/login">
          Login
        </a>
        <a className="nav-link" href="/register">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Navbar;
