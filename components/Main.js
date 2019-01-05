import React from "react";
import { StyleSheet, Text, ImageBackground, View } from "react-native";
import AllClasses from "./AllClasses";
import Nav from "./Nav";
import SingleClass from "./SingleClass";

import { teacherAllClassesFetch } from "../utilities/fetchCalls";

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: "all classes",
      classes: [],
      error: false,
      errorMessage: undefined,
      selectedClassId: undefined
    };
  }

  componentDidMount() {
    this.classFetch();
  }

  classFetch = async () => {
    try {
      const { data } = await teacherAllClassesFetch(this.props.webToken);
      this.setState({
        classes: data
      });
    } catch (error) {
      this.setState({ error: true, errorMessage: error });
    }
  };

  navigate = location => {
    this.setState({
      currentPage: location
    });
  };

  setClass = id => {
    this.setState({
      currentPage: "single class",
      selectedClassId: id
    });
  };

  render() {
    return (
      <View style={styles.main}>
        {this.state.currentPage === "all classes" && (
          <AllClasses
            classes={this.state.classes}
            webToken={this.props.webToken}
            updateClasses={this.classFetch}
            setClass={this.setClass}
          />
        )}
        {this.state.currentPage === "single class" && (
          <SingleClass
            webToken={this.props.webToken}
            id={this.state.selectedClassId}
          />
        )}
        <Nav navigate={this.navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-around",
    width: "100%"
  }
});