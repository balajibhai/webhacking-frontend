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
  });
  const handleRegProcess = (value?: string, name?: string) => {
    if (name) {
      setRegProcess((prevstate) => ({
        ...prevstate,
        [name]: value,
      }));
    }
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
        <button>Submit</button>
      </div>
    );
  }
  return null;
};

export default Register;
