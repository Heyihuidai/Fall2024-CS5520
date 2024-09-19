import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet } from 'react-native';

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
        <TextInput
          ref={inputRef}
          placeholder="Type something"
          keyboardType="default"
          style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
          value={text}
          onChangeText={updateText}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {isFocused && text.length > 0 && (
          <Text>Character count: {text.length}</Text>
        )}
        {!isFocused && (
          <Text>
            {text.length >= 3
              ? "Thank you"
              : "Please type more than 3 characters"}
          </Text>
        )}
        <Button
          title="Confirm"
          onPress={handleConfirm}
        />
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
  },
});