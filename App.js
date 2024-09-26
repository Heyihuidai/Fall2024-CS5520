import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';
import Input from './components/Input';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const renderGoalItem = ({ item }) => (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{item.text}</Text>
    </View>
  );

  function handleAddGoal(data) {
    console.log("App.js ", data);
    let newGoal = { text: data, id: Math.random().toString() };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
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
  bottomView: {
    flex: 1,
    backgroundColor: '#dcd',
    width: '100%',
  },
  listContent: {
    padding: 20,
    alignItems: 'center',
  },
  goalItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  goalText: {
    fontSize: 35,
    color: 'blue',
    textAlign: 'center',
  },
});