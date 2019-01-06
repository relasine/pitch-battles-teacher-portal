import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class DeleteStudentWarning extends React.Component {
  render() {
    return (
      <View style={styles.DeleteStudentWarning}>
        <Text style={styles.warningText}>
          Are you sure you want to remove this student from the class?
        </Text>
        <View styles={styles.deleteButtonWrapper}>
          <Button
            onPress={this.props.cancel}
            title="cancel"
            accessibilityLabel="do not remove this student"
          />
          <Button
            onPress={this.props.confirm}
            title="remove"
            accessibilityLabel="remove this student"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  DeleteStudentWarning: {
    position: "absolute",
    height: 220,
    width: "100%",
    bottom: 100,
    backgroundColor: "#d9d9d9",
    padding: 16,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginLeft: "auto",
    marginRight: "auto"
  },
  deleteButtonWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  warningText: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 32
  }
});
