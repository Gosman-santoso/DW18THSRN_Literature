import firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyBCL9Jn72bJ0ns_kqZcSxZFbawUn2cJWs4",
    authDomain: "my-literature-cbdfa.firebaseapp.com",
    databaseURL: "https://my-literature-cbdfa.firebaseio.com",
    projectId: "my-literature-cbdfa",
    storageBucket: "my-literature-cbdfa.appspot.com",
    messagingSenderId: "521036470287",
    appId: "1:521036470287:web:e78fa544b6142ba1742b7a",
    measurementId: "G-LLR3EVS2K3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;