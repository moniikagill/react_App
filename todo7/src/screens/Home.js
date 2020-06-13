
import * as firebase from 'firebase';
import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


/*
This js page is the home page for our main app
It shows the menu as a dropdown and uses Menu
*/
class Home extends React.PureComponent {
  _menu = null;
  constructor(props) {
    super(props);
    this.navigateTodo = this.navigateTodo.bind(this);
    this.navigateToSignout = this.navigateToSignout.bind(this);
    this.navigateToTimer = this.navigateToTimer.bind(this);
    this.navigateToCal = this.navigateToCal.bind(this);
    this.navigateToResetPassword = this.navigateToResetPassword.bind(this);
    this.navigateToPersonal = this.navigateToPersonal.bind(this);
  }
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

/*
This page navigates to the ToDo page
*/
 navigateTodo(){
   this.hideMenu();
   //Todohome.handleload();
  this.props.navigation.navigate('Todohome')
   //handleload();
 }

 /*
This page navigates to the Signout page
*/
 navigateToSignout(){
  this.hideMenu();
  firebase.auth().signOut().then(() => {
    console.log('signedout');
    this.props.navigation.navigate('signout')
    }).catch((err) => {
    console.log(err);
   });
  }

  /*
This page navigates to the Timer page
*/
  navigateToTimer(){
    this.hideMenu();
   this.props.navigation.navigate('clock')
    //handleload();
  }

  /*
This page navigates to the Calendar page
*/
   navigateToCal(){
    this.hideMenu();
  this.props.navigation.navigate('CalendarEv')
    }


    /*
This page navigates to the Reset Password page
*/
    navigateToResetPassword(){
      this.hideMenu();
      this.props.navigation.navigate('Resetpassword')
    }
    navigateToPersonal(){
      this.hideMenu();
      this.props.navigation.navigate('AddModal')
    }

    /*
     Renders the page and displays
   */
  render() {
    return (
      <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' , backgroundColor:'#FFFACD'}}>
      
        <Menu
          ref={this.setMenuRef} 
          button= {<Text onPress={this.showMenu} style={{color:'black', fontSize: 20}}>Menu</Text>}
          
        >
        <MenuItem onPress={this.navigateTodo} >ToDo Page</MenuItem>
          
          <MenuItem onPress={this.navigateToCal}>Calendar</MenuItem>
          <MenuItem onPress={this.navigateToTimer}>Timer</MenuItem>
          <MenuItem onPress={this.navigateToPersonal}>Personal</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Account Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.navigateToSignout}>Sign out</MenuItem>
          <MenuItem onPress={this.navigateToResetPassword}>Change Password</MenuItem>
        </Menu>
        
       
          <View style = {{ flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
       }}>
         <Image style = {{width:500, height:650}}
         source = {require('../image/fl.png')}></Image>
        <View style={{flex: 8, flexDirection: 'column', width: 500, height: 50, backgroundColor: '#FFFACD',alignItems: 'stretch'}} />
        <View style={{flex: 1,width: 500, height: 100, backgroundColor: '#FFFACD', alignItems: 'stretch'}} />
        <View style={{flex: 1,width: 500, height: 50, backgroundColor: 'powderblue', alignItems: 'stretch'}} />
      </View>
        
      </View>
    );
  }
}

 
export default Home;