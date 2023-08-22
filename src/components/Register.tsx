import { useState } from "react";
import TextField from "./TextField";
import bcrypt from "bcryptjs";

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

  const handleHashing = async () => {
    try {
      const isMatch = regProcess["password"] === regProcess["confirm"];
      if (isMatch) {
        const hashPassword = await bcrypt.hash(regProcess["password"], 2);
        fetch(`${registerURL}/register`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: regProcess["email"],
            password: hashPassword,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => {
            console.error();
          });
      }
    } catch (error) {
      console.error("Error hashing the password", error);
      return null;
    }
  };

  const handleSubmit = () => {
    handleHashing();
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
