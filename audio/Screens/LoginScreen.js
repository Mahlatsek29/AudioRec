import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firebase } from '../config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in:", userCredential.user);
      navigation.navigate("Audio");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        autoCapitalize="none" // Ensure email is not auto-capitalized
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Text style={styles.signUpText}>
        Don't have an account?{""}
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.signUpLink}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#3498db",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  signUpText: {
    marginTop: 16,
    textAlign: "center",
  },
  signUpLink: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default LoginScreen;
