import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Input from './components/Input';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(data) {
    console.log("App.js ", data);
    let newGoal = { text: data, id: Math.random() };
    //make a new obj and store the received data as the obj's text property
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    // setReceivedData(data);
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to My awesome app</Text>
        </View>
        <Button
          title="Add a goal"
          onPress={() => setIsModalVisible(true)}
          color="#007AFF"
        />
      </View>
      <View style={styles.bottomView}>
        {goals.map((goal, index) => (
          <Text key={index} style={styles.goalText}>{goal}</Text>
        ))}
      </View>
      <Input
        visible={isModalVisible}
        onInputSubmit={handleAddGoal}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    borderColor: 'purple',
    borderWidth: 1,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'purple',
  },
  bottomView: {
    flex: 4,
    backgroundColor: '#E6E6FA',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  goalText: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 10,
    textAlign: 'center',
  },
});