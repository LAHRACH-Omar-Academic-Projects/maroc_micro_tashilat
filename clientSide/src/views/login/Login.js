import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { login } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import CustomInput from "../../components/input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import "./Login.css";
import CustomNavbar from "../../components/navbar/CustomNavbar";
import { MdError as Danger } from "react-icons/md";
import userService from "../../services/user-service";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameValidity, setUsernameValidity] = useState(null);
  const [passwordValidity, setPasswordValidity] = useState(null);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    dispatch(clearMessage());
    const username = e.target.value;
    if (username === "") {
      setUsernameValidity({ "isValid": false, "message": "This field is required!" })
    }
    else if (username.length < 3 || username.length > 20) {
      setUsernameValidity({ "isValid": false, "message": "The username must be between 3 and 20 characters." })
    }
    else {
      setUsernameValidity({ "isValid": true, "message": "" })
      setUsername(username);
    }
  };

  const onChangePassword = (e) => {
    dispatch(clearMessage());
    const password = e.target.value;
    if (password === "") {
      setPasswordValidity({ "isValid": false, "message": "This field is required!" })
    }
    else if (password.length < 6 || password.length > 40) {
      setPasswordValidity({ "isValid": false, "message": "The password must be between 6 and 40 characters." })
    }
    else {
      setPasswordValidity({ "isValid": true, "message": "" })
      setPassword(password);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "") {
      setPasswordValidity({ "isValid": false, "message": "You forgot to fill in this field!" })   
    }
    if (username === "") {
      setUsernameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
    }
    if (usernameValidity !== null && passwordValidity !== null) {
      if (usernameValidity.isValid && passwordValidity.isValid) {
        setLoading(true);
        dispatch(login(username, password))
          .then(() => {
            console.log("logged successfully!");
            localStorage.setItem("notifications", JSON.stringify([]));
          })
          .catch(() => {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          })
      }
    }
  };
  
  if (isLoggedIn) {
    setTimeout(() => {
      props.history.push("/home");
    }, 4000);
  }

  return (
    <div>
      <div className="Bg" />
      <div className="Login">
        <CustomNavbar />
        <div className="Header">
          <h1 className="Title">Welcome!</h1>
          <span className="Subtitle">Login or create new account.</span>
        </div>
        <form className="Form" onSubmit={handleLogin}>
          <h1 className="Title">Sign In</h1>
          <CustomInput inputStyle={"username"} type={"text"} placeholder={"Username"} onChange={onChangeUsername} validity={usernameValidity} value={username} />
          <CustomInput inputStyle={"password"} type={"password"} placeholder={"Password"} onChange={onChangePassword} validity={passwordValidity} value={password} />
          <CustomButton text={"Sign in"} loading={loading} />
          {message && message[0] !== "V" && !loading && (
            <div className="Danger">
              <Danger size={45}/>
              {message}
            </div>
          )}
        </form>
        <div className="Links">
          <Link to={"/"} className="Link">
            <span className="ForgotPasswordLink">Forgot password ?</span>
          </Link>
          <Link to={"/register"} className="Link">
            <span className="NewAccountLink">Create new account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
