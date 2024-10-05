import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import sharedStyles from '../styles/sharedStyles.js';

export default function GoalDetails({ route, navigation }) {
  const { goalObj } = route.params;

  const handleMoreDetails = () => {
    navigation.push('Details', { 
      goalObj: {
        ...goalObj,
        additionalInfo: 'This is some additional information about the goal.'
      }
    });
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={sharedStyles.content}>
        <Text style={sharedStyles.title}>Goal Details</Text>
        <Text style={styles.detailText}>Goal: {goalObj.text}</Text>
        <Text style={styles.detailText}>ID: {goalObj.id}</Text>
        {goalObj.additionalInfo && (
          <Text style={styles.detailText}>Additional Info: {goalObj.additionalInfo}</Text>
        )}
        <TouchableOpacity style={sharedStyles.button} onPress={handleMoreDetails}>
          <Text style={sharedStyles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});