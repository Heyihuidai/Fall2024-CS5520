import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (error) {
    console.error("Error writing to DB: ", error);
    throw error;
  }
}

export async function deleteFromDB(id, collectionName) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
    throw error;
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const deletePromises = querySnapshot.docs.map(docSnapshot =>
      deleteFromDB(docSnapshot.id, collectionName)
    );
    await Promise.all(deletePromises);
    console.log("All documents in collection deleted!");
  } catch (err) {
    console.error("Error deleting all documents: ", err);
    throw err;
  }
}

// Users subcollection operations
export const addUsersToSubcollection = async (goalId, users) => {
  try {
    const usersRef = collection(db, 'goals', goalId, 'users');
    const results = [];
    
    for (const user of users) {
      const docRef = await addDoc(usersRef, user);
      results.push({ id: docRef.id, ...user });
    }
    
    return results;
  } catch (error) {
    console.error('Error adding users:', error);
    throw error;
  }
};

export const getUsersFromSubcollection = async (goalId) => {
  try {
    const usersRef = collection(db, 'goals', goalId, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

// GoalUsers Component
const GoalUsers = ({ goalId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const firestoreUsers = await getUsersFromSubcollection(goalId);
        
        if (firestoreUsers.length === 0) {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) throw new Error('Failed to fetch users');
          
          const data = await response.json();
          const savedUsers = await addUsersToSubcollection(goalId, data);
          setUsers(savedUsers);
        } else {
          setUsers(firestoreUsers);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (goalId) {
      loadUsers();
    }
  }, [goalId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default GoalUsers;