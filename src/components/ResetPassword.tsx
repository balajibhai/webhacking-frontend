import React, { useState } from "react";

const ResetPassword = () => {
  const [link, setLink] = useState("");
  fetch("http://localhost:3001/resetpassword", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => setLink(data?.message));
  return <div>{link}</div>;
};

export default ResetPassword;
