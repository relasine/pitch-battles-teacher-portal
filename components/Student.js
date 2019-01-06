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
import GameRow from "./GameRow";
import DeleteStudentWarning from "./DeleteStudentWarning";

import { leaveClassFetch } from "../utilities/fetchCalls";

export default class Student extends React.Component {
  constructor() {
    super();

    this.state = {
      deletePrompt: false,
      error: false,
      response: undefined
    };
  }

  promptDeleteStudent = () => {
    this.setState({
      deletePrompt: !this.state.deletePrompt
    });
  };

  confirmDelete = async () => {
    try {
      const response = await leaveClassFetch(
        this.props.student.id,
        this.props.student.attributes.class.data.id,
        this.props.webToken
      );
      this.setState({ response });
      this.props.navigate("single class");
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    const { student } = this.props;

    const gameRows = student.attributes.games.data.map(game => {
      return <GameRow key={game.id} game={game} />;
    });

    return (
      <ScrollView style={styles.scrolly}>
        <View style={styles.student}>
          <View>
            <StudentHeader student={student} />
          </View>
          <FastestTimes student={student} />
          <View>
            {/* <Text>Perfect Scores</Text> */}
            {/* <View>{perfectScoreRow}</View> */}
          </View>
          <Text style={styles.gamesSection}>Games Played</Text>
          <View style={styles.gameHeader}>
            <Text style={styles.gameText}>id</Text>
            <Text style={styles.gameText}>L1</Text>
            <Text style={styles.gameText}>L2</Text>
            <Text style={styles.gameText}>L3</Text>
            <Text style={styles.gameText}>L4</Text>
          </View>
          <View>{gameRows}</View>
          <Button
            onPress={() => this.props.navigate("single class")}
            title="back"
          />
          <Button
            onPress={this.promptDeleteStudent}
            title="remove student from class"
          />
          {this.state.deletePrompt && (
            <DeleteStudentWarning
              confirm={this.confirmDelete}
              cancel={this.promptDeleteStudent}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  student: {
    margin: "auto"
  },
  gameHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 8,
    margin: "auto"
  },
  gamesSection: {
    marginTop: 16,
    textAlign: "center",
    fontWeight: "bold"
  },
  gameText: {
    width: 50,
    fontWeight: "bold",
    textAlign: "center"
  }
});
