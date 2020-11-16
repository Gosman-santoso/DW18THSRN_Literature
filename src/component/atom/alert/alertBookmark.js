import React from "react";
import { Modal, Alert } from "react-bootstrap";

const p = {
  textAlign: "center",
  fontSize: 20,
  marginTop: "5vh",
  color: "white",
  fontWeight: "bold",
  fontFamily: "Poppins"
};

const AlertBookmark = props => {
  return (
    <Modal {...props} size="lg" centered id="addSuccess">
      <Alert variant="none" style={{ margin: "0", backgroundColor: "#161616" }}>
        <p style={p}>{props.children}</p>
      </Alert>
    </Modal>
  );
};

export default AlertBookmark;
