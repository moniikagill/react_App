import React, { Component } from 'react';
import { View, Text ,TextInput, Button} from 'react-native';
import {aut} from './config';
import styles from './style'

/*
The main login page where the app starts from
it uses firebase to authenticate the user
*/
export default class Login extends Component {

    state = { email: '', password: '', errorMessage: null}
    handleLogin = () => {
        
          console.log(this.state.email);
          console.log(this.state.password);
          aut.signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => this.props.navigation.navigate('Home'))
          .catch(error => {this.setState({ errorMessage: error.message });
            console.warn(error);
            })
      }

  /*
  This renders the the login page
  It also uses styles.js file for styling
  */
  render() {
    return (
   
      <View style={styles.container}>
         <Text style={{color:'#e93766', fontSize: 40}}>Todo App</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Text style={{color:'#e93766', fontSize: 30}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('Signup')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
        <View>
        <Text> Forgot Password? <Text onPress={() => this.props.navigation.navigate('Resetpassword')} style={{color:'#e93766', fontSize: 18}}> Reset Password </Text></Text>
        </View>
      </View>
    );
  }
}