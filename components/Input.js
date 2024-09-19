import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function Input({ autoFocus = false, visible, onInputSubmit }) {
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
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            color="#007AFF"
          />
        </View>
      </View>
     </Modal>
    );
  } 

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center', 
    },
    input: {
      borderColor: "purple",
      borderWidth: 2,
      padding: 5,
      color:"blue",
    },
    buttonContainer: {
      width: windowWidth * 0.6,
      marginVertical: 15,
      backgroundColor: 'red',
    },
  });
  