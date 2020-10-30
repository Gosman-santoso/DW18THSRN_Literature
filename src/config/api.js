import axios from "axios";

// create base URL
export const API = axios.create({
    baseURL: "http://localhost:5000/api/v2"
});

export const setAuthToken = token => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};

export const urlAsset = {
    img: "http://localhost:5000/uploads/img/",
    pdf: "http://localhost:5000/uploads/pdf/",

    file: "http://localhost:5000/public/files/",
    thumbnail: "http://localhost:5000/public/thumbnails/"
};