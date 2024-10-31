import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../Firebase/firebaseSetup";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = () => {
    navigation.navigate("Signup");
  };

  const loginHandler = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Error", "All fields should be provided");
      return;
    }
    try {
      setIsLoading(true);
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCred.user.email);
      navigation.replace("Home"); // Navigate to Home after successful login
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please try again.";
      if (err.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <Button title="Login" onPress={loginHandler} disabled={isLoading} />
      <Button 
        title="New User? Create An Account" 
        onPress={signupHandler} 
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});