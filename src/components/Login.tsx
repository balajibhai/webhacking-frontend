import { useState } from "react";
import TextField from "./TextField";

interface LoginProps {
  submit: boolean;
}

const Login = ({ submit }: LoginProps) => {
  const [loginProcess, setLoginProcess] = useState({
    mail: "",
    password: "",
  });
  const loginURL = "http://localhost:3001/login";
  const handleRegProcess = (value?: string, name?: string) => {
    if (name) {
      setLoginProcess((prevstate) => ({
        ...prevstate,
        [name]: value,
      }));
    }
  };
  const handleSubmit = () => {
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: loginProcess["mail"],
        password: loginProcess["password"],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data", data));
  };

  return (
    <div>
      {submit && (
        <div>
          <div>
            <TextField
              value={loginProcess["mail"]}
              placeholder="Enter your mail"
              onChange={handleRegProcess}
              name="mail"
            />
            <TextField
              value={loginProcess["password"]}
              placeholder="Enter your password"
              onChange={handleRegProcess}
              name="password"
            />
            <button onClick={handleSubmit}>Submit</button>
            <div>
              <a href="http://localhost:3000/reset-password">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
