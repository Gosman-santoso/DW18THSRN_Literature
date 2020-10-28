import React, { useState, useContext, useEffect } from "react";

import { API } from "../../../config/api";
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
    address: ""
  });

  const [book, setBook] = useState([]);

  const { email, password, fullName, gender, phone, address } = formAdd;

  // useEffect(() => {
  //   console.log(formAdd);
  // }, [formAdd]);

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

            <InputGroup className="mb-3">
              <FormControl
                placeholder="email"
                aria-label="email"
                aria-describedby="basic-addon2"
                value={email}
                name="email"
                type="email"
                onChange={e => handleChange(e)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon2"
                value={password}
                name="password"
                type="password"
                onChange={e => handleChange(e)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Full Name"
                aria-label="Full Name"
                aria-describedby="basic-addon2"
                name="fullName"
                value={fullName}
                onChange={e => handleChange(e)}
              />
            </InputGroup>

            <select
              className="custom-select mb-3 form-control"
              value={gender}
              onChange={e => {
                setFormAdd({ ...formAdd, gender: e.target.value });
              }}
            >
              <option value="" disable selected hidden>
                Gender
              </option>
              <option value="male">Man</option>
              <option value="female">Woman</option>
            </select>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Phone"
                aria-label="Phone"
                aria-describedby="basic-addon2"
                name="phone"
                value={phone}
                onChange={e => handleChange(e)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Address"
                aria-label="Address"
                aria-describedby="basic-addon2"
                name="address"
                value={address}
                onChange={e => handleChange(e)}
              />
            </InputGroup>
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
