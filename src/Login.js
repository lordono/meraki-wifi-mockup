import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.scss";
import WifiPng from "./img/wifi.png";

const fakeCredentials = [
  { user: "cisco", password: "cisco" },
  { user: "diet", password: "coke" },
];

const LoginPage = (props) => {
  const { setMyAuth } = props;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const loginCall = (e) => {
    e.preventDefault();
    console.log("triggered");

    if (!user || !password) {
      setError("Required fields missing.");
    } else {
      let check = false;
      for (let cred of fakeCredentials) {
        if (cred.user === user && cred.password === password) {
          check = true;
        }
      }
      if (check) {
        setMyAuth(true);
        setTimeout(() => history.push("/"), 250);
      } else {
        setError("Username and Password mismatch.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-title">
          <img src={WifiPng} alt="Logo" className="login-logo" />
          Meraki Wifi Demo
        </div>
        <div className="login-error">{error}</div>
        <form onSubmit={loginCall}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-btn"
            onClick={loginCall}
            type="submit"
            value="Submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
