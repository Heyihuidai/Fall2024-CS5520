import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";
import Input from "./Input";
import GoalItem from "./GoalItem";
import sharedStyles from '../styles/sharedStyles.js';

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

  // Remove the navigateToDetails function as it's no longer needed

  return (
    <SafeAreaView style={sharedStyles.container}>
      <StatusBar style="auto" />
      <View style={sharedStyles.content}>
        <Text style={sharedStyles.title}>Welcome to My awesome app</Text>
        <TouchableOpacity
          style={[sharedStyles.button, styles.addButton]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={sharedStyles.buttonText}>ADD A GOAL</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.list}
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GoalItem
              goalObj={item}
              handleDelete={goalDeleteHandler}
              // Remove the navigateToDetails prop
            />
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
  addButton: {
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});