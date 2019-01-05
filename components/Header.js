import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";

export default class Header extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../images/dd-bg-long.png")}
        style={styles.imageBg}
        resizeMethod={"scale"}
      >
        <Text style={styles.headerText}>Pitch Battles Teacher Portal</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBg: {
    width: "100%",
    height: 125
  },
  headerText: {
    marginTop: 50,
    textAlign: "center",
    color: "#f2f2f2",
    fontSize: 23,
    fontWeight: "bold"
  }
});
