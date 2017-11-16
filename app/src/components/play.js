import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Header, Button, Spinner } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions/';

import { Otp } from './otp.js';
import axios from 'axios';

import SocketIOClient from 'socket.io-client';

class Play extends React.Component {

    socket;

    constructor(props) {
      super(props);
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
      console.log('current index: ',this.props.questionIndex );
      if( this.props.questionIndex  > 0) {
        console.log('Game Finished, time to navigate.');
        navigate('Result');
      }else {
          this.props.question_index(this.props.questionIndex + 1);
      }
      // this.socket.emit('answered', {
      //   message: this.state.currentQuestionIndex
      // });


    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
    			    <Text style={styles.text}>
    			        {this.props.questionIndex} : {this.props.question.data[this.props.questionIndex].question}
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


const mapStateToProps = state => {
  return {
    question: state.questions.question,
    questionIndex: state.questions.questionIndex
  };
};

export default connect(mapStateToProps, actions)(Play);
