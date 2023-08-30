import { useState } from "react";
import TextField from "../components/TextField";

const CommandInjection = () => {
  const [phonenumber, setPhonenumber] = useState<any>("");
  const commandInj = "http://localhost:3001";

  const handleSubmit = () => {
    fetch(`${commandInj}/twoauth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phonenumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div>Enable two factor authentication</div>
      <TextField
        value={phonenumber}
        onChange={(value) => setPhonenumber(value)}
        placeholder="Enter your phone number"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CommandInjection;
