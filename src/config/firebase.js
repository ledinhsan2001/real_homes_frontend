// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA-td24nwCKS-GYh5w37zibhCi-DfaOyY",
  authDomain: "verify-phone-datn.firebaseapp.com",
  projectId: "verify-phone-datn",
  storageBucket: "verify-phone-datn.appspot.com",
  messagingSenderId: "938263822586",
  appId: "1:938263822586:web:c595fd95d38fb9a3adc943",
  measurementId: "G-9V651XZ0EP"
};

// Initialize Firebase
const firebaseCF = initializeApp(firebaseConfig);

export default firebaseCF;