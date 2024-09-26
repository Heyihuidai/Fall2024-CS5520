import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';
import Input from './components/Input';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [receivedData, setReceivedData] = useState("");

  function handleAddGoal(data) {
    console.log("App.js ", data);
    let newGoal = { text: data, id: Math.random().toString() };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setReceivedData(data);
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderGoalItem = ({ item }) => (
    <View style={styles.textContainer}>
      <Text style={styles.goalText}>{item.text}</Text>
    </View>
  );

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
      {receivedData ? (
        <Text style={styles.receivedDataText}>Last added goal: {receivedData}</Text>
      ) : null}
      <FlatList
        style={styles.bottomView}
        contentContainerStyle={styles.listContent}
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={item => item.id}
      />
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: 'purple',
  },
  receivedDataText: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#dcd',
    width: '100%',
  },
  listContent: {
    padding: 20,
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  goalText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
  },
});