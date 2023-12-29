import React, { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import "../css/Login.css";
import axios from "axios";

const Login = () => {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warnemail, setwarnemail] = useState(false);
  const [warnpass, setwarnpass] = useState(false);
  const [danger, setdanger] = useState(true);
  const [eye, seteye] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  
  async function loginHandler() {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   
    if (!email) {
       setwarnemail(true);
       setAlertVisibility(true);
      setAlertMessage("Please enter your email address.");
    
    }
  
    if (!password) {
      setwarnpass(true);
      setAlertVisibility(true);
      setAlertMessage("Please enter your password.");
      
    }

    if (!emailRegex.test(email)) {
    setwarnemail(true); // Trigger warning for email input
    setAlertVisibility(true);
    setAlertMessage("Please enter a valid email address.");
    
  }

  // if (password.length < 8) {
  //   setwarnpass(true); // Trigger warning for password input
  //   setAlertVisibility(true);
  //   setAlertMessage("Password must be at least 8 characters long.");
  //   return;
  // }
  
  try {
    const loginResponse = await axios.post('http://localhost:3000/customers/login', {
      email,
      password
    });

    if (loginResponse.status === 200) {
      // Handle successful login (e.g., redirect to home page)
      console.log('Login successful!');
      // Redirect to home page or desired route
    } else {
      // Handle login error
      setAlertVisibility(true);
      setAlertMessage(loginResponse.data.message || "Invalid email or password.");
    }
  } catch (error) {
    console.error('Login error:', error);
    setAlertVisibility(true);
    setAlertMessage("An error occurred while logging in. Please try again.");
  }
}



  return (
    <div className="homePage">
      <h1>KWAIZO'S CARS RENTAL</h1>
      <div className="container">
        <div className="LoginCard">
          <div className="form">
            <div className="left-side">
              <img src="https://mphclub.com/wp-content/uploads/2021/07/mercedes-benz-lineup-exotic-car-rental-mph-club.jpg" />
            </div>
  
            <div className="right-side">
              <div className="register">
                <p>
                  Not a member? <a href="/register">Register Now</a>
                </p>
              </div>
  
              <div className="hello">
                <h2>Hello Again!</h2>
                <h4>Welcome back you have been missed! </h4>
              </div>
  
              <form onSubmit={(e) => { e.preventDefault(); loginHandler(); }}>
                <div className="input_text">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="input_text">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="button">
                  <Button color="primary" onClick={loginHandler}>
                    Sign in
                  </Button>
                </div>
              </form>
              
              {alertVisible && (
                <Alert onClose={() => setAlertVisibility(false)}>
                  {alertMessage}
                </Alert>
              )}
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};
export default Login;
