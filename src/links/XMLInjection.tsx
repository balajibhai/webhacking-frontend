import { useState } from "react";
const xml2js = require("xml2js");

const XMLInjection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const parserOptions = {
    entities: true,
  };
  const parser = new xml2js.Parser(parserOptions);

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
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default XMLInjection;
