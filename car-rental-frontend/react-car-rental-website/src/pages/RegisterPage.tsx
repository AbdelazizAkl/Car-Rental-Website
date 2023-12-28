import React, { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import "../css/Register.css";

// Now you can use the 'history' object as needed in your component

const Register = () => {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [license, setLicense] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");

  function registrationHandler() {}

  return (
    <>
      <div className="homePage">
        <div className="container">
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
                <form>
                  <div className="input_text">
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="fname"
                      value={fname}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                  <div className="input_text">
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="lname"
                      value={lname}
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
                      placeholder="Enter License"
                      name="license"
                      value={license}
                      onChange={(event) => setLicense(event.target.value)}
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
                    <Button color="primary" onClick={registrationHandler}>
                      Register
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

export default Register;
