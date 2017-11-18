import React from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

import Home from './src/components/Home.js';
import EnterMobile from './src/components/auth/enterMobile.js';
import Otp from './src/components/auth/otp.js';
import Playnow from './src/components/playLoading.js';
import Play from './src/components/play.js';
import Result from './src/components/result.js';

const AppNavigator = StackNavigator({
  EnterMobile: { screen: EnterMobile},
  Home: { screen: Home},
  Otp: { screen: Otp },
  PlayLoading: { screen: Playnow },
  Play: { screen: Play},
  Result: { screen: Result }
},{
  initialRouteName: "EnterMobile",
  headerMode: "none",
  navigationOptions: {
     gesturesEnabled: false,
   },
   transitionConfig: () => ({
     transitionSpec: {
       duration: 1,
       timing: Animated.timing,
     }
   })
});

export default class App extends React.Component {
  render() {
    return  (
      <Provider store={createStore(reducers)}>
        <AppNavigator />
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
