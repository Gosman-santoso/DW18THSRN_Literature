import React, { useState, useEffect } from "react";

import { API, urlAsset } from "../../config/api";
import { Table } from "react-bootstrap";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiXCircle } from "react-icons/hi";
import { useQuery, useMutation } from "react-query";

import SplashScreen from "../atom/splash/splash";
import HeaderAdm from "../headAdm/headAdm";

import "./verify.css";

function Verify() {
  const [loading, setLoading] = useState(true);


  // Load literatures
  const [getAllLiteratures, setGetAllLiteratures] = useState([]);

  useEffect(() => {
    const loadLiterature = async () => {
      try {
        const res = await API.get("/AdmLiteratures");
        setGetAllLiteratures(res.data.data.literature);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLiterature();
  }, []);

  const {
    isLoading,
    error,
    data: literatureData,
    refetch
  } = useQuery("getLiteratures", () => API.get("/AdmLiteratures"));

  const [approveBook] = useMutation(async id => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const body = JSON.stringify({ status: "Approved" });
      await API.patch(`/literature/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  });

  const [cancelBook] = useMutation(async id => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const body = JSON.stringify({ status: "Canceled" });
      await API.patch(`/literature/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  });

  return (
    <div className="box-verify">
      <HeaderAdm />

      <div className="verify">
        <h1>Verifycation</h1>
        <Table striped bordered hover style={{ background: "white" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Author</th>
              <th>Title</th>
              <th>ISBN</th>
              <th>E-book</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SplashScreen />
            ) : (
              literatureData.data.data.literature.map((liter, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {liter.author}
                  </td>
                  <td style={{ width: "35vh" }}>{liter.title}</td>
                  <td>{liter.ISBN}</td>
                  <td>
                    <a href={urlAsset.file + liter.file} download>
                      {liter.file}
                    </a>
                  </td>
                  <td
                    style={{
                      color:
                        liter.status == "Approved"
                          ? "#0ACF83"
                          : liter.status == "Canceled"
                          ? "#FF0742"
                          : "#F7941E",
                      textAlign: "center"
                    }}
                  >
                    {liter.status == "Approved"
                      ? "Approved"
                      : liter.status == "Canceled"
                      ? "Canceled"
                      : "Waiting"}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {liter.status === "Approved" ? (
                      <AiFillCheckCircle size={40} color="#3BB54A" />
                    ) : liter.status === "Canceled" ? (
                      <HiXCircle size={40} color="#FF0742" />
                    ) : (
                      <>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ marginRight: 10 }}
                          onClick={() => cancelBook(liter.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => approveBook(liter.id)}
                        >
                          Approve
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Verify;
