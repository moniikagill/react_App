import Firebase from 'firebase';
import React, { Component } from 'react';
import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Todohome from './src/screens/Todohome';
import Resetpassword from './src/screens/Resetpassword';
import AddModal from './src/screens/AddModal';
import CalendarEv from './src/screens/CalendarEv';
import clock from './src/screens/clock';
import signout from './src/screens/signout';
import Passwords from './src/screens/Passwords';

const AppNavigator = createStackNavigator(
  {
    Home,
    Login,
    Signup,
    Resetpassword,
    Todohome, 
    AddModal,
    CalendarEv,
    clock,
    signout,
    Passwords
    
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
