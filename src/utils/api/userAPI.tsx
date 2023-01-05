import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const fetchUsers = async () => {
    let users = []
    const querySnapshot = await getDocs(collection(db, "users"));
    users = await Promise.all(querySnapshot.docs.map((doc) => doc.data()));
    return users
  }

  export {fetchUsers}

