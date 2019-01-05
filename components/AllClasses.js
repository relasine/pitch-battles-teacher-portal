import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  View
} from "react-native";
import ClassCard from "./ClassCard";
import CreateClass from "./CreateClass";

export default class AllClasses extends React.Component {
  render() {
    const classes = this.props.classes.map(klass => {
      return (
        <ClassCard
          key={klass.id}
          webToken={this.props.webToken}
          klass={klass}
          updateClasses={this.props.updateClasses}
          setClass={this.props.setClass}
        />
      );
    });
    return (
      <ScrollView>
        <View style={styles.allClasses}>
          {classes}
          <CreateClass
            webToken={this.props.webToken}
            updateClasses={this.props.updateClasses}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  allClasses: {
    justifyContent: "space-around",
    width: "100%",
    flex: 1
  }
});
