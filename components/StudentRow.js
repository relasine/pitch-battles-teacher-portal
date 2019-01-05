import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity
} from "react-native";

export default class StudentRow extends React.Component {
  render() {
    const { student, selectStudent } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectStudent(student);
        }}
        style={styles.studentRow}
      >
        <Text style={styles.studentName}>
          {student.attributes.first_name[0]}. {student.attributes.last_name}
        </Text>
        <Text style={styles.studentRowText}>
          {student.attributes.total_games_played}
        </Text>
        <Text style={styles.studentRowText}>
          {Math.max(
            Math.ceil((student.attributes.level_one_fastest_time / 1000) * 10) /
              10,
            2.8
          )}
        </Text>
        <Text style={styles.studentRowText}>
          {Math.max(
            Math.ceil((student.attributes.level_two_fastest_time / 1000) * 10) /
              10,
            2.8
          )}
        </Text>
        <Text style={styles.studentRowText}>
          {Math.max(
            Math.ceil(
              (student.attributes.level_three_fastest_time / 1000) * 10
            ) / 10,
            2.8
          )}
        </Text>
        <Text style={styles.studentRowText}>
          {Math.max(
            Math.ceil(
              (student.attributes.level_four_fastest_time / 1000) * 10
            ) / 10,
            2.8
          )}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  studentRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16
  },
  studentRowText: {
    width: 50,
    marginLeft: 2
  },
  studentName: {
    width: 100,
    marginLeft: 8
  }
});
