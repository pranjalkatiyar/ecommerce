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
import { useDispatch, useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  console.log(cartItems);
  const navigate = useNavigate();
  const options = [
    { icon: <BiListUl />, name: "Orders", func: orders },
    { icon: <BsFillPersonFill />, name: "Profile", func: account },
    {
      icon: (
        <MdShoppingCart
          style={{ color: cartItems.length > 0 ? "red" : "green" }}
        />
      ),
      name: `Cart${cartItems.length > 0 ? `(${cartItems.length})` : ""}`,
      func: cart,
    },
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

  function cart() {
    navigate("/cart");
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
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          ></SpeedDialAction>
        ))}

        <ToastContainer />
      </SpeedDial>
    </>
  );
};

export default UserOptions;
