import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function Input({ autoFocus = false }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(autoFocus);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function updateText(changedText) {
    setText(changedText);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleConfirm() {
    if (text.length >= 3) {
      Alert.alert("Confirmation", "Thank you for your input!");
      onInputSubmit(text);
      setText(""); 
    } else {
      Alert.alert("Error", "Please type more than 3 characters");
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Enter your goal:</Text>
        <TextInput
          ref={inputRef}
          placeholder="Type something"
          keyboardType="default"
          style={styles.input}
          value={text}
          onChangeText={updateText}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {isFocused && text.length > 0 && (
          <Text>Character count: {text.length}</Text>
        )}
        {!isFocused && (
          <Text style={styles.instruction}>
            {text.length >= 3
              ? "Thank you"
              : "Please type more than 3 characters"}
          </Text>
        )}
        <View style={styles.buttonContainer}>
        <Button
          title="Confirm"
          onPress={handleConfirm}
          />
        </View>
      </View>
     </Modal>
    );
  } 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    input: {
      borderColor: "purple",
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      padding: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    characterCount: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    instruction: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      width: windowWidth * 0.3,
      marginVertical: 10,
    },
  });