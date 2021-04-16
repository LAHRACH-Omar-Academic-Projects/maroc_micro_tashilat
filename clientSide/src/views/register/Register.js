import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from 'validator';
import { register } from "../../actions/auth";
import CustomInput from "../../components/input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import "./Register.css";
import CustomNavbar from "../../components/navbar/CustomNavbar";
import { Link, Redirect } from "react-router-dom";
import { GoVerified as SuccessIcon } from 'react-icons/go';
import Loader from 'react-loaders';
import 'loaders.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyId, setAgencyId] = useState("");

  const [usernameValidity, setUsernameValidity] = useState(null);
  const [emailValidity, setEmailValidity] = useState(null);
  const [passwordValidity, setPasswordValidity] = useState(null);
  const [confirmPasswordValidity, setConfirmPasswordValidity] = useState(null);
  const [agencyNameValidity, setAgencyNameValidity] = useState(null);
  const [agencyIdValidity, setAgencyIdValidity] = useState(null);

  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(true);

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
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

  const onChangeEmail = (e) => {
    const email = e.target.value;
    if (email === "") {
      setEmailValidity({ "isValid": false, "message": "This field is required!" })
    }
    else if (!isEmail(email)) {
      setEmailValidity({ "isValid": false, "message": "This is not a valid email." })
    }
    else {
      setEmailValidity({ "isValid": true, "message": "" })
      setEmail(email);
    }
  };

  const onChangePassword = (e) => {
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

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    if (confirmPassword === "") {
      setConfirmPasswordValidity({ "isValid": false, "message": "This field is required!" })
    }
    else if (confirmPassword !== password) {
      setConfirmPasswordValidity({ "isValid": false, "message": "The password must be the same as the previous password." })
    }
    else {
      setConfirmPasswordValidity({ "isValid": true, "message": "" })
      setConfirmPassword(confirmPassword);
    }
  }

  const onChangeAgencyName = (e) => {
    const agencyName = e.target.value;
    if (agencyName === "") {
      setAgencyNameValidity({ "isValid": false, "message": "This field is required!" })
    }
    else if (agencyName.length < 6 || agencyName.length > 20) {
      setAgencyNameValidity({ "isValid": false, "message": "The agencyName must be between 6 and 20 characters." })
    }
    else {
      setAgencyNameValidity({ "isValid": true, "message": "" })
      setAgencyName(agencyName);
    }
  };

  const onChangeAgencyId = (e) => {
    const agencyId = e.target.value;
    if (agencyId === "") {
      setAgencyIdValidity({ "isValid": false, "message": "This field is required!" })
    }
    else if (agencyId.length < 1 || agencyId.length > 20) {
      setAgencyIdValidity({ "isValid": false, "message": "The agencyId must be between 1 and 20 characters." })
    }
    else {
      setAgencyIdValidity({ "isValid": true, "message": "" })
      setAgencyId(agencyId);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    if (username === "") {
      setUsernameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
    }
    if (email === "") {
      setEmailValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
    }
    if (password === "") {
      setPasswordValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
    }
    if (confirmPassword === "") {
      setConfirmPasswordValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
    }
    if (agencyName === "") {
      setAgencyNameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
    }
    if (agencyId === "") {
      setAgencyIdValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
    }
    if (usernameValidity !== null &&
      emailValidity !== null &&
      passwordValidity !== null &&
      confirmPasswordValidity !== null &&
      agencyNameValidity !== null &&
      agencyIdValidity !== null) {
      if (usernameValidity.isValid &&
        emailValidity.isValid &&
        passwordValidity.isValid &&
        confirmPasswordValidity.isValid &&
        agencyNameValidity.isValid &&
        agencyIdValidity.isValid) {

        dispatch(register(username, email, confirmPassword, agencyName, agencyId, "user"))
          .then(() => {
            setSuccessful(true);
            setTimeout(() => {
              setLoading(false);
            }, 5000);
          })
          .catch(() => {
            setSuccessful(false);
          });
      }
    }
  };

  if (!loading) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className="Bg" />
      <div className="Register">
        <CustomNavbar />
        {!successful && (
          <div>
            <div className="Header">
              <h1 className="Title">Create an account</h1>
            </div>
            <form className="Form" onSubmit={handleRegister}>
              <h1 className="Title">Sign Up</h1>
              <CustomInput value={username} inputStyle={"username"} type={"text"} placeholder={"Username"} onChange={onChangeUsername} validity={usernameValidity} />
              <CustomInput value={email} inputStyle={"email"} type={"email"} placeholder={"Email"} onChange={onChangeEmail} validity={emailValidity} />
              <CustomInput value={password} inputStyle={"password"} type={"password"} placeholder={"Password"} onChange={onChangePassword} validity={passwordValidity} />
              <CustomInput value={confirmPassword} inputStyle={"confirmPassword"} type={"password"} placeholder={"Confirm password"} onChange={onChangeConfirmPassword} validity={confirmPasswordValidity} />
              <CustomInput value={agencyName} inputStyle={"agencyName"} type={"text"} placeholder={"Agency name"} onChange={onChangeAgencyName} validity={agencyNameValidity} />
              <CustomInput value={agencyId} inputStyle={"agencyId"} type={"number"} placeholder={"Agency id"} onChange={onChangeAgencyId} validity={agencyIdValidity} />
              <CustomButton text={"Create account"} />
              {message && (
                <div className="Danger">
                  {message}
                </div>
              )}
            </form>
            <div className="Links">
              <Link to={"/login"} className="Link">
                <span className="AlreadyHaveAnAccountLink">Already have an account ?</span>
              </Link>
            </div>
          </div>
        )}
        {successful && message && (
          <div className="Card">
            <SuccessIcon color={"rgb(0, 235, 125)"} size={45} />
            <div className="Success">
              {message}
            </div>
            <Loader type="ball-pulse" color="rgb(0, 235, 125)" active={loading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
