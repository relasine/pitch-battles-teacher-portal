import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default class Nav extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigate("all classes")}
          style={[styles.navBtns, styles.homeBtn]}
        >
          <ImageBackground
            source={require("../images/home.png")}
            style={styles.homeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtns, styles.accountBtn]}>
          <ImageBackground
            source={require("../images/account.png")}
            style={styles.accountIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#d9d9d9",
    width: "100%",
    paddingBottom: 20,
    paddingTop: 20,
    height: 70
  },

  homeBtn: {},
  accountBtn: {},
  homeIcon: {
    width: 30,
    height: 30
  },
  accountIcon: {
    width: 30,
    height: 30
  }
});
