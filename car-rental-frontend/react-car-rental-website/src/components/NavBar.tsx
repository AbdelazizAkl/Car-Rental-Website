import React, { useState } from "react";
import "../css/navBar.css";
import { connect } from 'react-redux';
import { setSignedIn } from '../store/actions';

interface NavbarProps {
  home?: boolean;
  isSignedIn: boolean;
  setSignedIn: (isSignedIn: boolean) => void;
} // Define props if needed in the future

const Navbar: React.FC<NavbarProps> = ({ home,isSignedIn, setSignedIn }) => {
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
      <a className="nav-link" href="/car">
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
      )}{isSignedIn?
      <div className="topnav-right">
      <p>
        Welcome
      </p>
      </div>:
      <div className="topnav-right">
        <a className="nav-link" href="/login">
          Login
        </a>
        <a className="nav-link" href="/register">
          Sign up
        </a>
      </div>}
    </div>
)};


const mapStateToProps = (state: any) => ({
  isSignedIn: state.isSignedIn,
});

const mapDispatchToProps = {
  setSignedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
