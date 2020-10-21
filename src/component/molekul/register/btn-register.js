import React, { useState, useContext, useEffect } from "react";

import { API } from "../../../config/api";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

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

  useEffect(() => {
    console.log(formAdd);
  }, [formAdd]);

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
    <div>
      <div className="box-login">
        <button onClick={() => handleShow()}>Register</button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <form onSubmit={e => handleStore(e)}>
            <Modal.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="username"
                  aria-label="username"
                  aria-describedby="basic-addon2"
                  value={email}
                  name="email"
                  onChange={e => handleChange(e)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">
                    @gmail.com
                  </InputGroup.Text>
                </InputGroup.Append>
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
                className="custom-select my-2"
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
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Register
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default BtnRegister;
