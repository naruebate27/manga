/*Screen to view single manga*/
import React from 'react';
import { Text, View, Button ,Image } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'db_fiction.db' }); 
export default class ViewFiction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_fiction_id: '',
      fictionData: '',
    };
  }
  searchFiction = () => {
    const { input_fiction_id } = this.state;
    console.log(this.state.input_fiction_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM fiction where fiction_id = ?',
        [input_fiction_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState({
              fictionData: results.rows.item(0),
            });
          } else {
            alert('No fiction found');
            this.setState({
              fictionData: '',
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Enter Fiction Id"
          onChangeText={input_fiction_id => this.setState({ input_fiction_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Search Fiction"
          customClick={this.searchFiction.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>Fiction Id: {this.state.fictionData.fiction_id}</Text>
          <Text>Fiction Name: {this.state.fictionData.fiction_name}</Text>
          <Text>Fiction Type: {this.state.fictionData.fiction_type}</Text>
          <Text>Fiction Author: {this.state.fictionData.fiction_author}</Text>
          <Image source={{uri: this.state.fictionData.fiction_photo}}style={{width: 400, height: 400}} />
        </View>
      </View>
    );
  }
}