import React, { useState, useContext, useEffect } from "react";

import { Context } from "../../context/context";
import { API } from "../../config/api";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { MdAttachFile } from "react-icons/md";
import { Alert } from "react-bootstrap";

import Head from "../../component/head/head";
import AlertModal from "../../component/atom/alert/alertModal";

import "./add.css";

function AddLiterature() {
  const [state] = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const SUPPORTED_FORMATS_IMAGE = ["image/jpg", "image/jpeg", "image/png"];
  const SUPPORTED_FORMATS_FILE = ["application/pdf"];

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    values,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues: {
      userId: state.user.id,
      title: "",
      publication_date: "",
      pages: "",
      ISBN: "",
      author: "",
      file: "",
      thumbnail: "",
      status: "Waiting"
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required()
        .min(3),
      publication_date: Yup.string().required(),
      pages: Yup.number().required(),
      ISBN: Yup.string()
        .matches(/^[0-9]+$/, "ISBN only accepts input numbers from 0-9")
        .required()
        .min(8),
      author: Yup.string().required(),
      thumbnail: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept image filetype",
          value => value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
        ),
      file: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept epub/pdf filetype",
          value => value && SUPPORTED_FORMATS_FILE.includes(value.type)
        )
    }),
    onSubmit: values => {
      console.log(values);

      storeLiterature(values);
      resetForm({ values: "" });
    }
  });

  const [storeLiterature, { isLoading, error }] = useMutation(async values => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      formData.append("userId", values.userId);
      formData.append("title", values.title);
      formData.append("publication_date", values.publication_date);
      formData.append("pages", values.pages);
      formData.append("ISBN", values.ISBN);
      formData.append("author", values.author);
      formData.append("file", values.file);
      formData.append("thumbnail", values.thumbnail);
      formData.append("status", values.status);

      const res = await API.post("/literatures", formData, config);
      setShowAlert(true);
    } catch (err) {
      console.log(err.response.data.message);
      setErrorMsg(err.response.data.message);
    }
  });

  return (
    <div>
      <Head />
      <div className="box-literature">
        {errorMsg ? <Alert variant="danger">{errorMsg || error}</Alert> : null}
        <form onSubmit={handleSubmit}>
          <h1> Add Literature </h1>
          <input
            name="title"
            type="text"
            placeholder="Title"
            {...getFieldProps("title")}
          />
          {touched.title && errors.title ? (
            <p style={{ color: "red" }}>{errors.title}</p>
          ) : null}
          <input
            name="publication_date"
            type="date"
            placeholder="Publication date"
            {...getFieldProps("publication_date")}
          />
          <input
            name="pages"
            type="number"
            placeholder="Pages"
            {...getFieldProps("pages")}
          />
          <input
            name="ISBN"
            type="number"
            placeholder="ISBN"
            {...getFieldProps("ISBN")}
          />
          <input
            name="author"
            type="text"
            placeholder="Author"
            {...getFieldProps("author")}
          />

          <div className="attach-thumbnail">
            <input
              type="file"
              placeholder="Thumbnail"
              onChange={e => {
                setFieldValue("thumbnail", e.target.files[0]);
              }}
              id="thumbnail"
              style={{ display: "none" }}
            />
            <label for="thumbnail">
              {values.thumbnail.name
                ? values.thumbnail.name
                : "Attache thumbnail"}
              <MdAttachFile />
            </label>
            <span className="help-block text-danger">
              {touched.thumbnail ? errors.thumbnail : ""}
            </span>
          </div>

          <div className="attach-file">
            <input
              type="file"
              placeholder="File"
              onChange={e => {
                setFieldValue("file", e.target.files[0]);
              }}
              id="file"
              style={{ display: "none" }}
            />
            <label for="file">
              {values.file.name ? values.file.name : "Attache file pdf"}
              <MdAttachFile style={{ color: "white" }} />
            </label>
            <span className="help-block text-danger">
              {touched.file ? errors.file : ""}
            </span>
          </div>
          <button type="submit"> Add Literature </button>
        </form>
        <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>
              Your literature succsesfully created, please wait 1x24 hour to
              verify
            </p>
          </div>
        </AlertModal>
      </div>
    </div>
  );
}

export default AddLiterature;
