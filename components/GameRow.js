import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  ScrollView
} from "react-native";

export default class GameRow extends React.Component {
  render() {
    const { game } = this.props;
    return (
      <View style={styles.gameRow}>
        <View style={styles.timesRow}>
          <Text style={styles.time}>{game.id}</Text>
          <Text style={styles.time}>
            {Math.max(
              Math.ceil((game.attributes.level_one_duration / 1000) * 10) / 10,
              2.8
            ) || "none"}
          </Text>
          <Text style={styles.time}>
            {Math.max(
              Math.ceil((game.attributes.level_two_duration / 1000) * 10) / 10,
              2.8
            ) || "none"}
          </Text>
          <Text style={styles.time}>
            {Math.max(
              Math.ceil((game.attributes.level_three_duration / 1000) * 10) /
                10,
              2.8
            ) || "none"}
          </Text>
          <Text style={styles.time}>
            {Math.max(
              Math.ceil((game.attributes.level_four_duration / 1000) * 10) / 10,
              2.8
            ) || "none"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameRow: {
    flex: 1,
    justifyContent: "center"
  },
  timesRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 8
  },
  time: {
    width: 75,
    textAlign: "center"
  }
});
