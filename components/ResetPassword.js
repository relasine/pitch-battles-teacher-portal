import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { resetPasswordFetch } from "../utilities/fetchCalls";

export default class ResetPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      password: "",
      confirm_password: "",
      passwordMatchError: false,
      webToken: "",
      success: false,
      missingFields: false,
      loading: false,
      webTokenError: false
    };
  }

  handleChange = (text, string) => {
    this.setState({
      [string]: text,
      passwordMatchError: false,
      success: false,
      missingFields: false
    });
  };

  handleSubmit = () => {
    if (
      !this.state.password ||
      !this.state.confirm_password ||
      !this.state.webToken
    ) {
      this.setState({
        missingFields: true
      });
    } else if (this.state.password === this.state.confirm_password) {
      this.callReset();
    } else {
      this.setState({
        passwordMatchError: true,
        emailInUse: false,
        success: false,
        missingFields: false
      });
    }
  };

  callReset = async () => {
    this.setState({
      fetching: true
    });

    try {
      await resetPasswordFetch(this.state.password, this.state.webToken);
      this.setState({
        success: true,
        passwordMatchError: false,
        emailInUse: false,
        missingFields: false,
        fetching: false
      });
    } catch (error) {
      this.setState({
        webTokenError: true,
        success: false,
        missingFields: false,
        fetching: false
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[{ marginBottom: 20 }, { fontWeight: "bold" }]}>
          Reset your password:
        </Text>
        <TextInput
          onChangeText={text => this.handleChange(text, "password")}
          value={this.state.password}
          placeholder="password"
          style={styles.inputs}
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={text => this.handleChange(text, "confirm_password")}
          value={this.state.confirm_password}
          placeholder="confirm password"
          style={styles.inputs}
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={text => this.handleChange(text, "webToken")}
          value={this.state.webToken}
          placeholder="webtoken"
          style={styles.inputs}
        />
        <Button
          onPress={this.handleSubmit}
          title="submit"
          accessibilityLabel="reset your password"
        />
        <View style={{ marginTop: 48 }}>
          <Button
            onPress={this.props.back}
            title="back"
            accessibilityLabel="go back"
          />
        </View>
        {this.state.success && (
          <Text style={styles.messages}>Successfully reset your password!</Text>
        )}
        {this.state.passwordMatchError && (
          <Text style={styles.messages}>Passwords do not match.</Text>
        )}
        {this.state.missingFields && (
          <Text style={styles.messages}>
            Missing information in some fields...
          </Text>
        )}
        {this.state.fetching && (
          <Text style={styles.message}>Signing you up...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  inputs: {
    margin: 8,
    backgroundColor: "#d9d9d9",
    width: 200,
    padding: 4
  },
  messages: {
    position: "absolute",
    top: 20
  }
});
