import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZbYuI_T6ARY0eP-UW5d9LokUa5RR1xys",
  authDomain: "uber-eats-reactnative-46f91.firebaseapp.com",
  projectId: "uber-eats-reactnative-46f91",
  storageBucket: "uber-eats-reactnative-46f91.appspot.com",
  messagingSenderId: "838068861903",
  appId: "1:838068861903:web:2ffd27e176a043364ef0ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;