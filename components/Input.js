import React, { useState } from "react";
import { View, TextInput } from 'react-native';

export default function Input() {
  const [text, setText] = useState("");

  function updateText(changedText) {
    setText(changedText);
  }

  return (
    <View>
      <TextInput
        placeholder="Type something"
        keyboardType="default"
        style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
        value={text}
        onChangeText={updateText}
      />
    </View>
  );
}