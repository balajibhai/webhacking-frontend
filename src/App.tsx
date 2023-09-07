import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weakrandomness from "./links/Weakrandomness";
import ResetPassword from "./components/ResetPassword";
import SQLInjection from "./links/SqlInjection";
import CommandInjection from "./links/CommandInjection";
import XMLInjection from "./links/XMLInjection";
import DirectoryTraversal from "./links/DirectoryTraversal";
import SessionFixation from "./links/SessionFixation";

function App() {
  const links = [
    { text: "SQL Injection", url: "/sql_injection" },
    { text: "Command Injection", url: "/command_injection" },
    { text: "XML Injection", url: "/xml_injection" },
    { text: "Directory Traversal", url: "/directory" },
    { text: "Weakrandomness", url: "/weakrandomness" },
    { text: "Session fixation", url: "/session=J7mPfRwK9sXeD4vZaQ1b" },
  ];

  return (
    <div className="App">
      <div>
        <h1>Navigation Links</h1>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
      <Router>
        <Routes>
          <Route path="/weakrandomness" Component={Weakrandomness} />
          <Route path="/sql_injection" Component={SQLInjection} />
          <Route path="/reset-password" Component={ResetPassword} />
          <Route path="/command_injection" Component={CommandInjection} />
          <Route path="/xml_injection" Component={XMLInjection} />
          <Route path="/directory" Component={DirectoryTraversal} />
          <Route
            path="/session=J7mPfRwK9sXeD4vZaQ1b"
            Component={SessionFixation}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
