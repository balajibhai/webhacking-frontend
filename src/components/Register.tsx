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
  });
  const [submitted, setSubmitted] = useState(false);

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
      const newPassword = await bcrypt.hash(regProcess["password"], 10);
      const confirmPassword = await bcrypt.hash(regProcess["password"], 10);
      const isMatch = await bcrypt.compare(newPassword, confirmPassword);
      if (isMatch) {
        console.log("The passwords are same");
        return newPassword;
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
    setSubmitted(true);
  };

  if (reg) {
    return (
      <div>
        <TextField
          value={submitted ? "" : regProcess["email"]}
          placeholder="Enter email"
          onChange={handleRegProcess}
          name="email"
        />
        <TextField
          value={submitted ? "" : regProcess["password"]}
          placeholder="Password"
          onChange={handleRegProcess}
          name="password"
        />
        <TextField
          value={submitted ? "" : regProcess["confirm"]}
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
