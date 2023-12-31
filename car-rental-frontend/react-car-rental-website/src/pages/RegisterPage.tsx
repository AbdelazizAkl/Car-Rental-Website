import React, { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Now you can use the 'history' object as needed in your component

const Register = () => {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [PassportNumber, setPassportNumber] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  async function registrationHandler() {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      await axios
        .post(
          "http://localhost:3000/customers/signup",
          {
            fName,
            lName,
            email,
            password,
            confirmPassword,
            address,
            phone,
            PassportNumber,
          },
          config
        )
        .then((response) => {
          if (response.data.success) {
            goHome();
          } else {
            setAlertVisibility(true);
            setAlertMessage(response.data.message);
          }
        });
    } catch (error) {
      console.error("Register error:", error);
    }
  }

  const nav = useNavigate();
  const goHome = () => {
    nav("/login");
  };
  return (
    <>
      <div className="homePage">
        <div className="RegisterContainer">
          <div className="RegisterCard">
            <div className="form">
              <div className="left-side">
                <img src="https://mphclub.com/wp-content/uploads/2021/07/mercedes-benz-lineup-exotic-car-rental-mph-club.jpg" />
              </div>
              <div className="right-side">
                <div className="register">
                  <p>
                    Already a member? <a href="/login">Login Now</a>
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    registrationHandler();
                  }}
                >
                  <div className="input_text">
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="fname"
                      value={fName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                  <div className="input_text">
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="lname"
                      value={lName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                  <div className="input_text">
                    <input
                      type="text"
                      placeholder="Enter Phone Number"
                      name="phone"
                      value={phone}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                  </div>
                  <div className="input_text">
                    <input
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                  <div className="input_text">
                    <input
                      type="text"
                      placeholder="Enter Passport Number"
                      name="Passport Number"
                      value={PassportNumber}
                      onChange={(event) =>
                        setPassportNumber(event.target.value)
                      }
                    />
                  </div>
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
                  <div className="input_text">
                    <input
                      type="password"
                      placeholder="Re-enter Password"
                      name="confirmPassord"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmedPassword(event.target.value)
                      }
                    />
                  </div>
                  <div className="button">
                    <Button color="primary">Register</Button>
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
    </>
  );
};

export default Register;
