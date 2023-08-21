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
        console.log("The passwords are same");
        return regProcess["password"];
      }
      console.log("The passwords do not match");
      return null;
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
