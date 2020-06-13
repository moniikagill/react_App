import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Constants,
  TouchableOpacity,
  ScrollView,
  ItemComponent,
  ListView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import * as firebase from 'firebase';
import {data} from './config';
import Modal from 'react-native-modalbox';

/*
This js page handles the passwords
user can save or delete the passwords
*/

export default class Passwords extends Component {
  tempName;
  tempTask;
  
   constructor(props) {
    super(props);
    this.handleload = this.handleload.bind(this);
    this.handleload();
    this.delete = this.delete.bind(this);
    this.onPressAdd = this.onPressAdd.bind(this);
    
    
   
  }
  state = {name: '', pass: '', tlist: [], tests: '', editable: false};


  /*
  this function handles the loading of the passwords
  the collection is under todo<password<user for each user
  */
  handleload = async () => {
    u = firebase.auth().currentUser.uid;
    console.log(u);
    let x = [];
    data
      .collection('todo')
      .doc('passwords')
      .collection(u)
      .get()
      .then(async querySnapshot => {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, ' => ', doc.data());
          x.push(doc.data());
          console.log(x, ' array test');
          //console.log(x.taskact);
        });

        console.log(x);
        await this.setState({tlist: x});
        console.log(this.state.tlist);
        console.log('testing todolist');
      })
      .catch(error => console.log(error));
  };

  /**
   * This function handles the insertion operation
   */
  handleput = () => {
    u = firebase.auth().currentUser.uid;
    data
      .collection('todo')
      .doc('passwords')
      .collection(u)
      .add({
        name: this.state.name,
        password: this.state.pass
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
    this.refs.myModal.close();
    this.handleload();
    console.log('reloading');
  };
  
      
 
  componentDidUpdate() {
    this.handleload();
  }

  /*
  This function handles the deletion
  it uses the item name to find the right one and remove the correct one accordingly
  */
  delete(item) {
    userId = firebase.auth().currentUser.uid;
    console.log(userId);

    data
      .collection('todo')
      .doc('passwords')
      .collection(userId)
      .where('name', '==', item)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, ' => ', doc.data());
          data
            .collection('todo')
            .doc('passwords')
            .collection(userId)
            .doc(doc.id)
            .delete();
        }).catch(error => console.log(error));
      });
    console.log('worked');
    alert("Your item has been removed!")
    this.handleload();

  }
 
  /*
  it calls the helper function to show the modal
  */
  onPressAdd() {
    this.showAddModal();
  }
  /*
  This function opens the modal
  */
  showAddModal = () => {
    this.refs.myModal.open();
  };


  
  render() {
    console.log('ren');

    return (
      
      <SafeAreaView style={styles.container}>
        
        {/* <Button title="Edit" color="#e93766" onPress={this.onRowPress} /> */}
        <Button title="Add New" color="#e93766" onPress={this.onPressAdd} />
        <FlatList
          data={this.state.tlist}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                {
                  this.delete(item.name);
                }
                alert('You tapped the button!' + item.name);

                console.log(name, 'testing');

                console.log('test successful');
              }}
              style={[styles.item]}>
              <Text style={styles.name}>Account: {item.name}</Text>
              <Text style={styles.password}> Password:{item.password} </Text>
             
              <Button
                title="delete"
                color="#e93766"
                onPress={() => {
                  {
                    this.delete(item.name);
                  }
                }}></Button>
            </TouchableOpacity>
          )}

        />

        <Modal
          ref={'myModal'}
          style={{
            justifyContent: 'center',
            shadowRadius: 10,
            height: 280,
          }}
          position="center"
          backdrop={true}
          onClosed={() => {
            alert('Closed!!');
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 40,
            }}>
            Add new Todo
          </Text>
          <TextInput
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 20,
              marginBottom: 10,
              borderBottomWidth: 1,
            }}
            placeholder="Enter account name"
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />
          <TextInput
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 20,
              marginBottom: 10,
              borderBottomWidth: 1,
            }}
            placeholder="Enter password "
            onChangeText={pass => this.setState({pass})}
            value={this.state.pass}
          />
          <Button
            title="Save"
            color="#e93766"
            onPress={this.handleput}></Button>
        </Modal>
       </SafeAreaView>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
