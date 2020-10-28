import React, { useState, useContext, useCallback } from "react";

import { Context } from "../../context/context";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import { Modal, Form, Button } from "react-bootstrap";
import { CgAttachment } from "react-icons/cg";
import ImageCropper from "../crop/imgCrop";

function UploadAvatar(props) {
  const [state, dispatch] = useContext(Context);
  const [formData, setFormData] = useState({
    avatar: ""
  });

  const { avatar } = formData;

  const [changePhoto] = useMutation(async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", blob);

      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        }
      };

      const { data } = await API.patch(
        `/user/${state.user.id}`,
        formData,
        config
      );

      dispatch({
        type: "GET_USER",
        payload: data.data
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  });

  const [blob, setBlob] = useState(null);
  const getBlob = blob => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
  };

  const handleFileChange = e => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].type.match("image")
    ) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          setFormData({
            ...formData,
            avatar: reader.result
          });
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmitImage = e => {
    e.preventDefault();
    changePhoto();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={e => handleSubmitImage(e)}>
          {avatar && (
            <>
              <ImageCropper
                getBlob={getBlob}
                inputImg={avatar}
                aspect={1}
                shape="round"
                size={{ width: 328, height: 328 }}
                resize={{ width: 200, height: 200 }}
              />
              <br />
            </>
          )}

          <div className="change-action">
            <Form.Group className="custom-file-container m-0">
              <Form.File
                id="custom-file-translate-html"
                name="avatar"
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Choose avatar
                    <CgAttachment size="20px" className="ml-1" />
                  </div>
                }
                onChange={e => handleFileChange(e)}
                custom
              />
            </Form.Group>

            {avatar && (
              <Button type="submit" className="primary">
                Save
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default UploadAvatar;
