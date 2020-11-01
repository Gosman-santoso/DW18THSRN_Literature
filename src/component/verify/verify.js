import React, { useState, useEffect } from "react";

import { API } from "../../config/api";
import { Table } from "react-bootstrap";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiXCircle } from "react-icons/hi";
import { useQuery, useMutation } from "react-query";

import HeaderAdm from "../headAdm/headAdm";

import "./verify.css";

function Verify() {
  const [loading, setLoading] = useState(true);

  // Load literatures
  const [literatures, setLiterature] = useState([]);

  useEffect(() => {
    const loadLiterature = async () => {
      try {
        const res = await API.get("/AdmLiteratures");
        setLiterature(res.data.data.literature);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLiterature();
  }, []);

  // Update Status
  const {
    isLoading,
    error,
    data: literatureData,
    refetch
  } = useQuery("getLiteratureAll", () => API.get(`/AdmLiteratures`));

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
              <th>ISBN</th>
              <th>E-book</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !literatures ? (
              <h5>Loading..</h5>
            ) : (
              literatures.map((literature, index) => (
                <tr>
                  {/* {console.log(book)} */}
                  <td>{index + 1}</td>
                  <td>{literature.user_id.fullName}</td>
                  <td>{literature.ISBN}</td>
                  <td>{literature.file}</td>
                  <td
                    style={{
                      color:
                        literature.status == "Approved"
                          ? "#0ACF83"
                          : literature.status == "Canceled"
                          ? "#FF0742"
                          : "#F7941E",
                      textAlign: "center"
                    }}
                  >
                    {literature.status == "Approved"
                      ? "Approved"
                      : literature.status == "Canceled"
                      ? "Canceled"
                      : "Waiting"}
                  </td>

                  <td>
                    {literature.status === "Approved" ? (
                      <AiFillCheckCircle size={40} color="#3BB54A" />
                    ) : literature.status === "Canceled" ? (
                      <HiXCircle size={40} color="#FF0742" />
                    ) : (
                      <>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ marginRight: 10 }}
                          onClick={() => cancelBook(literature.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => approveBook(literature.id)}
                        >
                          Approve
                        </button>
                      </>
                    )}
                  </td>

                  {/* {literature.status == "Approved" ? (
                    <td style={{ textAlign: "center" }}>
                      <AiFillCheckCircle
                        style={{
                          color: "#3BB54A",
                          fontSize: "30px"
                        }}
                      />
                    </td>
                  ) : literature.status == "Canceled" ? (
                    <MdCancel style={{ color: "red" }} />
                  ) : (
                    <td style={{ textAlign: "center" }}>
                      <button
                        style={{ marginRight: "10px" }}
                        className="btn btn-danger"
                        type="submit"
                      >
                        Cancel
                      </button>

                      <button className="btn btn-success" type="submit">
                        Approve
                      </button>
                    </td>
                  )} */}
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
