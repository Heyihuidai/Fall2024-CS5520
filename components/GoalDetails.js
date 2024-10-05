import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={warningHandler} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Warning</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {route.params ? (
          <Text style={[styles.detailText, warning && styles.warningStyle]}>
            Details of "{route.params.goalObj.text}" goal with ID: {route.params.goalObj.id}
          </Text>
        ) : (
          <Text style={styles.detailText}>No goal details available</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("Details")}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
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
  detailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  warningStyle: {
    color: 'red',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});