import React from "react";
import { StyleSheet, Text, ImageBackground, View } from "react-native";

export default class StudentHeader extends React.Component {
  render() {
    const { student } = this.props;
    return (
      <View>
        <View>
          <Text>
            {student.attributes.first_name} {student.attributes.last_name}
          </Text>
          <Text>{student.attributes.class.data.attributes.name}</Text>
        </View>
        <View>
          <Text>Total Games</Text>
          <Text>{student.attributes.total_games_played}</Text>
        </View>
      </View>
    );
  }
}
