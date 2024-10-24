import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import { useState, useEffect } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { app, database } from './firebaseSetup';
import { collection, addDoc, onSnapshot, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { writeToDB } from "../Firebase/firestoreHelper";

export default function Home({ navigation }) {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";
  const collectionName = 'goals';

  useEffect(() => {
    onSnapshot(collection(database, collectionName), (querySnapshot) => {
      //define an array
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        //populate the array
        newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        console.log(docSnapshot.data());
      });
      //setGoals with the newArray
      setGoals(newArray);
    });
  }, []);

  async function handleInputData(data) {
    console.log("App.js ", data);
    let newGoal = { text: data };
    try {
      await writeToDB(newGoal, collectionName);
      setModalVisible(false);
      console.log("Write to DB successful");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  function dismissModal() {
    setModalVisible(false);
  }

  async function handleGoalDelete(deletedId) {
    try {
      await deleteFromDB(deletedId, collectionName);
      console.log("Goal successfully deleted!");
    } catch (error) {
      console.error("Error removing goal: ", error);
    }
  }

  async function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const snapshot = await getDocs(collection(database, collectionName));
            snapshot.forEach(async (doc) => {
              await deleteDoc(doc.ref);
            });
          } catch (error) {
            console.error("Error deleting all documents: ", error);
          }
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <PressableButton
          pressedHandler={() => setModalVisible(true)}
          componentStyle={{ backgroundColor: "purple" }}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: 5,
                backgroundColor: highlighted ? "purple" : "gray",
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 && <Text style={styles.header}>My Goals List</Text>
          }
          ListFooterComponent={
            goals.length > 0 && <Button title="Delete all" onPress={deleteAll} />
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => (
            <GoalItem
              separators={separators}
              deleteHandler={handleGoalDelete}
              goalObj={item}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: { 
    flex: 4, 
    backgroundColor: "#dcd" 
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});