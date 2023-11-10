import React from 'react';
import { View, Text, Button, ImageBackground, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/voice.gif')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>AudioMemo Magic</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {},
  text: {
    color: 'white', 
    fontWeight: 'bold', 
  },
});