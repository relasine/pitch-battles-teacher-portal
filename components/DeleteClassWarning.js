import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class DeleteClassWarning extends React.Component {
  render() {
    return (
      <View style={styles.deleteClassWarning}>
        <Text>Are you sure you want to delete this class?</Text>
        <View styles={styles.deleteButtonWrapper}>
          <Button
            onPress={this.props.cancel}
            title="cancel"
            accessibilityLabel="do not delete this class"
          />
          <Button
            onPress={this.props.confirm}
            title="delete"
            accessibilityLabel="delete this class"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deleteClassWarning: {
    position: "absolute",
    height: 160,
    width: 275,
    top: 60,
    backgroundColor: "#f2f2f2",
    padding: 16,
    textAlign: "center"
  },
  deleteButtonWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
