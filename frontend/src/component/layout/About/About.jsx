import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@mui/material";
 import { AiOutlineInstagram } from "react-icons/ai";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/pranjalkatiyar21";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dfpupgfcz/image/upload/v1684007282/avatars/onuqsfcnekmnvyfvh77o.jpg"
              alt="Founder"
            />
            <Typography>Pranjal Katiyar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @pranjalkatiyar.            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://instagram.com/pranjalkatiyar21" target="blank">
              <AiOutlineInstagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;