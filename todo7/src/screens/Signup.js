import React, { Component } from 'react';
import { View, Text ,TextInput, Button} from 'react-native';
import Firebase from 'firebase';
import styles from './style'
export default class Signup extends Component {
    state = { email: '', password: ''}
    createSignUp = () => {
        Firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => this.props.navigation.navigate('Home'))
          .catch(error => this.setState({ errorMessage: error.message }))
      }
  render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text>
      {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.state.errorMessage}
        </Text>}
        <TextInput
        style={styles.textInput}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText = {email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
        style={styles.textInput}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText= {password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" color="#e93766" onPress ={this.createSignUp}/>
        <View>
        <Text> Already have an account? <Text onPress ={() => this.props.navigation.navigate('Login')} style={{color:'#e93766', fontSize: 18}}> Login </Text></Text>
        </View>
      </View>
    );
  }
}