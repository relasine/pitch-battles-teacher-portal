import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Main from "./components/Main";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: undefined,
      webToken: "",
      response: undefined
    };
  }

  logout = () => {
    this.setState({
      user: undefined,
      webToken: "",
      response: undefined
    });
  };

  setWebToken = webToken => {
    this.setState({ webToken });
  };

  setUser = user => {
    this.setState({ user });
  };

  login = (webToken, user) => {
    this.setState({
      webToken,
      user
    });
  };

  navigate = location => {};

  render() {
    return (
      <View style={styles.container}>
        <Header />
        {!this.state.user && <Landing login={this.login} />}
        {this.state.user && (
          <Main
            setWebToken={this.setWebToken}
            webToken={this.state.webToken}
            user={this.state.user}
            logout={this.logout}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  imageBg: {
    width: "100%",
    height: 125
  },
  headerText: {
    marginTop: 50,
    textAlign: "center",
    color: "#f2f2f2",
    fontSize: 23,
    fontWeight: "bold"
  }
});
