import React from "react";
import { StyleSheet, Text, ImageBackground, View } from "react-native";
import AllClasses from "./AllClasses";
import Nav from "./Nav";
import SingleClass from "./SingleClass";
import Student from "./Student";
import Account from "./Account";

import { teacherAllClassesFetch, userFetch } from "../utilities/fetchCalls";

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: "all classes",
      classes: [],
      error: false,
      errorMessage: undefined,
      selectedClassId: undefined,
      selectedStudent: undefined
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

  selectStudent = student => {
    this.setState({
      currentPage: "single student",
      selectedStudent: student
    });
  };

  prelogout = () => {
    this.setState(
      {
        currentPage: "all classes",
        classes: [],
        error: false,
        errorMessage: undefined,
        selectedClassId: undefined,
        selectedStudent: undefined
      },
      this.props.logout
    );
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
            selectStudent={this.selectStudent}
          />
        )}
        {this.state.currentPage === "single student" && (
          <Student
            student={this.state.selectedStudent}
            webToken={this.props.webToken}
            navigate={this.navigate}
          />
        )}
        {this.state.currentPage === "account" && (
          <Account
            email={this.props.user.attributes.email}
            setWebToken={this.props.setWebToken}
            id={this.props.user.id}
            webToken={this.props.webToken}
            logout={this.prelogout}
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
    width: "100%",
    backgroundColor: "#f2f2f2"
  }
});
