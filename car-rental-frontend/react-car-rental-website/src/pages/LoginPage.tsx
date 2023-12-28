import React, { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import TextFields from "../components/TextFields";
import "./LoginPage.css";
import axios from "axios";

const Login = () => {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    if (!email || !password) {
      return false;
    }
    return true;
  }

  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  const [warnemail, setwarnemail] = useState(false);
  const [warnpass, setwarnpass] = useState(false);
  const [danger, setdanger] = useState(true);

  const [eye, seteye] = useState(true);
  const [pass, setpass] = useState("password");

  return (
    <>
      <div className="homePage">
        <div className="container">
          <div className="card">
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

                <form>
                  <div className="input_text">
                    <input
                      className={` ${warnemail ? "warning" : ""}`}
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <p className={` ${danger ? "danger" : ""}`}>
                      <i className="fa fa-warning"></i>Please enter a valid
                      email address.
                    </p>
                  </div>
                  <div className="input_text">
                    <input
                      className={` ${warnpass ? "warning" : ""}`}
                      type={pass}
                      placeholder="Enter Password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <i className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </div>

                  <div className="button">
                    <Button color="primary" onClick={validateForm}>
                      Sign in
                    </Button>
                  </div>
                </form>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
