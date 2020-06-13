import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import * as firebase from 'firebase';
import styles from './style'

/*
This js page handles the resetting password functionality
*/
export default class Resetpassword extends Component {
  constructor(props) {
    super(props);
    this.resetPassword = this.resetPassword.bind(this);
    this.signBackIn = this.signBackIn.bind(this);
  }
  state = { email: ''}
 
  /*
  function that sends the reset email to user's email address
  */
  resetPassword(){
    let x = this.state.email;
    console.log(x);
   firebase.auth().sendPasswordResetEmail(this.state.email);
    alert("a reset email has been sent");
    this.setState({email:''})
  }

  /*
   This function takes the user back to the sign in page
  */
  signBackIn(){
  this.props.navigation.navigate('Login')
  }

  /*
  This renders the resetpassword page
  */
    render() {
        return (
          <View style={styles.container}>
         
        <Text style={{color:'#e93766', fontSize: 30}}>Reset Password</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Enter email to reset password"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
           <Button title="Reset Password" color="#e93766" onPress={this.resetPassword} /> 
           <Button title="Log In" color="#e93766" onPress={this.signBackIn} /> 
          </View>
          
        );
      }
    
}