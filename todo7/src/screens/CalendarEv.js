import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TextInput } from 'react-native';
import * as firebase from 'firebase';
import {data} from './config';
import Modal from 'react-native-modalbox';
import {Calendar} from 'react-native-calendars';

/*
This class displays the calendar
It uses the react native calendars to display the calendars
*/

export default class CalendarEv extends Component {
  clickedDate;
  clickedMonth;
  clickedYear;
  globalName;
  constructor(props) {
    super(props);
    this.handleload = this.handleload.bind(this);
    this.handleput = this.handleput.bind(this);
    this.handleload();
  }

  state = {
    taskname: '',
    date: '',
    nameX:'',
    tasklist: [],
    dates: {},
  };

  /*
  This function adds the new event to the database
  the collection is todo>cal>userid
  */
  handleput = () => {
    u = firebase.auth().currentUser.uid;
    data
      .collection('todo')
      .doc('cal')
      .collection(u)
      .add({
        name: this.state.taskname,
        //task: this.state.taskact,
        date: this.clickedDay,
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
    // this.refs.myModal.close();
    this.refs.myModal1.close();
     this.handleload();
    console.log('reloading');
  };

  /*
  This function converts my arraylist into object date
  which is getting uused to mark so when the calendar loads again it shows the event marked
  */
  converter(dates) {
    objectDate = {};

    for (date of dates) {
      objectDate[date] = {selected: true, marked: true, selectedColor: 'powderblue'};
    }
    this.setState({dates: objectDate});
  }

  /*
  This function loads the calendar
  */
  handleload = async () => {
    u = firebase.auth().currentUser.uid;
    console.log(u);
    let x = [];
    let dates = [];
    data
      .collection('todo')
      .doc('cal')
      .collection(u)
      .get()
      .then(async querySnapshot => {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, ' => ', doc.data());
          x.push(doc.data());
          var y = doc.data().date;
          dates.push(y);
          console.log(x, ' array test');
          //console.log(x.taskact);
        });

        console.log(x);
        await this.setState({tasklist: x});
        this.converter(dates);
        //await this.setState({dates: dates});
        console.log(this.state.tasklist);
        console.log('testing todolist');
      })
      .catch(error => console.log(error));
  };

  // this function opens up the modal
  showAddModal2 = () => {
    this.refs.myModal2.open();
  };

  // this function opens up the modal
  showAddModal1 = () => {
    this.refs.myModal1.open();
  };

  // this function closes the modal if task is cancelled
  cancelTask = () => {
    this.refs.myModal1.close();
  };
  showTask(dateString){
    console.log("testing",dateString);
   let n =""
   
   this.state.tasklist.forEach(function(item){
   if(item.date == dateString){
   console.log(item.name,"it exists");
   console.log(item.date,"it exists");
    n= item.name;}
   
      });
    
      this.setState({nameX: n})
      if(n==''){return}else{
      console.log(this.state.nameX);
     this.showAddModal2();}
}

  //resets my nameX field
  resetnameX(){
    console.log(this.state.nameX);
     this.setState({nameX:''})
    console.log(this.state.nameX, "after resetting");
    this.refs.myModal2.close();
  }
  render() {
    return (
      <View>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 350,
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: '#FFFACD',
            calendarBackground: '#ffd2e8',
            textSectionTitleColor: '#000000',
            selectedDayBackgroundColor: '#000000',
            selectedDayTextColor: '#000000',
            todayTextColor: '#000000',
            dayTextColor: '#000000',
            textDisabledColor: '#000000',
            dotColor: '#00adf5',
            selectedDotColor: '#000000',
            arrowColor: 'black',
            monthTextColor: 'black',
            indicatorColor: 'black',

            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          markedDates={this.state.dates}
          
          current={new Date()}
          
          minDate={'2012-05-10'}
         
          maxDate={'2025-05-30'}
          
          onDayPress={day => {
            console.log('selected day', day.dateString);
            this.clickedDay = day.dateString;
           
            console.log('click', this.clickedDay);
            
            this.showTask(this.clickedDay);
            //this.showAddModal2();

          }}
          // Handler which gets executed on day long press. 
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. 
          monthFormat={'dd MMM yyyy'}
          // Handler which gets executed when visible month changes in calendar.
          onMonthChange={month => {
            console.log('month changed', month);
          }}
         
          hideExtraDays={true}
         
          disableMonthChange={true}
          
          firstDay={1}
          
          hideDayNames={true}
          
          onPressArrowLeft={substractMonth => substractMonth()}
          
          onPressArrowRight={addMonth => addMonth()}
        />
        <Button title="Add new task" color="#e93766" onPress={this.showAddModal1}></Button>
          <Modal 
          ref={'myModal1'}
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

        <Button title="Save" color="#e93766" onPress={this.handleput}></Button>
        <Button title="Cancel" color="#e93766" onPress={this.cancelTask}></Button>
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
            Your Saved Event
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
            placeholder="Task name"
            onChangeText={nameX => this.setState({nameX})}
            value={this.state.nameX}
            
          />
           <Button
            title="Close"
            color="#e93766"
            onPress={() => {
              {
                this.resetnameX();
              }}}
          />
      
        </Modal>
      </View>
    );
  }
}
