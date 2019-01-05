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

import { teacherSpecificClassFetch } from "../utilities/fetchCalls";

import StudentRow from "./StudentRow";

export default class SingleClass extends React.Component {
  constructor() {
    super();
    this.state = {
      klass: undefined,
      students: [],
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.classFetch();
  }

  classFetch = async () => {
    try {
      const klass = await teacherSpecificClassFetch(
        this.props.id,
        this.props.webToken
      );
      this.setState({
        klass: klass.data.attributes,
        students: klass.data.attributes.students.data,
        loading: false,
        error: false
      });
    } catch (error) {
      this.setState({
        error: true,
        loading: false
      });
    }
  };

  render() {
    const students = this.state.students.map(student => {
      return (
        <StudentRow
          student={student}
          key={student.id}
          selectStudent={this.props.selectStudent}
          refresh={this.classFetch}
          webToken={this.props.webToken}
        />
      );
    });

    return (
      <ScrollView style={styles.singleClass}>
        {this.state.loading && <Text>Loading...</Text>}
        {this.state.klass && (
          <View>
            <Text style={styles.className}>{this.state.klass.name}</Text>
            <View style={styles.classTable}>
              <View style={styles.classRow}>
                <Text style={styles.classRowTextName}>Name</Text>
                <Text style={styles.classRowText}>Total</Text>
                <Text style={styles.classRowText}>L1</Text>
                <Text style={styles.classRowText}>L2</Text>
                <Text style={styles.classRowText}>L3</Text>
                <Text style={styles.classRowText}>L4</Text>
              </View>
              {students}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  className: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    margin: 12,
    marginBottom: 24,
    justifyContent: "space-between"
  },
  classRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16
  },
  classRowText: {
    width: 50,
    marginLeft: 2,
    fontWeight: "bold"
  },
  classRowTextName: {
    width: 100,
    marginLeft: 8,
    fontWeight: "bold"
  }
});
