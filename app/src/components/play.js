import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { Header, Button, Spinner } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import SocketIOClient from 'socket.io-client';
import { environment } from '../config/environment';

class Play extends React.Component {

    socket;

    constructor(props) {
      super(props);
      this.socket = SocketIOClient(environment.backendUrl);
      this.socket.on('opponentanswered', (data) => {
        // this.setState({gameinitiated: true, questions: Questiondata});
        console.log('opponent answer data', data);
      });
    }


    clickedOption(index) {
      clearInterval(this.timer);
      const roomName = this.props.question.quizData.roomname;
      console.log('state: ',this.state);
      const { navigate } = this.props.navigation;
      if(this.props.questionIndex > 1) {
        console.log('Game Finished, time to navigate.');
        navigate('Result');
      } else {
          this.socket.emit('submitanswer', { questionNumber: this.props.questionIndex, score: 0, status: false, roomname: roomName });
          this.props.question_index(this.props.questionIndex + 1);
      }
    }

    render() {
        const { navigate } = this.props.navigation;
        const data = this.props.question.data;
        return(
            <View style={styles.container}>

    			    <Text style={styles.text}>
    			        {this.props.questionIndex} : {this.props.question.data[this.props.questionIndex].question}
    			    </Text>
              <Button onPress={() => this.clickedOption(2)}>{data[this.props.questionIndex].option1}</Button>
              <Button onPress={() => this.clickedOption(2)}>{data[this.props.questionIndex].option2}</Button>
              <Button onPress={() => this.clickedOption(3)}>{data[this.props.questionIndex].option3}</Button>
              <Button onPress={() => this.clickedOption(4)}>{data[this.props.questionIndex].option4}</Button>
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
  },
  timer: {
    color: '#fff',
    fontSize: 50
  }
});


const mapStateToProps = state => {
  return {
    question: state.questions.question,
    questionIndex: state.questions.questionIndex,
    roomname: state.questions.quizData,
    submitScore: state.answer.score
  };
};

export default connect(mapStateToProps, actions)(Play);
