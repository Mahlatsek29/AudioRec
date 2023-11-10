import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import {Audio} from 'expo-av';
import * as Sharing from 'expo-sharing';
import { FontAwesome5 } from 'react-native-vector-icons';

export default function AudioScreen() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [currentSound, setCurrentSound] = useState();
  const [message, setMessage] = useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
        await recording.startAsync();
      } else {
        setMessage("Please grant permission to the app to access the microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (recording) {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();

      let updatedRecordings = [...recordings];
      try {
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI(),
        });

        setRecordings(updatedRecordings);
      } catch (error) {
        console.error('Failed to create a loaded sound from the recording', error);
      }
    }
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  async function handlePlayback(sound) {
    if (currentSound && currentSound.isPlaying) {
      try {
        await currentSound.stopAsync();
      } catch (error) {
        console.error('Error stopping the current sound:', error);
      }
    }

    if (sound !== currentSound) {
      try {
        await sound.playAsync();
        setCurrentSound(sound);
      } catch (error) {
        console.error('Error playing the sound:', error);
      }
    } else {
      try {
        await currentSound.stopAsync();
        setCurrentSound(null);
      } catch (error) {
        console.error('Error stopping the current sound:', error);
      }
    }
  }

  function handleStop(sound) {
    try {
      sound.stopAsync();
      setCurrentSound(null);
    } catch (error) {
      console.error('Error stopping the sound:', error);
    }
  }

  function handleDelete(index) {
    const updatedRecordings = [...recordings];
    updatedRecordings.splice(index, 1);
    setRecordings(updatedRecordings);
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      const isPlaying = currentSound === recordingLine.sound;

      return (
        <View key={index} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Recording {index + 1}</Text>
            <Text style={styles.duration}>{recordingLine.duration}</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handlePlayback(recordingLine.sound)}
            >
              <Text style={styles.icon}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleStop(recordingLine.sound)}
            >
              <Text style={styles.icon}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => Sharing.shareAsync(recordingLine.file)}
            >
              <Text style={styles.icon}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDelete(index)}
            >
              <Text style={styles.icon}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>{message}</Text>
        <FontAwesome5.Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
          name="microphone"
          size={35}
          color="black"
        />
        {getRecordingLines()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    margin: 16,
  },
  card: {
    backgroundColor: 'blue',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  duration: {
    color: 'white',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 20,
  },
  icon: {
    color: 'black',
  },
});