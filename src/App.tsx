import { useState } from "react";
import "./App.css";
import UserSignup from "./UserSignup";
import Wheel from "./Wheel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/Admin";

function App() {
  const [formState, setFormState] = useState(true);

  // Save formState to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("form", JSON.stringify(formState));
  //   localStorage.setItem("wheel", JSON.stringify(wheelState));
  // }, [formState, wheelState]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                formState ? (
                  <UserSignup setFormState={setFormState} />
                ) : (
                  <Wheel setFormState={setFormState} />
                )
              }
            />
          </Route>

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
