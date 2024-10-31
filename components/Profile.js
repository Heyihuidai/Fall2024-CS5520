import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../Firebase/firebaseSetup";

export default function Profile() {
  if (!auth.currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Not logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{auth.currentUser.email}</Text>
        
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.info}>{auth.currentUser.uid}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  }
});