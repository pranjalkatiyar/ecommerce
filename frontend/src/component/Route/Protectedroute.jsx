import React from "react";
import { Route, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {Navigate, useLocation} from "react-router-dom"

const Protectedroute = ({ children}) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
   let location = useLocation();

  return isAuthenticated ? <>{children}</> :<Navigate to="/login"/>

};

export default Protectedroute;
