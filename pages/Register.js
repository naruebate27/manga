/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'db_fiction.db' });
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fiction_id: '',
      fiction_name: '',
      fiction_type: '',
      fiction_author: '',
    };
  }
  register_fiction = () => {
    var that = this;
    const { fiction_name } = this.state;
    const { fiction_type } = this.state;
    const { fiction_author } = this.state;
    alert(fiction_name, fiction_type, fiction_author);
    if (fiction_name) {
      if (fiction_type) {
        if (fiction_author) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO fiction (fiction_name, fiction_type, fiction_author) VALUES (?,?,?)',
              [fiction_name, fiction_type, fiction_author],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
        } else {
          alert('Please fill Author');
        }
      } else {
        alert('Please fill Type');
      }
    } else {
      alert('Please fill Name');
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={fiction_name => this.setState({ fiction_name })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Type"
              onChangeText={fiction_type => this.setState({ fiction_type })}
              maxLength={225}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Author"
              onChangeText={fiction_author => this.setState({ fiction_author })}
              maxLength={225}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Photo"
              onChangeText={fiction_photo => this.setState({ fiction_photo })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top',padding:10 }}
            />

            <Mybutton
              title="Submit"
              customClick={this.register_fiction.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}