import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3iK4jgh2rUFD9TWJ9H4sgKnYWzWncvnw",
  authDomain: "exclusive-ecommerce-df0e4.firebaseapp.com",
  projectId: "exclusive-ecommerce-df0e4",
  storageBucket: "exclusive-ecommerce-df0e4.firebasestorage.app",
  messagingSenderId: "55980994948",
  appId: "1:55980994948:web:aaa360f005f37dc783add1",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
