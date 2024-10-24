import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { database } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
  const docRef = await addDoc(collection(database, collectionName), data);
}

async function deleteFromDB(id, collectionName) {
    try {
      const docRef = doc(database, collectionName, id);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }

  async function deleteAllFromDB(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(database, collectionName));
      const deletePromises = querySnapshot.docs.map(docSnapshot => 
        deleteFromDB(docSnapshot.id, collectionName)
      );
      await Promise.all(deletePromises);
      console.log("All documents in collection deleted!");
    } catch (err) {
      console.error("Error deleting all documents: ", err);
    }
  }

  // FirestoreHelper.js
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';

export const addUsersToSubcollection = async (goalId, users) => {
  const usersRef = collection(db, 'goals', goalId, 'users');
  for (const user of users) {
    await addDoc(usersRef, user);
  }
};

export const getUsersFromSubcollection = async (goalId) => {
  const usersRef = collection(db, 'goals', goalId, 'users');
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const GoalUsers = ({ goalId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const firestoreUsers = await getUsersFromSubcollection(goalId);
        
        if (firestoreUsers.length === 0) {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const data = await response.json();
          await addUsersToSubcollection(goalId, data);
          setUsers(data);
        } else {
          setUsers(firestoreUsers);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadUsers();
  }, [goalId]);
};
