import { Audio } from "expo-av";
import React, { createContext, useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const RecordContext = createContext();

export const ContextProvider = ({ children }) => {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [loop, setLoop] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [current, setCurrent] = useState({});

  const images = [
    require("../assets/img1.jpg"),
    require("../assets/img2.jpg"),
    require("../assets/img3.jpg"),
    require("../assets/img4.jpg"),
    require("../assets/img5.jpg"),
    require("../assets/img6.jpg"),
    require("../assets/img7.jpg"),
  ];

  const handlePlay = (index, recordingLine) => {
    recordingLine.sound.replayAsync();
    setCurrent({title: index+1 , duration: recordingLine.duration});
  };

  async function startRecording() {
    try {
      // access to microphone
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        // record high qty sound
        const {recording} = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        setLoop(true);
        setAutoPlay(true);
      } else {
        setMessage("Please grant permissions to app to access microphone");
      }
    } catch (error) {
      console.log("Failed to start recording", error);
    }
  }
  async function stopRecording() {
    // stop recording
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updateRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    updateRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(updateRecordings);
    setLoop(false);
    setAutoPlay(false);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View style={styles.playlist} key={index}>
          <Image source={images[index]} style={styles.image} />
          <View>
            <Text>Recording {index + 1}</Text>
            <Text>{recordingLine.duration}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <TouchableOpacity onPress={() => handlePlay(index, recordingLine)}>
              <Ionicons name="play-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="favorite-border" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  return (
    <RecordContext.Provider
      value={{
        recording, 
        recordings,
        getDurationFormatted,
        getRecordingLines,
        startRecording,
        stopRecording,
        loop,
        autoPlay,
        images,
        current
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};

const styles = StyleSheet.create({
  playlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
