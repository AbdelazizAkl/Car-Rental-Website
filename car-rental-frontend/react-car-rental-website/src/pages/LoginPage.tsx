import React, { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import TextFields from "../components/TextFields";
import "./LoginPage.css";

const Login = () => {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    if (!email || !password) {
      setAlertVisibility(true);
      return false;
    }
    return true;
  }

  return (
    <div className="form-container">
      <div>
        <TextFields
          label={"Email"}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)} // Corrected onChange handler
        />
        <TextFields
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} // Corrected onChange handler
        />
        {alertVisible && (
          <Alert onClose={() => setAlertVisibility(false)}>
            {" "}
            Please fill in both email and password fields
          </Alert>
        )}
        <Button
          color="primary"
          onClick={() => {
            if (validateForm()) {
              console.log("logged in as admin");
            }
          }}
        >
          admin
        </Button>

        <Button
          color="secondary"
          onClick={() => {
            if (validateForm()) {
              console.log("logged in as user");
            }
          }}
        >
          user
        </Button>
      </div>
    </div>
  );
};

export default Login;
