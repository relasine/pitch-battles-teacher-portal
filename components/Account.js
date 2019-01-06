import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { login, changePasswordFetch } from "../utilities/fetchCalls";

export default class Account extends React.Component {
  constructor() {
    super();

    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      incompleteError: false,
      incorrectPasswordError: false,
      passwordMatchError: false,
      error: false,
      success: false,
      response: undefined,
      badNewPassword: false
    };
  }

  handleChange = (text, string) => {
    this.setState({
      [string]: text,
      incompleteError: false,
      incorrectPasswordError: false,
      passwordMatchError: false,
      success: false,
      response: undefined,
      badNewPassword: false
    });
  };

  handleSubmit = async () => {
    if (
      !this.state.oldPassword ||
      !this.state.newPassword ||
      !this.state.confirmNewPassword
    ) {
      this.setState({
        incompleteError: true,
        incorrectPasswordError: false,
        passwordMatchError: false,
        success: false,
        badNewPassword: false
      });
      return;
    }

    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({
        passwordMatchError: true,
        incompleteError: false,
        error: false,
        incorrectPasswordError: false,
        success: false,
        badNewPassword: false
      });
      return;
    }
    const passwordConfirmed = await this.confirmOldPassword();
    if (!passwordConfirmed) {
      return;
    }

    this.changePassword();
  };

  changePassword = async () => {
    try {
      const response = await changePasswordFetch(
        this.state.oldPassword,
        this.state.newPassword,
        this.props.webToken
      );

      if (response.message === "Not enough or too many segments") {
        this.setState({
          success: false,
          incompleteError: false,
          incorrectPasswordError: false,
          passwordMatchError: false,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          response,
          badNewPassword: true
        });
      } else if (response) {
        this.setState({
          success: true,
          incompleteError: false,
          incorrectPasswordError: false,
          passwordMatchError: false,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          response,
          badNewPassword: false
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        success: false
      });
    }
  };

  confirmOldPassword = async () => {
    const body = {
      email: this.props.email,
      password: this.state.oldPassword
    };

    try {
      const response = await login(body);
      if (response.error) {
        throw Error(response);
      }
      if (response.access_token) {
        this.props.setWebToken(response.access_token);
        return true;
      }
    } catch (error) {
      console.log(error);
      this.setState({
        incompleteError: false,
        incorrectPasswordError: true,
        passwordMatchError: false,
        response: error
      });

      return false;
    }
  };

  render() {
    return (
      <View style={styles.account}>
        <Text style={styles.changeLabel}>Change password:</Text>
        <TextInput
          onChangeText={text => this.handleChange(text, "oldPassword")}
          value={this.state.oldPassword}
          placeholder="old password"
          style={styles.inputs}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={text => this.handleChange(text, "newPassword")}
          value={this.state.newPassword}
          placeholder="new password"
          style={styles.inputs}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={text => this.handleChange(text, "confirmNewPassword")}
          value={this.state.confirmNewPassword}
          placeholder="confirm password"
          style={styles.inputs}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button
          onPress={this.handleSubmit}
          title="submit passwords"
          accessibilityLabel="change password"
        />
        <Button onPress={this.props.logout} title="logout user" />
        {this.state.incompleteError && (
          <Text style={styles.message}>
            Missing information in some fields...
          </Text>
        )}
        {this.state.incorrectPasswordError && (
          <Text style={styles.message}>
            Password does not match this account.
          </Text>
        )}
        {this.state.passwordMatchError && (
          <Text style={styles.message}>New passwords do not match.</Text>
        )}
        {this.state.success && (
          <Text style={styles.message}>Success changed your password!</Text>
        )}
        {this.state.error && (
          <Text style={styles.message}>Server error...</Text>
        )}
        {this.state.badNewPassword && (
          <Text style={styles.message}>
            New password must contain at least 8 characters
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  account: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  inputs: {
    margin: 8,
    backgroundColor: "#d9d9d9",
    width: 200,
    padding: 4
  },
  changeLabel: {
    margin: 12,
    fontWeight: "bold"
  },
  message: {
    position: "absolute",
    top: 420
  }
});
