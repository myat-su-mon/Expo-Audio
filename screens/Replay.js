import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedLottieView from "lottie-react-native";
import { RecordContext } from "../context/ContextProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const Replay = ({ navigation }) => {
  const { getRecordingLines, current } = useContext(RecordContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>PlayList</Text>
      <View style={styles.replayContainer}>
        <AnimatedLottieView
          source={require("../assets/replay.json")}
          autoPlay
          loop
          style={styles.replay}
        />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Recording {current.title}</Text>
        <Text style={styles.title}>{current.duration}</Text>
      </View>
      <ScrollView style={styles.playlistContainer}>
        {getRecordingLines()}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack("Home")}
      >
        <FontAwesome5 name="microphone-alt" size={36} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Replay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  replayContainer: {
    flex: 0.6,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    color: "#777",
    fontSize: 16,
    fontWeight: 700,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
    alignSelf: 'center'
  },
  button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderColor: "#f0f0f0",
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  playlistContainer: {
    flex: 1,
  },
});
