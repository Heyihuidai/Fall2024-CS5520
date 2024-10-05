import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GoalItem({ goalObj, handleDelete, navigateToDetails }) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{goalObj.text}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigateToDetails(goalObj)}
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
  text: {
    color: "purple",
    fontSize: 35,
    padding: 5,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});