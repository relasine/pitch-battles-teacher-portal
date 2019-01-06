import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default class Landing extends React.Component {
  constructor() {
    super();

    this.state = {
      loginActive: true,
      signupActive: false,
      forgotPassword: false,
      resetPassword: false
    };
  }

  navigateToLogin = () => {
    this.setState({
      loginActive: true,
      signupActive: false,
      forgotPassword: false,
      resetPassword: false
    });
  };

  navigateToSignup = () => {
    this.setState({
      loginActive: false,
      signupActive: true,
      forgotPassword: false,
      resetPassword: false
    });
  };

  navigateToForgotPassword = () => {
    this.setState({
      loginActive: false,
      signupActive: false,
      forgotPassword: true,
      resetPassword: false
    });
  };

  navigateToToken = () => {
    this.setState({
      loginActive: false,
      signupActive: false,
      forgotPassword: false,
      resetPassword: true
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loginActive && (
          <Login
            login={this.props.login}
            navigateToSignup={this.navigateToSignup}
            navigateToForgotPassword={this.navigateToForgotPassword}
          />
        )}
        {this.state.signupActive && (
          <Signup navigateToLogin={this.navigateToLogin} />
        )}
        {this.state.forgotPassword && (
          <ForgotPassword
            navigateToToken={this.navigateToToken}
            navigateToLogin={this.navigateToLogin}
          />
        )}
        {this.state.resetPassword && (
          <ResetPassword back={this.navigateToLogin} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});
