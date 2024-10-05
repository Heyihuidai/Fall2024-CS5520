import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { StatusBar } from "expo-status-bar";
import Input from "./Input";

export default function Home({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random().toString() };
    setGoals(prevGoals => [...prevGoals, newGoal]);
    setIsModalVisible(false);
  }

  function dismissModal() {
    setIsModalVisible(false);
  }

  function goalDeleteHandler(deletedId) {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== deletedId));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to My awesome app</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addButtonText}>ADD A GOAL</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.list}
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{item.text}</Text>
              <TouchableOpacity onPress={() => goalDeleteHandler(item.id)}>
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No goals to show</Text>
          }
        />
      </View>
      <Input
        visible={isModalVisible}
        onInputSubmit={handleInputData}
        onCancel={dismissModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8a2be2',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  goalText: {
    fontSize: 16,
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});