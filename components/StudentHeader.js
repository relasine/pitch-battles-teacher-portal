import React from "react";
import { StyleSheet, Text, ImageBackground, View } from "react-native";

export default class StudentHeader extends React.Component {
  render() {
    const { student } = this.props;
    return (
      <View style={styles.studentHeader}>
        <View style={styles.studentHeaderLeft}>
          <Text style={styles.studentName}>
            {student.attributes.first_name} {student.attributes.last_name}
          </Text>
          <Text style={styles.className}>
            {student.attributes.class.data.attributes.name}
          </Text>
        </View>
        <View style={styles.totalGamesContainer}>
          <Text style={styles.totalGamesLabel}>Total Games</Text>
          <Text style={styles.totalGamesPlayed}>
            {student.attributes.total_games_played}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  studentHeader: {
    flex: 1,
    flexDirection: "row"
  },
  studentHeaderLeft: {
    width: 250
  },
  studentName: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 8
  },
  className: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 8
  },
  totalGamesLabel: {
    fontWeight: "bold",
    textAlign: "center"
  },
  totalGamesPlayed: {
    textAlign: "center"
  },
  totalGamesContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8
  }
});
