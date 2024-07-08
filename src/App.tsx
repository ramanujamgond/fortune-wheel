import { useEffect, useState } from "react";
import "./App.css";
import UserSignup from "./UserSignup";
import Wheel from "./Wheel";

function App() {
  const [formState, setFormState] = useState(true);
  const [wheelState, setWheelState] = useState(false);

  // Save formState to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formState));
    localStorage.setItem("wheel", JSON.stringify(wheelState));
  }, [formState, wheelState]);

  return (
    <>
      {formState && (
        <UserSignup setFormState={setFormState} setWheelState={setWheelState} />
      )}
      {wheelState && <Wheel />}
    </>
  );
}

export default App;
