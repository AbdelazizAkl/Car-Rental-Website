import React, { Children, useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import "../css/Login.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [warnemail, setwarnemail] = useState(false);
  // const [warnpass, setwarnpass] = useState(false);
  // const [danger, setdanger] = useState(true);
  // const [eye, seteye] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  async function loginHandler() {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const loginResponse = await axios.post(
        "http://localhost:3000/customers/login",
        {
          email,
          password,
        },
        config
      );
      if (loginResponse.status === 200) {
        goHome();
      }
    } catch (error) {
      console.error("Login error:", error);
      const accumulatedErrors = [];

      if (axios.isAxiosError(error) && error.response) {
        // The request was made, but the server responded with a status code
        // other than 2xx (e.g., 404, 500, etc.)
        accumulatedErrors.push(error.response.data.message);
      } else if (axios.isAxiosError(error) && error.request) {
        // The request was made, but no response was received
        accumulatedErrors.push("No response from the server");
      } else {
        // Something else happened during the request
        accumulatedErrors.push("An unexpected error occurred");
      }
      setAlertVisibility(true);
      setAlertMessage(accumulatedErrors.join("\n"));
    }
  }

  const nav = useNavigate();
  const goHome = () => {
    nav("/");
  };

  return (
    <div className="homePage">
      <h1 className="circle" onClick={goHome}>
        KWAIZO'S CARS RENTAL
      </h1>
      <div className="LoginContainer">
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

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginHandler();
                }}
              >
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
                  <Button color="primary">Sign in</Button>
                  {alertVisible && (
                    <Alert onClose={() => setAlertVisibility(false)}>
                      {alertMessage}
                    </Alert>
                  )}
                </div>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
