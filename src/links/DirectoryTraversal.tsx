import { useEffect, useState } from "react";

const DirectoryTraversal = () => {
  const express = "http://localhost:5000";
  const commandInj = "http://localhost:3001";
  const [dbData, setDbData] = useState<any>(null);
  const [image, setImage] = useState("");
  const imageSrc = image
    ? image
    : "https://media.istockphoto.com/id/1219382595/vector/math-equations-written-on-a-blackboard.jpg?s=612x612&w=0&k=20&c=ShVWsMm2SNCNcIjuWGtpft0kYh5iokCzu0aHPC2fV4A=";

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

  const genericGet = (link: string) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${commandInj}${link}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const imageData = await response.blob();
          const imageUrl = URL.createObjectURL(imageData);
          setImage(imageUrl);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };

  useEffect(() => {
    genericDbData();

    const handlePopState = () => {
      window.location.reload();
    };
    window.addEventListener("popstate", handlePopState);
  }, []);

  const getURL = () => {
    const newParams = new URLSearchParams();
    newParams.append("name", "laptop");
    newParams.append("foldername", "images");
    newParams.append("filename", "mypic.jpg");
    return `/check-file?${newParams.toString()}`;
  };

  const handleImageClick = () => {
    const updatedURL = getURL();
    window.location.href = `http://localhost:3000${updatedURL}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const file = params.get("filename");
    if (file) {
      const updatedURL = getURL();
      genericGet(updatedURL);
    }
  }, []);
  return (
    <div>
      <div
        style={{ cursor: "pointer", width: "100px" }}
        onClick={handleImageClick}
      >
        <img src={imageSrc} alt="alternate" width={300} />
      </div>
    </div>
  );
};

export default DirectoryTraversal;
