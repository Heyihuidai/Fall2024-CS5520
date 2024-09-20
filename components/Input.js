import React, { useState } from "react";
import { View, TextInput, Button, Modal, StyleSheet, Alert, Image } from 'react-native';

export default function Input({ visible, onInputSubmit, onCancel }) {
  const [text, setText] = useState("");

  const handleConfirm = () => {
    if (text.trim().length > 0) {
      onInputSubmit(text);
      setText("");
    }
  };
  
  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => {
          setText("");
          onCancel();
        }}
      ]
    );
  }; 

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your goal"
            style={styles.input}
            value={text}
            onChangeText={setText}
          />
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            color="#007AFF"
          />
        </View>
      </View>
    </View>
   </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});