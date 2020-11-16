import React, { useState } from "react";

import { API, urlAsset } from "../../../config/api";
import { Modal, Alert } from "react-bootstrap";
import { AlertRegist } from "../../../component/atom/alert/alertRegist";

import "./btn-regist.css";

function BtnRegister() {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formAdd, setFormAdd] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: ""
  });

  const [book, setBook] = useState([]);

  const { email, password, fullName, gender, phone, address } = formAdd;

  const handleChange = e => {
    setFormAdd({ ...formAdd, [e.target.name]: e.target.value });
  };

  const handleStore = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify({
        email,
        password,
        fullName,
        gender,
        phone,
        address
      });

      const res = await API.post("/register", body, config);

      setBook([...book, res.data.data]);
      setFormAdd({
        email: "",
        password: "",
        fullName: "",
        gender: "",
        phone: "",
        address: ""
      });
      setShowAlert(true);
    } catch (err) {
      console.log(err);
      setShowAlert(false);
      setErrorMessage("Failed. Please check form again");
      // alert("Failed");
    }
  };

  return (
    <div className="box-regist">
      <button className="landing-btn-regist" onClick={() => handleShow()}>
        Sign Up
      </button>

      <Modal className="modalRegist lg-col-5" show={show} onHide={handleClose}>
        <form onSubmit={e => handleStore(e)}>
          <Modal.Body
            style={{
              backgroundColor: "#161616"
            }}
          >
            <Modal.Header closeButton style={{ border: "none" }}>
              <Modal.Title className="title-sign">Sign Up</Modal.Title>
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
            <input
              className="inputan"
              placeholder="Full Name"
              value={fullName}
              onChange={e => handleChange(e)}
              name="fullName"
              type="fullName"
            />
            <select
              className="inputan"
              style={{ color: "rgb(172, 172, 172)" }}
              value={gender}
              onChange={e => {
                setFormAdd({ ...formAdd, gender: e.target.value });
              }}
            >
              <option value="" disable selected hidden>
                Gender
              </option>
              <option className="inputan" value="male">
                Man
              </option>
              <option className="inputan" value="female">
                Woman
              </option>
            </select>
            <input
              className="inputan"
              placeholder="Phone"
              value={phone}
              onChange={e => handleChange(e)}
              name="phone"
              type="phone"
            />
            <input
              className="inputan"
              placeholder="Address"
              value={address}
              onChange={e => handleChange(e)}
              name="address"
              type="address"
            />
            <button
              className="register-btn"
              type="submit"
              variant="danger"
              onClick={handleClose}
            >
              Sign Up
            </button>
          </Modal.Body>
        </form>
      </Modal>

      {errorMessage ? (
        <AlertRegist
          show={showAlert}
          onHide={() => {
            handleClose();
            setShowAlert(false);
          }}
        >
          <p>Failed. Please check your form again</p>
        </AlertRegist>
      ) : (
        <AlertRegist
          show={showAlert}
          onHide={() => {
            handleClose();
            setShowAlert(false);
          }}
        >
          <p>Your account succsessfully created</p>
        </AlertRegist>
      )}
    </div>
  );
}

export default BtnRegister;
