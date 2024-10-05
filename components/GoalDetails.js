import React, { useState, useLayoutEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import sharedStyles from '../styles/sharedStyles.js';

export default function GoalDetails({ route, navigation }) {
  const { goalObj } = route.params;
  const [isWarning, setIsWarning] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? 'Warning!' : goalObj.text,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fff', marginLeft: 10 }}>All My Goals</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsWarning(!isWarning)}>
          <Text style={{ color: '#fff', marginRight: 10 }}>Warning</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isWarning, goalObj.text]);

  const textStyle = [
    styles.detailText,
    isWarning && styles.warningText
  ];

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={sharedStyles.content}>
        <Text style={sharedStyles.title}>Goal Details</Text>
        <Text style={textStyle}>Goal: {goalObj.text}</Text>
        <Text style={textStyle}>ID: {goalObj.id}</Text>
        {goalObj.additionalInfo && (
          <Text style={textStyle}>Additional Info: {goalObj.additionalInfo}</Text>
        )}
        <TouchableOpacity style={sharedStyles.button} onPress={() => navigation.goBack()}>
          <Text style={sharedStyles.buttonText}>Go Back</Text>
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
  warningText: {
    color: 'red',
  },
});