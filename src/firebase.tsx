// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { collection, getFirestore, where, query, getDocs, addDoc} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
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


const createUserAccountWithEmailAndPassword = async (email:any, password:any, name:any) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        authProvider: "email",
        email: user.email,
      });
    }
    setVisible(false)
    setUsername(name)
    setAuthorized(true)
    setUserImage(res.user.photoURL)
    console.log(res)
  } catch (err: any) {
    console.log(err.code)
    return err.code
  }
};


const signUserAccountWithEmailAndPassword = async (email:any, password:any) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(async (res) => {
      setVisible(false)
      setUsername(res.user.displayName)
      setAuthorized(true)
      setUserImage(res.user.photoURL)
    });
  } catch (err: any) {
    console.log(err.errors.message)
  }
};



export { db, auth, signInWithGoogle, createUserAccountWithEmailAndPassword, signUserAccountWithEmailAndPassword};