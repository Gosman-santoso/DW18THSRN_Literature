import React from "react";
import { Modal, Alert } from "react-bootstrap";

export const AlertRegist = props => {
  const p = {
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins"
  };
  return (
    <Modal {...props} centered size="lg">
      <Alert style={{ background: "#161616", margin: "0" }}>
        <p style={p}>{props.children}</p>
      </Alert>
    </Modal>
  );
};
