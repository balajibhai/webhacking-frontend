import { useEffect, useState } from "react";
import "./App.css";
import TextField from "./components/TextField";

const xml2js = require("xml2js");
const parserOptions = {
  entities: true,
};
const parser = new xml2js.Parser(parserOptions);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/my-route", {
          method: "GET",
          body: JSON.stringify({
            key: "value",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        const xmlData = event.target.result;

        parser.parseString(xmlData, (error: any, result: any) => {
          if (error) {
            console.error("Error parsing XML:", error);
          } else {
            console.log("Parsed XML:", result);
          }
        });
      };

      fileReader.readAsText(selectedFile);
    }
  };

  const handleImageClick = () => {
    const newParams = new URLSearchParams();
    newParams.append("name", "laptop");
    newParams.append("foldername", "images");
    newParams.append("filename", "mypic.jpg");
    const updatedURL = `${window.location.pathname}?${newParams.toString()}`;
    window.location.href = `http://localhost:3000/${newParams}`;
    console.log("updatedURL: ", updatedURL);
  };

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
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <div
        style={{ cursor: "pointer", width: "100px" }}
        onClick={handleImageClick}
      >
        <img
          src="https://media.istockphoto.com/id/1219382595/vector/math-equations-written-on-a-blackboard.jpg?s=612x612&w=0&k=20&c=ShVWsMm2SNCNcIjuWGtpft0kYh5iokCzu0aHPC2fV4A="
          alt="alternate"
          width={300}
        />
      </div>
    </div>
  );
}

export default App;
