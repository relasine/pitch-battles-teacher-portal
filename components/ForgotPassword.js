import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { forgotMyPasswordCall } from "../utilities/fetchCalls";

export default class ForgotPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      success: false,
      error: false,
      fetch: false,
      response: undefined
    };
  }

  handleChange = email => {
    this.setState({
      email
    });
  };

  submit = async () => {
    this.setState({
      fetching: true,
      email: "",
      success: false,
      error: false,
      fetch: false,
      response: undefined
    });

    try {
      const response = await forgotMyPasswordCall(this.state.email);
      if (response.error) {
        throw Error;
      } else {
        this.setState({
          success: true,
          fetching: false,
          error: false,
          response: response
        });
      }
    } catch (error) {
      this.setState({ error: true, fetching: false, success: false });
    }
  };

  render() {
    return (
      <View style={styles.forgotPassword}>
        {this.state.fetching && (
          <Text style={styles.message}>Sending for token...</Text>
        )}
        {this.state.success && (
          <Text style={styles.message}>
            Success! Check your email for your token.
          </Text>
        )}
        {this.state.error && (
          <Text style={styles.message}>
            Email address does not match our records
          </Text>
        )}
        <Text
          style={[
            { textAlign: "center" },
            { fontWeight: "bold" },
            { width: 300 },
            { margin: 16 }
          ]}
        >
          Enter your email address to receive a new password token
        </Text>
        <TextInput
          onChangeText={text => this.handleChange(text)}
          value={this.state.email}
          placeholder="email"
          style={styles.inputs}
          textContentType="emailAddress"
          autoCapitalize="none"
        />

        <Button onPress={this.submit} title="submit email" style={styles.btn} />
        <View style={{ marginTop: 48 }}>
          <Button
            onPress={this.props.navigateToToken}
            title="I have a token"
            style={styles.btn}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  inputs: {
    margin: "auto",
    marginBottom: 16,
    backgroundColor: "#d9d9d9",
    width: 200,
    padding: 4
  },
  btn: {},
  message: {
    textAlign: "center",
    position: "absolute",
    top: 20
  }
});
