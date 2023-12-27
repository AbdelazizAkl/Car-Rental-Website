import React, { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import TextFields from "../components/TextFields";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  return (
    <div>
      <TextFields
        label={"Emaill"}
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
        <Alert onClose={() => setAlertVisibility(false)}>my alert</Alert>
      )}
      <Button color="primary" onClick={() => console.log("logged in")}>
        admin
      </Button>
      <Button color="secondary" onClick={() => console.log("logged in")}>
        user
      </Button>
    </div>
  );
}

export default App;
