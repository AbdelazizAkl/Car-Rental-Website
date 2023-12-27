import React from "react";
import Button from "../components/Button";
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="title-section">
        <h1>Welcome to Kwaizo's Cars Rental</h1>
      </div>

      <div className="content-section">
        {/* Text fields go here */}
        <Button color="primary" to="/login">
          LOGIN
        </Button>
        <p>&nbsp;</p>
        <Button color="secondary" to="/register">
          REGISTER
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
