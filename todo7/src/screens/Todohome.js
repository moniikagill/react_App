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

/**
 * This js file handles the todo list page
 * it displays the todo list using the flatlist
 */
export default class Todohome extends Component {
  tempName;
  tempTask;
  
   constructor(props) {
    super(props);
    this.handleload = this.handleload.bind(this);
    this.handleload();
    this.delete = this.delete.bind(this);
    this.onPressAdd = this.onPressAdd.bind(this);
    this.onPressAdd2 = this.onPressAdd2.bind(this);
    
   }
  state = {taskname: '', taskact: '', tasklist: [], tests: '', editable: false};

 /*
 This function handles the loading of the data
 tthis is called inside the renderer ad in the constructor
 */

 handleload = async () => {
    u = firebase.auth().currentUser.uid;
    console.log(u);
    let x = [];
    data
      .collection('todo')
      .doc('sub')
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
        await this.setState({tasklist: x});
        console.log(this.state.tasklist);
        console.log('testing todolist');
      })
      .catch(error => console.log(error));
  };


  /*
  This function handles the addition of tasks to the data base
  this function is called everytime we click the save button when we add the task using modal view
  */
  handleput = () => {
    u = firebase.auth().currentUser.uid;
    data
      .collection('todo')
      .doc('sub')
      .collection(u)
      .add({
        name: this.state.taskname,
        task: this.state.taskact,
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


  /*
  This function edits the existing item and is called when clicked on save changes
  */
  handleedit(item, tempname, temptask) {
   if(!this.tempName){
  this.tempName =this.state.taskname;
}
if(!this.tempTask){
  this.tempTask =this.state.taskact;
}
    console.log('test edit function',tempname,temptask,this.tempName,this.tempTask,this.nameId);
    userId = firebase.auth().currentUser.uid;
    const name = this.tempName;
    const task = this.tempTask;
    console.log("=========",userId,this.nameId)
      data.collection('todo')
      .doc('sub')
      .collection(userId)
      .where('name', '==', this.nameId)
      .get()
      .then(querySnapshot => {
        console.log("length of re---------------s",)

        querySnapshot.forEach(function(doc) {
          console.log(doc.id, ' => ', doc.data(), name, task,userId);
            data
            .collection('todo')
            .doc('sub')
            .collection(userId)
            .doc(doc.id)
            .update({
              name: name,
              task: task,
            })
            .then(function(res) {
              console.log('Document successfully updated!', res);
              
            }).catch(err=>console.log(err));
          
        });
      });
     
    this.handleload();
    this.refs.myModal2.close();
    this.handleload();
    console.log('reloading');
  }

  
  componentDidUpdate() {
    this.render();
  }

  /*
  This function deletes the task from the list
  it gets the item we need to delete when clicked on the delete button
  it then checks if the item in the database matches and then deletes it from the database
  */
  delete(item) {
    userId = firebase.auth().currentUser.uid;
    console.log(userId);

    data
      .collection('todo')
      .doc('sub')
      .collection(userId)
      .where('name', '==', item)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, ' => ', doc.data());
          data
            .collection('todo')
            .doc('sub')
            .collection(userId)
            .doc(doc.id)
            .delete();
        }).catch(error => console.log(error));
      });
    console.log('worked');
    this.handleload();
  }
  editing(item) {
    console.log('edit ' + item);
    edit.editme(item);
    s;
  }

  /*
  This function is called in the render and calls its helper method showAddModal
  */
  onPressAdd() {
    this.showAddModal();
  }

  /*
  this method opens up the modal to add the items
  */
  showAddModal = () => {
    this.refs.myModal.open();
  };


  /*
  This function is called in the render and calls its helper method showAddModal2
  we also have a nameId variable just above it that I am using to store current item name
  
  */
  nameId
  onPressAdd2(name, task) {
    this.nameId = name;
    console.log(name, task);
    this.setState({taskname: name, taskact: task}, this.refs.myModal2.open());

    
  }

  /*
  this method opens up the modal to save the edited items
  */
  showAddModal2 = () => {
    this.refs.myModal2.open();
  };
  
  render() {
    console.log('ren');

    return (
      
      <SafeAreaView style={styles.container}>
        
        {/* <Button title="Edit" color="#e93766" onPress={this.onRowPress} /> */}
        <Button title="Add" color="#e93766" onPress={this.onPressAdd} />
        <FlatList
          data={this.state.tasklist}
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
              <Text style={styles.name}>Task: {item.name}</Text>
              <Text style={styles.task}> Task Description:{item.task} </Text>
              <Button
                title="edit"
                color="#e93766"
                onPress={() => {
                  {
                    this.onPressAdd2(item.name, item.task);
                  }
                }}></Button>
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
            placeholder="Enter task name"
            onChangeText={taskname => this.setState({taskname})}
            value={this.state.taskname}
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
            placeholder="Enter task "
            onChangeText={taskact => this.setState({taskact})}
            value={this.state.taskact}
          />
          <Button
            title="Save"
            color="#e93766"
            onPress={this.handleput}></Button>
        </Modal>
        <Modal
          ref={'myModal2'}
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
            placeholder="Enter task name"
            onChangeText={text => {
              console.log('text is', text);
              this.tempName = text;
              this.setState({taskname: text});
            }}
            value={this.state.taskname}
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
            placeholder="Enter task "
            onChangeText={text => {
              
              this.tempTask =  text;
              console.log('text is', text);

              return this.setState({taskact: text});
            }}
            value={this.state.taskact}
          />
          <Button
            title="Save Changes"
            color="#e93766"
            onPress={() => {
              {
                this.handleedit(
                  this.state.taskname,
                  this.tempName,
                  this.tempTask,
                );
              }
            }}
          />
        </Modal>
        {/* <AddModal ref={'addModal'} parentFlatlist={this}>

        </AddModal> */}
      </SafeAreaView>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
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
