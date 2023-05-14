import React, { useState, useEffect } from "react";
 import { MdMailOutline } from "react-icons/md";
 import "./UpdateProfile.css";
 import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loaduser, updateProfile } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import ProfileDummy from "../../assets/profileDummy.png";
import MetaData from "../layout/MetaData";
import {toast} from 'react-toastify';
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profileReducer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(ProfileDummy);
const navigate=useNavigate();
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();

    myform.set("name", name);
    myform.set("email", email);
    myform.set("avatar", avatar);

    dispatch(updateProfile(myform));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    console.log(error, isUpdated,loading)
    if (error) {
      window.alert.error(error);
    }
    if (isUpdated) {
      toast.success("User Updated Successfully");
      dispatch(loaduser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }

    dispatch(clearErrors());
  }, [dispatch, error, isUpdated, user]);

  return (
   <>
    {loading ? (<Loader/>):(
      <>
      <MetaData title="Update Profile" />
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
        <div className="updateProfileHeading">
        <p style={{textTransform:"uppercase"}}>update profile</p>
        </div>
        <form
          className="updateProfileForm"
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div>
            <CgProfile />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              placeholder="Name"
            />
          </div>
          <div className="updateProfileEmail">
            <MdMailOutline />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          
          <div className="updateProfileImage" id="updateProfileImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProfileDataChange}
            />
          </div>
          <input
            type="submit"
            value="UPDATE PROFILE"
            className="updateProfileBtn"
            disabled={loading ? true : false}
          />
        </form>
        </div>
      </div>
      
    </>
    )}
   </>
  );
};

export default UpdateProfile;
