/*Screen to view all the Fiction*/
import React from 'react';
import { FlatList, Text, View ,Image} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'webtoun' }); 
export default class ViewAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM fiction', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.fiction_id} style={{ backgroundColor: 'white', padding: 20 }}>
              <Text>Id: {item.fiction_id}</Text>
              <Text>Name: {item.fiction_name}</Text>
              <Text>Type: {item.fiction_type}</Text>
              <Text>Author: {item.fiction_author}</Text>
              <Image source={{uri: 'item.fiction_photo'}}style={{width: 200, height: 200}}/>
              {/* <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}style={{width: 200, height: 200}} /> */}
            </View>
          )}
        />
      </View>
    );
  }
}