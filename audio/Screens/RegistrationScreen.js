// RegistrationScreen.js

import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const RegistrationScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const trimmedEmail = email.trim();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!isEmailValid) {
      console.error("Invalid email format");
      return;
    }

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(trimmedEmail, password);
      console.log("User registered:", userCredential.user);

      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});

export default RegistrationScreen;
