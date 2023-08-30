import { useState } from "react";
import TextField from "../components/TextField";

const SQLInjection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState<any>(null);
  let [postData, setPostData] = useState<any>(null);
  let [deleteData, setDeleteData] = useState<any>(null);
  const [dbData, setDbData] = useState<any>(null);
  const express = "http://localhost:5000";

  const handleEmailChange = (newValue?: string, name?: string) => {
    setEmail(newValue || "");
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

  const handleNameChange = (newValue?: string, name?: string) => {
    setName(newValue);
  };

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

  function displayResults(dbData: []) {
    return dbData?.map((item: any) => (
      <div key={item.id}>
        <p>{item.email}</p>
      </div>
    ));
  }

  return (
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
  );
};

export default SQLInjection;
