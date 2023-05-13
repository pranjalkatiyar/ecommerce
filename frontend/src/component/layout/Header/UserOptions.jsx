import React, { useState } from "react";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import "./Header.css";
import ProfilDummy from "../../../assets/profileDummy.png";
import { MdDashboard } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { BiListUl } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const options = [
    { icon: <BiListUl />, name: "Orders", func: orders },
    { icon: <BsFillPersonFill />, name: "Profile", func: account },
    { icon: <IoExitOutline />, name: "Logout", func: logoutUser },
  ];
  const dispatch = useDispatch();

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    console.log("clicked");
    navigate("/");
    toast.success("Logged out successfully");
  }

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", top: 16, right: 16 }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : ProfilDummy}
            alt="Profile"
            style={{ zIndex: "11" }}
          />
        }
        direction="down"
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
          ></SpeedDialAction>
        ))}

        <ToastContainer />
      </SpeedDial>
    </>
  );
};

export default UserOptions;
