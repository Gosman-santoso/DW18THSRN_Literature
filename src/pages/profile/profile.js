import React, { useContext, useState, useEffect } from "react";

import { API } from "../../config/api";
import { Context } from "../../context/context";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaTransgender } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import Head from "../../component/head/head";
import MyLiterature from "../../component/myliterature/myliterature";

import "./profile.css";

function Profile() {
  const [state, dispatch] = useContext(Context);

  // get user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        // bisa
        const res = await API.get(`/users`);

        setUsers(res.data.data.users);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadUsers();
  }, []);

  // console.log(users);

  // edit photo profile
  const [formEdit, setFormEdit] = useState({
    avatar: ""
  });

  const [edit, setEdit] = useState([]);

  const { avatar } = formEdit;

  const handleChange = e => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
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
        avatar
      });

      const res = await API.patch(`/user/${state.user?.id}`, body, config);

      setEdit([...edit, res.data.data.User]);
      alert("Succses");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="box-profile">
      <Head />
      <div className="profile-data">
        <h1>Profile</h1>
        <div className="cover-profile">
          <ul>
            <li>
              <FiMail className="logo-icon" />
              <span>
                <h5>{state.user?.email}</h5>
                <p>Email</p>
              </span>
            </li>
            <li>
              <FaTransgender className="logo-icon" />
              <span>
                <h5>{state.user?.gender}</h5>
                <p>Gender</p>
              </span>
            </li>
            <li>
              <FiPhone className="logo-icon" />
              <span>
                <h5>{state.user?.phone}</h5>
                <p>Mobile Phone</p>
              </span>
            </li>
            <li>
              <MdLocationOn className="logo-icon" />
              <span>
                <h5>{state.user?.address}</h5>
                <p>Address</p>
              </span>
            </li>
          </ul>
          <div className="box-gambar">
            <img src={state.user?.avatar} alt="photo-profile" />

            <form onSubmit={e => handleStore(e)}>
              <input
                onChange={e => handleChange(e)}
                type="text"
                value={avatar}
                name="avatar"
                placeholder="e.g https//googledrive.id=?"
              />
              <button type="submit">Change Photo Profile</button>
            </form>
          </div>
        </div>

        <MyLiterature />
      </div>
    </div>
  );
}

export default Profile;
