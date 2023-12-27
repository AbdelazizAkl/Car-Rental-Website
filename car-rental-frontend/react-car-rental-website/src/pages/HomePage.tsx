import React from "react";
import Button from "../components/Button"; // Import your Button component
import backgroundImage from "../components/WALLPAPER.jpg";

const HomePage = () => {
  return (
    <div
    //className="home-page"
    // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>Welcome to Kwaizo's Cars Rental</h1>
      <Button color="primary" to="/login">
        LOGIN
      </Button>
      <Button color="secondary" to="/register">
        REGISTER
      </Button>
    </div>
  );
};

export default HomePage;
