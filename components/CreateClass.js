import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground
} from "react-native";

import { createClassFetch } from "../utilities/fetchCalls";

export default class CreateClass extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      error: false
    };
  }

  handleChange = name => {
    this.setState({
      name,
      error: false
    });
  };

  handleSubmit = async () => {
    try {
      const data = await createClassFetch(this.state.name, this.props.webToken);
      this.setState(
        {
          error: false,
          name: ""
        },
        this.props.updateClasses
      );
    } catch (error) {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <View style={styles.shadowBox}>
        <View style={styles.classCard}>
          <ImageBackground
            style={styles.cardBg}
            source={require("../images/class-card-bg.png")}
          >
            <Text style={[styles.classCardText, styles.classCardTitle]}>
              Create a new class
            </Text>
          </ImageBackground>

          <TextInput
            onChangeText={text => this.handleChange(text)}
            value={this.state.name}
            placeholder="class name"
            style={[styles.inputs]}
          />

          <Button
            onPress={this.handleSubmit}
            title="create class"
            accessibilityLabel="select class to view details"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  classCard: {
    borderRadius: 20,
    flex: 1,
    backgroundColor: "#ededed",
    height: 220,
    width: 275,
    margin: 16,
    overflow: "hidden",
    position: "relative"
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginLeft: "auto",
    marginRight: "auto"
  },
  classCardText: {
    textAlign: "center",
    margin: 16,
    fontWeight: "bold"
  },
  classCardTitle: {
    fontWeight: "bold",
    color: "#f2f2f2",
    marginTop: 18,
    fontSize: 18
  },
  cardBg: {
    height: 60,
    width: 275
  },
  inputs: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: "#d9d9d9",
    width: 200,
    padding: 4
  }
});
