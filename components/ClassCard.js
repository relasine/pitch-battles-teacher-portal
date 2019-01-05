import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  Button
} from "react-native";

import DeleteClassWarning from "./DeleteClassWarning";
import { deleteClassFetch } from "../utilities/fetchCalls";

export default class ClassCard extends React.Component {
  constructor() {
    super();

    this.state = {
      deleteWarning: false,
      deleteError: false
    };
  }

  toggleWarning = () => {
    this.setState({
      deleteWarning: !this.state.deleteWarning
    });
  };

  confirmDelete = async () => {
    try {
      await deleteClassFetch(this.props.klass.id, this.props.webToken);

      this.setState(
        {
          deleteError: false,
          deleteWarning: false
        },
        this.props.updateClasses
      );
    } catch (error) {
      this.setState({
        deleteError: true
      });
    }
  };

  selectClass = () => {
    this.props.setClass(this.props.klass.id);
  };

  render() {
    const { klass } = this.props;
    return (
      <View style={styles.shadowBox}>
        <View style={styles.classCard}>
          <ImageBackground
            style={styles.cardBg}
            source={require("../images/class-card-bg.png")}
          >
            <Text style={[styles.classCardText, styles.classCardTitle]}>
              {klass.attributes.name}
            </Text>
          </ImageBackground>

          <Text style={styles.classCardText}>
            key: {klass.attributes.class_key}
          </Text>
          <Button
            onPress={this.selectClass}
            title="select class"
            accessibilityLabel="select class to view details"
          />
          <TouchableOpacity onPress={this.toggleWarning}>
            <Image
              style={styles.trash}
              source={require("../images/trash.png")}
            />
          </TouchableOpacity>
          {this.state.deleteWarning && (
            <DeleteClassWarning
              cancel={this.toggleWarning}
              confirm={this.confirmDelete}
            />
          )}
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
  trash: {
    height: 30,
    width: 30,
    margin: 16,
    marginLeft: "auto",
    marginRight: "auto"
  }
});
