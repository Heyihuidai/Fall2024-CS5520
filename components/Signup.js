import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth, db } from "../Firebase/firebaseSetup";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const signupHandler = async () => {
    try {
      setIsLoading(true);
      if (
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0
      ) {
        Alert.alert("All fields should be provided");
        return;
      }
      if (!emailRegex.test(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address");
        return false;
      }
      if (password.length < 8) {
        Alert.alert("Password Too Short", "Password must be at least 8 characters long");
        return false;
      }
      if (password !== confirmPassword) {
        Alert.alert("password and confirm password don't match");
        return;
      }
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
        Alert.alert(
          "Weak Password",
          "Password must contain at least:\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character"
        );
        return false;
      }
      const commonPasswords = ["password123", "12345678", "qwerty123"];
      if (commonPasswords.includes(password.toLowerCase())) {
        Alert.alert("Insecure Password", "Please choose a less common password");
        return false;
      }
      const domain = email.split('@')[1];
      if (domain === "example.com") {
        Alert.alert("Invalid Email", "Please use a valid email domain");
        return false;
      }
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCred.user.uid), {
        email: userCred.user.email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });

      console.log("User created successfully:", userCred.user.uid);
      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Login");
    } catch (err) {
        console.error("Signup error:", err);
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert("Error", "This email is already registered");
        } else {
          Alert.alert("Error", err.message);
        }
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
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
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button 
        title="Register" 
        onPress={signupHandler} 
        disabled={isLoading}
      />
      <Button 
        title="Already Registered? Login" 
        onPress={loginHandler}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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