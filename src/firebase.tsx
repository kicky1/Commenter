// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { collection, getFirestore, where, query, getDocs, addDoc} from "firebase/firestore";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { setVisible } from "./zustand/useAuthorizationFormStore";
import { setAuthorized, setUserImage, setUsername } from "./zustand/useAuthorizationStore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider).then(async (res) => {
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }

      setVisible(false)
      setUsername(res.user.displayName ? res.user.displayName : res.user.email)
      setAuthorized(true)
      setUserImage(res.user.photoURL)
    });

  } catch (err) {
    console.error(err);
  }
};


const signInWithFacebook = async () => {
  try {
    await signInWithPopup(auth, facebookProvider).then(async (res) => {
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }

      setVisible(false)
      setUsername(res.user.displayName ? res.user.displayName : res.user.email)
      setAuthorized(true)
      setUserImage(res.user.photoURL)
      console.log(res)
    });

  } catch (err) {
    console.error(err);
  }
};

export { db, auth, signInWithGoogle, signInWithFacebook};