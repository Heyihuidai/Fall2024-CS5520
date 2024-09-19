import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "MyAwesomeApp";
  const [autoFocus, setAutoFocus] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputData, setInputData] = useState('')

  const handleInputData = (data) => {
    setInputData(data);
    setIsModalVisible(false); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to {appName}</Text>
      </View>
      <Button
        title="Add a goal"
        onPress={() => setIsModalVisible(true)}
        color="#007AFF"
      />
      <Input 
        autoFocus={autoFocus}
        visible={isModalVisible}
        onInputSubmit={handleInputData}
      />
      {inputData ? <Text style={styles.goalText}>{inputData}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    borderColor: 'purple',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: 'purple',
    textAlign: 'center',
  },
  goalText: {
    fontSize: 16,
    color: 'purple',
    textAlign: 'center',
    marginTop: 20,
  },
});