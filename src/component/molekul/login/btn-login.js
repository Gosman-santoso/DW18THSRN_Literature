import React, { useState, useEffect, useContext } from "react";

import { Context } from "./../../../context/context";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../../config/api";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
    <div className="box-login">
      <button onClick={() => handleShow()}>Login</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>

        <form onSubmit={e => handleSubmit(e)}>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="username"
                aria-label="username"
                aria-describedby="basic-addon2"
                value={email}
                onChange={e => handleChange(e)}
                name="email"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon2"
                value={password}
                onChange={e => handleChange(e)}
                name="password"
                type="password"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2"></InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Login
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default BtnLogin;
