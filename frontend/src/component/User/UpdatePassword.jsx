import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
 import MetaData from "../layout/MetaData";
import {HiLockOpen,HiLockClosed} from "react-icons/hi";
 import {MdVpnKeyOff} from "react-icons/md";
 import {toast,ToastContainer} from 'react-toastify';
 import { useNavigate } from "react-router-dom";
 import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
    const navigate=useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profileReducer);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
        toast.error(error);
        dispatch(clearErrors());
    }
    console.log(error, isUpdated,loading);
    if (isUpdated) {
      toast.success("Profile Updated Successfully");

      navigate("/account");

      dispatch({type: UPDATE_PASSWORD_RESET});
    }
  }, [dispatch, error, toast, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKeyOff/>
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <HiLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <HiLockClosed />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
          <ToastContainer/>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;