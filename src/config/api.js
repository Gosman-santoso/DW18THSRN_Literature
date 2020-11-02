import axios from "axios";

// create base URL
// export const API = axios.create({
//     baseURL: "http://localhost:5000/api/v2"
// });

// netify
export const API = axios.create({
    baseURL: "https://try-our-literature.herokuapp.com/api/v2/"
});

export const setAuthToken = token => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};

// export const urlAsset = {
//     img: "http://localhost:5000/uploads/img/",
//     pdf: "http://localhost:5000/uploads/pdf/",

//     file: "http://localhost:5000/public/files/",
//     thumbnail: "http://localhost:5000/public/thumbnails/"
// };

// netify
export const urlAsset = {
    img: "https://try-our-literature.herokuapp.com/api/v2/uploads/img/",
    pdf: "https://try-our-literature.herokuapp.com/api/v2/uploads/pdf/",

    file: "https://try-our-literature.herokuapp.com/api/v2/public/files/",
    thumbnail: "https://try-our-literature.herokuapp.com/api/v2/public/thumbnails/"
};