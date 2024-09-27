import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Alert} from 'react-native';
import Input from './components/Input';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleAddGoal(data) {
    console.log("App.js ", data);
    let newGoal = { text: data, id: Math.random().toString() };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setIsModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id != deletedId;
      });
    });
  }

  function handleDeleteAll() {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => setGoals([])
        }
      ]
    );
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderGoalItem = ({ item }) => (
    <View style={styles.textContainer}>
      <Text style={styles.goalText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleGoalDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyList = () => (
    <Text style={styles.emptyListText}>No goals to show</Text>
  );

  const renderHeader = () => (
    <Text style={styles.listHeaderText}>My Goals</Text>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Button
        title="Delete All"
        onPress={handleDeleteAll}
        color="#FF3B30"
      />
    </View>
  );

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to My awesome app</Text>
        </View>
        <Button
          title="Add a goal"
          onPress={() => setIsModalVisible(true)}
          color="#007AFF"
        />
      </View>
      <FlatList
        style={styles.bottomView}
        contentContainerStyle={styles.listContent}
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyList}
        ListHeaderComponent={goals.length > 0 ? renderHeader : null}
        ListFooterComponent={goals.length > 0 ? renderFooter : null}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <Input
        visible={isModalVisible}
        onInputSubmit={handleAddGoal}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    borderColor: 'purple',
    borderWidth: 1,
    padding: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: 'purple',
  },
  bottomView: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    padding: 20,
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  goalText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  listHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    width: '100%',
  },
  separator: {
    height: 3,
    backgroundColor: '#CCCCCC',
    marginVertical: 5,
  },
});