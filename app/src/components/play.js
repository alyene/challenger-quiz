import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Header, Button, Spinner } from './common';
import { Otp } from './otp.js';
import axios from 'axios';

import SocketIOClient from 'socket.io-client';

export default class Play extends React.Component {

    socket;

    constructor(props) {
      super(props);
      this.state = {
        currentQuestionIndex: 0,
        questions: []
      };
      this.socket = SocketIOClient('http://192.168.225.37:8000');

    }

    componentWillMount(){
      axios.get('https://reqres.in/api/users/2')
      .then( res => {
        // console.log(res.data);
        this.setState ({questions: res.data});
        // console.log('State of this app: ', this.state);
      });
    }

    clickedOption() {
      const { navigate } = this.props.navigation;

      console.log('question index: ', this.state.currentQuestionIndex)
      const newIndex =  this.state.currentQuestionIndex + 1;
      if( newIndex > 3) {
        console.log('Game Finished, time to navigate.');
        navigate('Result');
      }
      this.setState({
        currentQuestionIndex: newIndex
      });

      this.socket.emit('answered', {
        message: this.state.currentQuestionIndex
      });

    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
    			    <Text style={styles.text}>
    			       Hello
    			    </Text>
              <Button onPress={this.clickedOption.bind(this)}>JC Daniel</Button>
              <Button onPress={this.clickedOption.bind(this)}>Hisham</Button>
              <Button onPress={this.clickedOption.bind(this)}>Mubarak</Button>
              <Button onPress={this.clickedOption.bind(this)}>Parengal</Button>
			 </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42464c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
  	color: '#fff',
    fontSize: 25
  }
});
