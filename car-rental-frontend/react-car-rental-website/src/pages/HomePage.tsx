import React from "react";
import Button from "../components/Button";
import "./HomePage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nav = useNavigate();

  function LoginRedirection() {
    nav("/login");
  }
  function RegisterRedirection() {
    nav("/register");
  }

  return (
    <div className="home-page">
      <div className="title-section">
        <h1>Welcome to Kwaizo's Cars Rental</h1>
      </div>

      <div className="content-section">
        {/* Text fields go here */}
        <svg
          fill="#000000"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>home</title>{" "}
            <path d="M0 14.016l2.016 1.984h4v14.016q0 0.832 0.576 1.408t1.408 0.576h4v-8q0-0.832 0.576-1.408t1.44-0.576h4q0.8 0 1.408 0.576t0.576 1.408v8h4q0.832 0 1.408-0.576t0.608-1.408v-14.016h4l1.984-1.984-16-14.016zM12 14.016q0-1.664 1.184-2.848t2.816-1.152 2.816 1.152 1.184 2.848-1.184 2.816-2.816 1.184-2.816-1.184-1.184-2.816z"></path>{" "}
          </g>
        </svg>
        <Button color="primary" onClick={LoginRedirection}>
          LOGIN
        </Button>
        <p>&nbsp;</p>
        <Button color="secondary" onClick={RegisterRedirection}>
          REGISTER
        </Button>
      </div>
    </div>
  );
};

export default HomePage;