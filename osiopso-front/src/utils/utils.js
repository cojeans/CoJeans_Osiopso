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
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDERID,
  appId: REACT_APP_APPID,
  measurementId: REACT_APP_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;