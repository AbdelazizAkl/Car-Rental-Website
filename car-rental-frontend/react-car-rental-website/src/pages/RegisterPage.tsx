import React, { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import TextFields from "../components/TextFields";

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
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordValidation = () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setAlertVisibility(true);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <div>
      <TextFields
        label="First Name"
        type="string"
        placeholder="First name"
        value={fname}
        onChange={(event) => setFirstName(event.target.value)} // Corrected onChange handler
      />
      <TextFields
        label="Last Name"
        type="string"
        placeholder="Last name"
        value={lname}
        onChange={(event) => setLastName(event.target.value)} // Corrected onChange handler
      />
      <TextFields
        label="Address"
        type="string"
        placeholder="Address"
        value={address}
        onChange={(event) => setAddress(event.target.value)} // Corrected onChange handler
      />
      <TextFields
        label="Phone Number"
        type="string"
        placeholder="Phone number"
        value={phone}
        onChange={(event) => setPhoneNumber(event.target.value)} // Corrected onChange handler
      />
      <TextFields
        label="License"
        type="string"
        placeholder="License"
        value={license}
        onChange={(event) => setLicense(event.target.value)} // Corrected onChange handler
      />
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
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <TextFields
        label="Confirm Password"
        type="password"
        placeholder="Renter your password"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmedPassword(event.target.value);
        }}
      />

      {!passwordsMatch && alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          passwords don't match{" "}
        </Alert>
      )}
      <Button color="primary" onClick={handlePasswordValidation}>
        Register
      </Button>
    </div>
  );
};

export default Register;
