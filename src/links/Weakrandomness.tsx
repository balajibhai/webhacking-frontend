import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Weakrandomness = () => {
  const [login, setLogin] = useState<boolean>(false);

  const handleLogin = () => {
    setLogin(true);
  };
  return (
    <div>
      <div>
        Weak randomness
        <button onClick={handleLogin}>Log in</button>
      </div>
      <Login submit={login} />
      <Register />
    </div>
  );
};

export default Weakrandomness;
