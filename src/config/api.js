import axios from "axios";

// create base URL
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v2"
});

// netify
// export const API = axios.create({
//   baseURL: "https://my-literature.herokuapp.com/api/v2"
// });

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

// netify
// export const urlAsset = {
//   img: "https://my-literature.herokuapp.com/src/uploads/img/",
//   pdf: "https://my-literature.herokuapp.com/src/uploads/pdf/",

//   file: "https://my-literature.herokuapp.com/src/public/files/",
//   thumbnail: "https://my-literature.herokuapp.com/src/public/thumbnails/"
// };
