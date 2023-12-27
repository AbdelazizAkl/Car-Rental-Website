import Button from "./components/Button";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>my alert</Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        login
      </Button>
      <Button color="secondary" onClick={() => setAlertVisibility(true)}>
        register
      </Button>
    </div>
  );
}
export default App;
