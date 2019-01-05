import React from "react";
import { StyleSheet, Text, ImageBackground, View } from "react-native";

export default class FastestTimes extends React.Component {
  render() {
    const { student } = this.props;
    return (
      <View>
        <Text style={styles.levelLabel}>Fastest Times</Text>
        <View style={styles.timesRow}>
          <View>
            <Text style={styles.levelLabel}>L1</Text>
            <Text style={styles.levelTime}>
              {Math.max(
                Math.ceil(
                  (student.attributes.level_one_fastest_time / 1000) * 10
                ) / 10,
                2.8
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.levelLabel}>L2</Text>
            <Text style={styles.levelTime}>
              {Math.max(
                Math.ceil(
                  (student.attributes.level_two_fastest_time / 1000) * 10
                ) / 10,
                2.8
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.levelLabel}>L3</Text>
            <Text style={styles.levelTime}>
              {Math.max(
                Math.ceil(
                  (student.attributes.level_three_fastest_time / 1000) * 10
                ) / 10,
                2.8
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.levelLabel}>L4</Text>
            <Text style={styles.levelTime}>
              {Math.max(
                Math.ceil(
                  (student.attributes.level_four_fastest_time / 1000) * 10
                ) / 10,
                2.8
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timesRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 8
  },
  levelLabel: {
    textAlign: "center",
    fontWeight: "bold"
  },
  levelTime: {
    textAlign: "center"
  }
});
