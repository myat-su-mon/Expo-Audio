import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import AnimatedLottieView from "lottie-react-native";
import { RecordContext } from "../context/ContextProvider";
import { Ionicons } from "@expo/vector-icons";

const Record = ({ navigation }) => {
  const { recording,  startRecording, stopRecording } =
    useContext(RecordContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Voice Recorder</Text>
      <TouchableOpacity
        style={styles.listBtn}
        onPress={() => navigation.navigate("Replay")}
      >
        <Ionicons name="ios-list" size={24} color="black" />
      </TouchableOpacity>
      <AnimatedLottieView
        source={require("../assets/record.json")}
        autoPlay
        loop
        style={styles.record}
      />
      <TouchableOpacity
        style={styles.recordBtn}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text>{recording ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Record;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  record: {
    width: "90%",
  },
  text: {
    position: "absolute",
    top: 30,
    color: "#222",
    fontSize: 20,
    fontWeight: 600,
  },
  listBtn: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  recordBtn: {
    position: "absolute",
    bottom: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#cccccc",
    backgroundColor: "#fafafa",
  },
});
