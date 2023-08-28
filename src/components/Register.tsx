import { useState } from "react";
import TextField from "./TextField";

interface MeProps {
  reg: boolean;
}

const Register = ({ reg }: MeProps) => {
  const [regProcess, setRegProcess] = useState({
    email: "",
    password: "",
    confirm: "",
    submit: false,
  });
  const registerURL = "http://localhost:3001";

  const handleRegProcess = (value?: string, name?: string) => {
    if (name) {
      setRegProcess((prevstate) => ({
        ...prevstate,
        [name]: value,
      }));
    }
  };

  const sendToBackend = async () => {
    try {
      const isMatch = regProcess["password"] === regProcess["confirm"];
      if (isMatch) {
        fetch(`${registerURL}/register`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: regProcess["email"],
            password: regProcess["password"],
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => {
            console.error();
          });
      }
    } catch (error) {
      console.error("Error sending the password to backend", error);
      return null;
    }
  };

  const handleSubmit = () => {
    sendToBackend();
    setRegProcess((prevstate) => ({
      email: "",
      password: "",
      confirm: "",
      ["submit"]: true,
    }));
  };

  if (reg) {
    return (
      <div>
        <TextField
          value={regProcess["email"]}
          placeholder="Enter email"
          onChange={handleRegProcess}
          name="email"
        />
        <TextField
          value={regProcess["password"]}
          placeholder="Password"
          onChange={handleRegProcess}
          name="password"
        />
        <TextField
          value={regProcess["confirm"]}
          placeholder="Confirm Password"
          onChange={handleRegProcess}
          name="confirm"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }
  return null;
};

export default Register;
