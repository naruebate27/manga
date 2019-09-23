/*Screen to delete the user*/
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'db_fiction.db' });
export default class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_fiction_id: '',
    };
  }
  deleteFiction = () => {
    var that = this;
    const { input_fiction_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  fiction where fiction_id=?',
        [input_fiction_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Fiction Id');
          }
        }
      );
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Enter Fiction Id"
          onChangeText={input_fiction_id => this.setState({ input_fiction_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Delete Fiction"
          customClick={this.deleteFiction.bind(this)}
        />
      </View>
    );
  }
}