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

import StudentHeader from "./StudentHeader";
import FastestTimes from "./FastestTimes";

export default class Student extends React.Component {
  render() {
    const { student } = this.props;
    return (
      <ScrollView>
        <View>
          <StudentHeader student={student} />
        </View>
        <FastestTimes student={student} />
        <View>
          {/* <Text>Perfect Scores</Text> */}
          {/* <View>{perfectScoreRow}</View> */}
        </View>
        <View>
          <Text>id</Text>
          <Text>L1 Time</Text>
          <Text>L1 Perfect</Text>
          <Text>L2 Time</Text>
          <Text>L2 Perfect</Text>
          <Text>L3 Time</Text>
          <Text>L3 Perfect</Text>
          <Text>L4 Time</Text>
          <Text>L4 Perfect</Text>
        </View>
        {/* <View>{gameRows}</View> */}
        <Button
          onPress={() => this.props.navigate("all classes")}
          title="back"
        />
      </ScrollView>
    );
  }
}
