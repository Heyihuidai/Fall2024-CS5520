import { Button, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUser";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(route.params.goalData.id, { warning: true }, "goals");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressedHandler={warningHandler}
            componentStyle={styles.warningButton}
            pressedStyle={styles.warningButtonPressed}
          >
            <AntDesign name="warning" size={24} color="white" />
          </PressableButton>
        );
      },
    });
  }, []);

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  const contentPadding = height < 415 ? 10 : 20;
  const dynamicFontSize = width < 600 ? 14 : 16;

  return (
    <View style={[
      styles.container,
      { padding: contentPadding },
      isLandscape && styles.landscapeContainer
    ]}>
      <View style={[
        styles.contentWrapper,
        isLandscape && styles.landscapeWrapper
      ]}>
        {route.params ? (
          <Text style={[
            styles.text,
            warning && styles.warningStyle,
            isLandscape && {
              ...styles.landscapeText,
              fontSize: dynamicFontSize
            }
          ]}>
            This is details of a goal with text{' '}
            <Text style={styles.highlight}>
              {route.params.goalData.text}
            </Text>
            {' '}and id{' '}
            <Text style={styles.highlight}>
              {route.params.goalData.id}
            </Text>
          </Text>
        ) : (
          <Text style={[
            styles.text,
            warning && styles.warningStyle,
            isLandscape && {
              ...styles.landscapeText,
              fontSize: dynamicFontSize
            }
          ]}>
            More details
          </Text>
        )}

        <View style={[
          styles.buttonContainer,
          isLandscape && styles.landscapeButtons
        ]}>
          <Button 
            title="More Details" 
            onPress={moreDetailsHandler} 
          />
        </View>

        <View style={[
          styles.usersContainer,
          isLandscape && styles.landscapeUsers
        ]}>
          {route.params && <GoalUsers id={route.params.goalData.id} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  landscapeContainer: {
    flexDirection: 'row',
  },
  contentWrapper: {
    width: 350,
    maxWidth: '90%',
    marginHorizontal: 'auto',
    padding: 16,
  },
  landscapeWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  landscapeText: {
    textAlign: 'left',
    flex: 1,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  warningStyle: {
    color: "red",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  landscapeButtons: {
    marginLeft: 16,
    flexShrink: 0,
  },
  usersContainer: {
    marginTop: 16,
  },
  landscapeUsers: {
    flex: 1,
    marginLeft: 16,
  },
  warningButton: {
    backgroundColor: "purple",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  warningButtonPressed: {
    opacity: 0.5,
    backgroundColor: "purple",
  },
});