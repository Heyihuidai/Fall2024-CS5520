import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "MyAwesomeApp";
  const [autoFocus, setAutoFocus] = useState(true);
  const [inputData, setInputData] = useState('')

  const handleInputData = (data) => {
    setInputData(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}/>
      <Input autoFocus={autoFocus} onInputSubmit={handleInputData} />
      <Text>Received data: {inputData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});