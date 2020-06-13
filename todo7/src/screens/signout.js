import React, { Component } from 'react';
import { View, Text ,TextInput, Button} from 'react-native';

/*
This js page handles the signout functionality
*/

export default class signout extends Component {

    state = { email: 'tets@test.com', password: 'testtest', errorMessage: null}
   
  render() {
    return (
      
      <View>
        <Text style={{color:'#e93766', fontSize: 20}}>You have successfully Signed out!</Text>
        <Text style={{color:'#e93766', fontSize: 20}}>Log back in again?</Text>
       <Button title="Login" color="#e93766" onPress={()=>{this.props.navigation.navigate('Login')}} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('Signup')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    );
  }
}