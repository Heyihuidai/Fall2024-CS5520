import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function GoalDetails({ route }) {
  const { goalObj } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Goal Details</Text>
        <Text style={styles.detailText}>Goal: {goalObj.text}</Text>
        <Text style={styles.detailText}>ID: {goalObj.id}</Text>
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
});