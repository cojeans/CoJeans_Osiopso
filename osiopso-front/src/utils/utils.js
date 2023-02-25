// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "비밀^_^",
//     authDomain: "비밀^_^",
//     projectId: "비밀^_^",
//     storageBucket: "비밀^_^",
//     messagingSenderId: "비밀^_^",
//     appId: "비밀^_^",
//     measurementId: "비밀^_^",
// };

// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
// export default app;


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "비밀^_^",
  authDomain: "비밀^_^",
  projectId: "비밀^_^",
  storageBucket: "비밀^_^",
  messagingSenderId: "비밀^_^",
  appId: "비밀^_^",
  measurementId: "비밀^_^",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
