import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate('Details', { goalObj });
  };

  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{goalObj.text}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigateToDetails}
          style={styles.infoButton}
        >
          <Text style={styles.buttonText}>i</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(goalObj.id)}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  goalText: {
    color: "purple",
    fontSize: 35,
    padding: 5,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoButton: {
    marginRight: 10,
  },
  buttonText: {
    color: "blue",
    fontSize: 24,
  },
  deleteText: {
    color: "red",
    fontSize: 24,
  },
});