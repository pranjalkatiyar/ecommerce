import React from "react";
import "./contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:pranjalkatiyar23@gmail.com">
        <Button>Contact: pranjalkatiyar23@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;