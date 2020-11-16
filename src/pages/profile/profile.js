import React, { useContext, useState, useEffect } from "react";

import { API, urlAsset } from "../../config/api";
import { Context } from "../../context/context";
import { useQuery } from "react-query";
import { Modal } from "react-bootstrap";

import { FiMail, FiPhone } from "react-icons/fi";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// import UploadAvatar from "../../component/upload-avatar/uploadAvatar";
import Head from "../../component/head/head";
import MyLiterature from "../../component/myliterature/myliterature";
import UploadImage from "./uploadImg";
import SplashScreen from "../../component/atom/splash/splash";

import "./profile.css";

function Profile() {
  const [state, dispatch] = useContext(Context);

  // modal
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const {
    isLoading,
    error,
    data: profileData,
    refetch
  } = useQuery("getUserById", () => API.get(`/user/${state.user?.id}`));

  return (
    <div className="box-profile">
      <Head />

      <div className="profile-data">
        <h1>Profile</h1>
        {isLoading || !profileData ? (
          <SplashScreen />
        ) : (
          <div className="cover-profile">
            <ul>
              <li>
                <FiMail className="logo-icon" />
                <span>
                  <h5>{profileData.data.data.User.email}</h5>
                  <p>Email</p>
                </span>
              </li>
              <li>
                <FaTransgender className="logo-icon" />
                <span>
                  <h5>{profileData.data.data.User.gender}</h5>
                  <p>Gender</p>
                </span>
              </li>
              <li>
                <FiPhone className="logo-icon" />
                <span>
                  <h5>{profileData.data.data.User.phone}</h5>
                  <p>Mobile Phone</p>
                </span>
              </li>
              <li>
                <MdLocationOn className="logo-icon" />
                <span>
                  <h5>{profileData.data.data.User.address}</h5>
                  <p>Address</p>
                </span>
              </li>
            </ul>

            <div className="box-gambar">
              <img
                className="pictureImage"
                src={urlAsset.img + profileData.data.data.User.avatar}
                alt="photo-profile"
              />

              <button onClick={handleShow}>Change Picture</button>

              <Modal
                centered
                show={showModal}
                onHide={() => setShowModal(false)}
              >
                <UploadImage refetch={() => refetch()} />
              </Modal>
            </div>
          </div>
        )}

        <MyLiterature />
      </div>
    </div>
  );
}

export default Profile;
