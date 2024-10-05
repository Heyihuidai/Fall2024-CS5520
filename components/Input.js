import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, Image, Text } from 'react-native';

export default function Input({ visible, onInputSubmit, onCancel }) {
  const [text, setText] = useState("");

  const handleConfirm = () => {
    if (text.trim().length > 0) {
      onInputSubmit(text);
      setText("");
    }
  };
  
  const handleCancel = () => {
    setText("");
    onCancel();
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
          <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}}
          style={styles.image}
          lt="Network image of a goal icon"
          />
          <Image 
            source={require('../assets/image_lab2.png')}
            style={styles.image}
          />
          <TextInput
            placeholder="Enter your goal"
            style={styles.input}
            value={text}
            onChangeText={setText}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.button}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleConfirm} 
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
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
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});