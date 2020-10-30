import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Context } from "../../context/context";
import { API } from "../../config/api";

const UploadImage = props => {
  const id = localStorage.getItem("id");
  const [state, dispatch] = useContext(Context);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState("");

  const [uploadImage] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      const formData = new FormData();
      formData.append("avatar", image, image.name);

      const res = await API.patch(`/user/${state.user?.id}`, formData, config);
      setSuccess(res.data.message);
      dispatch({
        type: "UPLOAD_IMAGE",
        payload: res.data.data.user
      });
      props.refetch();
    } catch (err) {
      console.log(err.message);
    }
  });

  const fileData = () => {
    if (image) return <h5>{image.name}</h5>;

    return null;
  };

  return (
    <Container style={{ padding: "3vh" }}>
      <Col
        lg={6}
        className=" d-flex justify-content-center align-items-center flex-column"
      >
        <img height="150" width="150" src={preview} alt="" />
      </Col>
      <Row>
        <Col md={12} className="d-flex justify-content-center flex-column">
          <Form
            onSubmit={e => {
              e.preventDefault();
              uploadImage();
            }}
          >
            <Form.Group>
              <div className="custom-file">
                <input
                  type="file"
                  onChange={e => {
                    setImage(e.target.files[0]);
                    const objectUrl = URL.createObjectURL(e.target.files[0]);
                    setPreview(objectUrl);
                  }}
                  className="custom-file-input"
                  id="image"
                />

                <label className="custom-file-label" htmlFor="image">
                  {image ? fileData() : "Choose File"}
                </label>
              </div>
            </Form.Group>
            <Button
              className="btn"
              type="submit"
              style={{ backgroundColor: "#AF2E1C", color: "#ffffff" }}
            >
              Submit
            </Button>
          </Form>
          <small>{success}</small>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadImage;
