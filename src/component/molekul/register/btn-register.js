import React, { useState, useContext, useEffect } from "react";

import { API, urlAsset } from "../../../config/api";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

import "./btn-regist.css";

function BtnRegister() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formAdd, setFormAdd] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
    avatar: `${urlAsset.img}profile-default.jpg`
  });

  const [book, setBook] = useState([]);

  const { email, password, fullName, gender, phone, address, avatar } = formAdd;

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
      alert("Succses");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="box-regist">
      <button className="landing-btn-regist" onClick={() => handleShow()}>
        Register
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
              value={password}
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
              value={password}
              onChange={e => handleChange(e)}
              name="phone"
              type="phone"
            />
            <input
              className="inputan"
              placeholder="Address"
              value={password}
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
              Register
            </button>
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
}

export default BtnRegister;
