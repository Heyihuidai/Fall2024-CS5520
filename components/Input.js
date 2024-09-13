import React, { useState, useRef } from "react";
import { View, Text, TextInput } from 'react-native';

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

  return (
    <View>
      <TextInput
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

    </View>
  );
}