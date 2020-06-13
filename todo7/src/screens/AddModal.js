import React, {Component} from 'react';
import { View} from 'react-native';
import { ListItem } from 'react-native-elements'

/*
list store the icons that are used
for futute can add more icons and display them when loading more items
*/
const list = [

  {
    title: 'Passwords',
    icon: 'lock-open'
  }

]

/*
This js page has the personal page that takes user to the passwords page
where there passwords are stores
*/
export default class AddModal extends Component {
 
  constructor(props) {
    super(props);
   this.navMe = this.navMe.bind(this);
    }
  state = {taskname: '', taskact: '', tasklist: [], tests: '', editable: false};




/*
Takes user to the passwords page
*/
navMe(){
  console.log("hello");
  this.props.navigation.navigate('Passwords')
  
}
 
/*
The main renderer to render the page and display it
*/
render() { console.log("ren");
return (
  <View>
  { 
    list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon }}
        
        onPress ={this.navMe}
        bottomDivider
        chevron
      />
    ))
  }

</View>)}


}