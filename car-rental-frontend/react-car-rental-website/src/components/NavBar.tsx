import React, { useState } from "react";
import "../css/navBar.css";

interface NavbarProps {} // Define props if needed in the future

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="topnav">
      <a className="nav-link active" href="/">
        Home
      </a>
      <a className="nav-link" href="/searchPage">
        Search
      </a>
      <a className="nav-link" href="/pricingPage">
        Pricing
      </a>
      <a className="nav-link" href="/carsPage">
        Cars
      </a>
      <a className="nav-link" href="/contactPage">
        Contact
      </a>
      <a className="nav-link" href="/aboutPage">
        About
      </a>
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
