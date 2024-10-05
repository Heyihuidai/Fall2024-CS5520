import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Goal Details</Text>
        <Text style={styles.detailText}>Goal: {goalObj.text}</Text>
        <Text style={styles.detailText}>ID: {goalObj.id}</Text>
        {goalObj.additionalInfo && (
          <Text style={styles.detailText}>Additional Info: {goalObj.additionalInfo}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleMoreDetails}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});