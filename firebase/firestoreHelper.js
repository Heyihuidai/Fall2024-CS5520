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
