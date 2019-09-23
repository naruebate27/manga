import React, { Component } from 'react';
import { Text, style, View, StyleSheet, ScrollView ,Switch ,Image } from 'react-native';

class AllChapter extends Component {
   state = {
      names: [
         {'name': 'Chapter 1', 'id': 1},
         {'name': 'Chapter 2', 'id': 2},
         {'name': 'Chapter 3', 'id': 3},
         {'name': 'Chapter 4', 'id': 4},
         {'name': 'Chapter 5', 'id': 5},
         {'name': 'Chapter 6', 'id': 6},
      ]
   }
   
   render() {
      return (
         <View>
               <ScrollView>
               <Image source={require('../image/virtual.jpg')}style={{width: 420, height: 200}}/>
               <Text style={{fontSize:25}}>Virtual Reality</Text>
               {
                  this.state.names.map((item, index) => (
                        <Text key = {item.id} style = {styles.item}>{item.name}</Text>                     
                  ))
               }
               </ScrollView>
         </View>
         
   );
   }
}

export default AllChapter
const styles = StyleSheet.create ({
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   }
})