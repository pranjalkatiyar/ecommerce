import React, { useRef ,useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMailOutline } from "react-icons/md";
import { MdLock } from "react-icons/md";
import "./LoginSignUp.css";
import { CgProfile } from "react-icons/cg";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,login,register } from "../../actions/userAction";
import {toast} from 'react-toastify';
import Loader from '../layout/Loader/Loader'
import ProfileDummy from "../../assets/profileDummy.png" ;

const LoginSignUp = ({history}) => {
  const dispatch=useDispatch()
  const loginTab = useRef(null);
  const switcherTab = useRef(null);
  const registerTab = useRef(null);
const {error,loading,isAuthenticated,token}=useSelector(state=>state.user)
const payload=useSelector(state=>state.user.user)
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
    const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    });
    const navigate=useNavigate();

    const { name, email, password} = user;

    const [avatar,setAvatar]=useState("");
    const [avatarPreview,setAvatarPreview]=useState(ProfileDummy);

  const loginSubmit = (e) => {
    // e.preventDefault();
   dispatch(login(loginEmail,loginPassword));
  };

  const registerSubmit= (e) => {
    e.preventDefault();

    const myform= new FormData();

    myform.set('name',name);
    myform.set("email",email);
    myform.set("password",password);
    myform.set("avatar",avatar);

    dispatch(register(myform))
  }
  console.log(avatarPreview);

  const registerDataChange=(e)=>{
    if(e.target.name==="avatar"){
      const reader=new FileReader();
      reader.onload=()=>{
        if(reader.readyState===2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
      else{
        setUser({...user,[e.target.name]:e.target.value});
      }
    }

    useEffect(()=>{
      console.log(avatarPreview);
      if(error){
        toast.error(error);
        dispatch(clearErrors());
      }
      if(isAuthenticated){
        toast.success("Login Successfully");
         navigate("/account") 
      }

    },[dispatch,error,history,isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
   <>
    {loading ? <Loader/> :(
      <>
      <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="login_signUp_toggle">
            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
          <div className="loginEmail">
            <MdMailOutline />
            <input
              type="email"
              placeholder="Email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <MdLock />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Link to="/password/forgot">Forget Password</Link>
          <input type="submit" value="Login" className="loginBtn" />
        </form>

        <form
          className="signUpForm"
          ref={registerTab}
          encType="multipart/form-data"
          onSubmit={registerSubmit}
        >
          <div>
            <CgProfile />
            <input
              type="text"
              name="name"
              value={name}
              onChange={registerDataChange}
              required
              placeholder="Name"
            />
          </div>
          <div className="signUpEmail">
            <MdMailOutline />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            />
          </div>
          <div className="signUpPassword">
            <MdLock />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            />
          </div>
          <div className="registerImage" id="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={registerDataChange}
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="signUpBtn"
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

export default LoginSignUp;
