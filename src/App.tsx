import { useEffect, useState } from "react";
import "./App.css";
import TextField from "./components/TextField";

function App() {
  const express = "http://localhost:5000";
  const commandInj = "http://localhost:3001";
  let [postData, setPostData] = useState<any>(null);
  let [deleteData, setDeleteData] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [dbData, setDbData] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [phonenumber, setPhonenumber] = useState<string>("");

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const handleNameChange = (newValue: string) => {
    setName(newValue);
  };

  const genericDbData = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${express}/tshirt`);
        const jsonData = await response.json();
        console.log("jsonData: ", jsonData);
        setDbData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    genericDbData();
  }, []);

  const handleSubscribe = () => {
    fetch(`${express}/tshirt/2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        genericDbData();
        setPostData(data);
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setPostData(null);
    }, 3000);
  };

  const handleUnsubscribe = () => {
    fetch(`${express}/tshirt/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDeleteData(data);
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setDeleteData(null);
    }, 3000);
  };

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

  function displayResults(dbData: []) {
    return dbData?.map((item: any) => (
      <div key={item.id}>
        <p>{item.email}</p>
        {/* <p>{item.name}</p> */}
      </div>
    ));
  }

  return (
    <div className="App">
      <div>
        <div>Enter your email</div>
        <TextField value={email} onChange={handleEmailChange} />
        <TextField value={name} onChange={handleNameChange} />
        <button onClick={handleSubscribe}>Subscribe</button>
        <button onClick={handleUnsubscribe}>Unsubscribe</button>
        {postData && <div>You are successfully subscribed!!!</div>}
        {deleteData && <div>{deleteData.message}</div>}
        {displayResults(dbData)}
      </div>
      <div>Enable two factor authentication</div>
      <TextField
        value={name}
        onChange={(value) => setPhonenumber(value)}
        placeholder="Enter your phone number"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
