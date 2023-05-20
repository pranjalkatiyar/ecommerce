import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import {IoLogoGooglePlaystore} from "react-icons/io5";
import {AiFillWindows} from "react-icons/ai";
import {IoLogoAppleAppstore} from "react-icons/io5";
import { BsInstagram,BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <div >
        <IoLogoGooglePlaystore className="playStore" />
        <IoLogoAppleAppstore className="appStore" />
        <AiFillWindows className="windowsStore" />
        </div>
         {/* <img src={appStore} alt="Appstore" /> */}
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>

       </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/pranjalkatiyar21"><BsInstagram/></a>
         <a href="http://instagram.com/pranjalkatiyar"><BsFacebook/></a>
      </div>
    </footer>
  );
};

export default Footer;