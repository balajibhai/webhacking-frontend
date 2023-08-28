import { useState } from "react";
import TextField from "./TextField";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import ResetPassword from "./ResetPassword";

interface LoginProps {
  submit: boolean;
}

const Login = ({ submit }: LoginProps) => {
  const [loginProcess, setLoginProcess] = useState({
    mail: "",
    password: "",
  });
  const [login, setLogin] = useState(false);
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

  const ForgotPassword = () => {
    const history = useNavigate();
    const handleForgotPassword = () => {
      history("/resetpassword");
      setLogin(true);
    };
    return (
      <div>
        <button style={buttonStyles} onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </div>
    );
  };

  const buttonStyles = {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
  };
  if (submit) {
    return (
      <div>
        <Router>
          <div>
            {!login && (
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
                <ForgotPassword />
              </div>
            )}
          </div>
          <nav>
            <Link to="/resetpassword"></Link>
          </nav>
          <Routes>
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    );
  }
  return null;
};

export default Login;
