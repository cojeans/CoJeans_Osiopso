// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyAtgDtxzIdAQdvSEKjxd2UBGoKscEq_j6M",
//     authDomain: "osiopso-fc80c.firebaseapp.com",
//     projectId: "osiopso-fc80c",
//     storageBucket: "osiopso-fc80c.appspot.com",
//     messagingSenderId: "74373764080",
//     appId: "1:74373764080:web:c5c6eba2d9450ce0fb8335",
//     measurementId: "G-QHSTBHHRQK",
// };

// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
// export default app;


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCESE3FBfTVvTQd-Xt2beJJRpfmbfomUZw",
  authDomain: "osiopso.firebaseapp.com",
  projectId: "osiopso",
  storageBucket: "osiopso.appspot.com",
  messagingSenderId: "679410198207",
  appId: "1:679410198207:web:97a1ccc4dfe4b9c5e6480a",
  measurementId: "G-N1XB2BHBXF",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;