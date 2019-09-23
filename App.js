import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './pages/HomeScreen';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Search from './pages/Search';
// import Update from './pages/Update';
import Delete from './pages/Delete';
 
const App = createStackNavigator({
  
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'My Project',
      headerStyle: { backgroundColor: '#1e90ff' },
      headerTintColor: '#ffffff',
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Welcome to Web Toun',
      headerStyle: { backgroundColor: '#1e90ff' },
      headerTintColor: '#ffffff',
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'My Profile',
      headerStyle: { backgroundColor: '#1e90ff' },
      headerTintColor: '#ffffff',
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search Manga',
      headerStyle: { backgroundColor: '#1e90ff' },
      headerTintColor: '#ffffff',
    },
  },
  // Update: {
  //   screen: Update,
  //   navigationOptions: {
  //     title: 'Update Manga',
  //     headerStyle: { backgroundColor: '#1e90ff' },
  //     headerTintColor: '#ffffff',
  //   },
  // },
  Delete: {
    screen: Delete,
    navigationOptions: {
      title: 'Delete Manga',
      headerStyle: { backgroundColor: '#1e90ff' },
      headerTintColor: '#ffffff',
    },
  },
});

export default createAppContainer(App);