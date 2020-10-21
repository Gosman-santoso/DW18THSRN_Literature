import React, { useState, useEffect } from "react";

import { API } from "../../config/api";
import { Table } from "react-bootstrap";
import { AiFillCheckCircle } from "react-icons/ai";

import HeaderAdm from "../headAdm/headAdm";

function Verify() {
  const [loading, setLoading] = useState(true);

  // >>>>>>>>>>>>>>> Load Books <<<<<<<<<<<<<
  const [booksUser, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

        const res = await API.get("/AdmLiteratures");
        console.log(res);
        setBooks(res.data.data.literature);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadBooks();
  }, []);

  if (loading || !booksUser) {
    console.log("loading");
  } else {
    console.log(booksUser.user_id);
  }

  // >>>>>>>>>>> Approved <<<<<<<<<<<
  const [formAdd, setFormAdd] = useState({
    fullName: "",
    status: "Approved"
  });

  const [book, setBook] = useState([]);

  const { fullName, status } = formAdd;

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
        fullName,
        status
      });

      const res = await API.patch(`/book/${fullName}`, body, config);

      setBook([...book, res.data.data.book]);
      alert("Succses");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="box-verify">
      <HeaderAdm />
      <div className="verify">
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
            {loading || !booksUser ? (
              <h5>Loading..</h5>
            ) : (
              booksUser.map((book, index) => (
                <tr>
                  {/* {console.log(book)} */}
                  <td>{index + 1}</td>
                  <td>{book.user_id.fullName}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.attache}</td>
                  <td
                    style={{
                      color:
                        book.status == "Approved"
                          ? "#0ACF83"
                          : book.status == "Cancel"
                          ? "#FF0742"
                          : "#F7941E",
                      textAlign: "center"
                    }}
                  >
                    {book.status == "Approved"
                      ? "Approved"
                      : book.status == "Cancel"
                      ? "Cancel"
                      : "Waiting to be verified"}
                  </td>

                  {/* >>>>>>>>>>>>>>>>> Button <<<<<<<<<<<<<<< */}
                  <td style={{ textAlign: "center" }}>
                    {book.status == "Approved" ? (
                      // >>>>>>>>>>>>>>> if status approved <<<<<<<<<<<<<
                      <AiFillCheckCircle
                        style={{ color: "#0ACF83", fontSize: "30px" }}
                      />
                    ) : // >>>>>>>>>>>>>>> if status cancel <<<<<<<<<<<<<
                    book.status == "Cancel" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          width: "100%"
                        }}
                      >
                        <button
                          style={{
                            background: "#FF0742",
                            padding: "8px 15px",
                            color: "white",
                            borderRadius: "5px",
                            border: "none"
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          style={{
                            background: "#0ACF83",
                            padding: "8px 15px",
                            color: "white",
                            borderRadius: "5px",
                            border: "none"
                          }}
                        >
                          Approved
                        </button>
                      </div>
                    ) : (
                      // >>>>>>>>>>>>>>> if status waiting <<<<<<<<<<<<<
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          width: "100%"
                        }}
                      >
                        {/* <form onSubmit={(e) => handleStore(e)}> */}
                        <button
                          style={{
                            background: "#FF0742",
                            padding: "8px 15px",
                            color: "white",
                            borderRadius: "5px",
                            border: "none"
                          }}
                          type="submit"
                        >
                          Cancel
                        </button>

                        <button
                          style={{
                            background: "#0ACF83",
                            padding: "8px 15px",
                            color: "white",
                            borderRadius: "5px",
                            border: "none"
                          }}
                          type="submit"
                        >
                          Approved
                        </button>
                        {/* </form> */}
                      </div>
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
