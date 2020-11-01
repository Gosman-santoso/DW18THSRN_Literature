import React, { useState, useContext } from "react";

import { Context } from "./../../../context/context";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../../config/api";
import { Modal } from "react-bootstrap";

import "./btn-login.css";

function BtnLogin() {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  // login
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await API.post("/login", body, config);
      dispatch({
        type: "LOGIN_SUCCSES",
        payload: res.data.data
      });

      setAuthToken(res.data.data.token);

      if (email === "admin@gmail.com" && password === "admin123") {
        history.push("/mainAdm");
        dispatch({
          type: "LOGIN_SUCCSES",
          payload: res.data.data
        });
        return;
      } else {
        console.log("Failed");
        dispatch({
          type: "LOGIN_FAIL"
        });
      }

      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR"
        });
      }

      console.log("Succses");
      history.push("/main");
    } catch (err) {
      alert("fail");
      dispatch({
        type: "LOGIN_FAIL"
      });
    }
  };

  return (
    <div
      className="box-login-landing"
      style={{
        color: "black",
        background: "white !important",
        borderRadius: "5px"
      }}
    >
      <button className="landingBtnLogin" onClick={() => handleShow()}>
        Sign In
      </button>

      <Modal className="modalShow lg-col-5" show={show} onHide={handleClose}>
        <form onSubmit={e => handleSubmit(e)}>
          <Modal.Body className="modal-body">
            <Modal.Header closeButton style={{ border: "none" }}>
              <Modal.Title className="title-sign">Sign In</Modal.Title>
            </Modal.Header>

            <input
              className="inputan"
              placeholder="username"
              value={email}
              onChange={e => handleChange(e)}
              name="email"
              type="email"
            />

            <input
              className="inputan"
              placeholder="password"
              value={password}
              onChange={e => handleChange(e)}
              name="password"
              type="password"
            />

            <button className="login-btn">Sign In</button>
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
}

export default BtnLogin;
