import React, { useState, useContext, useEffect } from "react";

import { Context } from "../../context/context";
import { API } from "../../config/api";
import { BiBookmark } from "react-icons/bi";

// import Succses from "./../../../Components/modalSuccses";
import Head from "../../component/head/head";

import "./add.css";

function AddBook() {
  // get user id
  const [state] = useContext(Context);

  // add book
  const [formAdd, setFormAdd] = useState({
    title: "",
    publication_date: "",
    userId: `${state.user?.id}`,
    pages: "",
    ISBN: "",
    author: "",
    status: "Waiting",
    attache: ""
  });

  // menampung file formAdd
  const [book, setBook] = useState([]);

  const {
    title,
    publication_date,
    userId,
    pages,
    ISBN,
    author,
    status,
    attache
  } = formAdd;

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
        title,
        publication_date,
        userId,
        pages,
        ISBN,
        author,
        status,
        attache
      });

      const res = await API.post("/literatures", body, config);

      setBook([...book, res.data.data.Literature]);
      alert(
        "Thank you for adding your own books to our website, please wait 1 x 24 hours to verify whether this book is your writing"
      );
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div>
      <Head />
      <div className="box-literature">
        <form onSubmit={e => handleStore(e)}>
          <h1>Add Literature</h1>
          <input
            onChange={e => handleChange(e)}
            value={title}
            name="title"
            type="text"
            placeholder="Title"
          />
          <input
            onChange={e => handleChange(e)}
            value={publication_date}
            name="publication_date"
            type="date"
            placeholder="Publication date"
          />
          <input
            onChange={e => handleChange(e)}
            value={pages}
            name="pages"
            type="number"
            placeholder="Pages"
          />
          <input
            onChange={e => handleChange(e)}
            value={ISBN}
            name="ISBN"
            type="number"
            placeholder="ISBN"
          />
          <input
            onChange={e => handleChange(e)}
            value={author}
            name="author"
            type="text"
            placeholder="Author"
          />
          <input
            onChange={e => handleChange(e)}
            value={attache}
            name="attache"
            type="text"
            placeholder="Attache"
          />
          <button type="submit">Add Literature</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
