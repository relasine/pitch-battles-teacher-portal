import React from "react";
import { login, userFetch } from "../utilities/fetchCalls";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      incomplete: false,
      badLogin: false,
      data: undefined,
      notATeacher: false,
      fetching: false,
      error: false,
      errorMessage: undefined,
      response: undefined
    };
  }

  handleChange = (text, string) => {
    this.setState({
      [string]: text,
      incomplete: false,
      notATeacher: false,
      error: false
    });
  };

  handleSubmit = () => {
    if (!this.state.email && !this.state.password) {
      this.setState({
        incomplete: true,
        notATeacher: false,
        error: false
      });
    } else {
      this.callLogin();
    }
  };

  callLogin = async () => {
    this.setState({
      incomplete: false,
      badLogin: false,
      notATeacher: false,
      fetching: true,
      error: false,
      errorMessage: undefined
    });
    try {
      const response = await login({
        email: this.state.email,
        password: this.state.password
      });
      if (response.error) {
        throw Error;
      } else {
        this.getUser(response);
      }
    } catch (error) {
      this.setState({
        errorMessage: error,
        incomplete: false,
        badLogin: true,
        notATeacher: false,
        fetching: false,
        error: false
      });
    }
  };

  getUser = async response => {
    try {
      const { data } = await userFetch(response.access_token);
      if (data.attributes.role === "student") {
        this.setState({
          incomplete: false,
          badLogin: false,
          data: undefined,
          notATeacher: true,
          fetching: false
        });
      } else if (data.attributes.role === "teacher") {
        this.setState({
          incomplete: false,
          badLogin: false,
          notATeacher: false,
          fetching: false,
          error: false
        });
        this.props.login(response.access_token, data);
      }
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginLabel}>Login with your email:</Text>
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
          style={[styles.inputs, styles.bottomInput]}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button
          onPress={this.handleSubmit}
          title="login"
          accessibilityLabel="login to pitch battles teacher portal"
        />
        <Button
          onPress={this.props.navigateToSignup}
          title="signup"
          accessibilityLabel="sign up for a pitch battles account"
          style={styles.btn}
        />
        {this.state.fetching && (
          <Text style={styles.message}>Logging you in...</Text>
        )}
        {this.state.badLogin && (
          <Text style={styles.message}>Email/Password do not match.</Text>
        )}
        {this.state.notATeacher && (
          <Text style={styles.message}>
            Please login with a teacher account.
          </Text>
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
  loginLabel: {
    margin: 12
  },
  inputs: {
    margin: 8,
    backgroundColor: "#d9d9d9",
    width: 200,
    padding: 4
  },
  bottomInput: {
    marginBottom: 12
  },
  message: {
    position: "absolute",
    top: 20
  }
});
