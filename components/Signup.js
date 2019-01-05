import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { signUp } from "../utilities/fetchCalls";

export default class Singup extends React.Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      passwordMatchError: false,
      emailInUse: false,
      success: false,
      missingFields: false,
      loading: false
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
      !this.state.first_name ||
      !this.state.last_name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.confirm_password
    ) {
      this.setState({
        missingFields: true
      });
    } else if (this.state.password === this.state.confirm_password) {
      this.callSignup();
    } else {
      this.setState({
        passwordMatchError: true,
        emailInUse: false,
        success: false,
        missingFields: false
      });
    }
  };

  callSignup = async () => {
    const body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      role: 1
    };

    this.setState({
      fetching: true
    });

    try {
      await signUp(body);
      this.setState({
        success: true,
        passwordMatchError: false,
        emailInUse: false,
        missingFields: false,
        fetching: false
      });
    } catch (error) {
      this.setState({
        emailInUse: true,
        success: false,
        missingFields: false,
        fetching: false
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 20 }}>Create an account:</Text>
        <TextInput
          onChangeText={text => this.handleChange(text, "first_name")}
          value={this.state.first_name}
          placeholder="first name"
          style={styles.inputs}
        />
        <TextInput
          onChangeText={text => this.handleChange(text, "last_name")}
          value={this.state.last_name}
          placeholder="last name"
          style={styles.inputs}
        />
        <TextInput
          onChangeText={text => this.handleChange(text, "email")}
          value={this.state.email}
          placeholder="email"
          style={styles.inputs}
          textContentType="emailAddress"
          autoCapitalize="none"
        />
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
        <Button
          onPress={this.handleSubmit}
          title="signup"
          accessibilityLabel="sign up for a pitch battles account"
        />
        <Button
          onPress={this.props.navigateToLogin}
          title="login"
          accessibilityLabel="login to pitch battles teacher portal"
        />
        {this.state.success && (
          <Text style={styles.messages}>Successfully created account!</Text>
        )}
        {this.state.passwordMatchError && (
          <Text style={styles.messages}>Passwords do not match</Text>
        )}
        {this.state.emailInUse && (
          <Text style={styles.messages}>
            Email address already linked to an account
          </Text>
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
    backgroundColor: "#f2f2f2",
    width: 200,
    padding: 4
  },
  messages: {
    position: "absolute",
    top: 20
  }
});
