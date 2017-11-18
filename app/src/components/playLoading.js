import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Header, Button, Spinner } from './common';

import { connect } from 'react-redux';
import * as actions from '../actions/';
import SocketIOClient from 'socket.io-client';
import { environment } from '../config/environment';

class Playnow extends React.Component {

    socket;

    constructor(props) {
        super(props);
        this.state = {
          timer: 10,
          iAnswer: false
        }
        this.CountDownTimer();
        const { navigate } = this.props.navigation;
        this.socket = SocketIOClient(environment.backendUrl);
        this.socket.emit('hereisthedata', { userid:1, subjectid:2, userName: 'haseeb'});
        this.socket.on('questions', (Questiondata) => {
          this.props.store_questions(Questiondata);
          console.log(this.props);
        });
        this.socket.on('opponentanswered', (data) => {
          console.log('opponent answer data', data);
          if (this.state.iAnswer) {
            this.props.question_index(this.props.questionIndex + 1);
          }
        });
    }

    CountDownTimer() {
      let counter = this.state.timer;
      this.timer = setInterval( ()=> {
          if (counter === 0){
            clearInterval(this.timer);
            this.setState({iAnswer: true});
            this.socket.emit('submitanswer', { questionNumber: this.props.questionIndex, score: 0, status: false, roomname: this.props.question.quizData.roomname });
            this.props.question_index(this.props.questionIndex + 1);
          }else {
            counter = counter - 1;
            console.log('time counting down:', counter);
            this.setState({timer: counter})
          }
        }, 1000);
    }

    clickedOption(index) {
      clearInterval(this.timer);
      const roomName = this.props.question.quizData.roomname;
      const { navigate } = this.props.navigation;
      if(this.props.questionIndex > 2) {
        console.log('Game Finished, time to navigate.');
        navigate('Result');
      } else {
          this.setState({iAnswer: true});
          this.socket.emit('submitanswer', { questionNumber: this.props.questionIndex, score: 0, status: false, roomname: roomName });
          this.setState({timer: 10});
          this.CountDownTimer();
      }
    }

  render() {
    let quest  = null;
    const data = this.props.question.data;
    if(data){
      quest = (
          <View>
          <Text style={styles.text}>Starting your game!</Text>
          <Text style={styles.timer}> { this.state.timer }</Text>
          <Text style={styles.text}>
              {this.props.questionIndex} : {this.props.question.data[this.props.questionIndex].question}
          </Text>
          <Button onPress={() => this.clickedOption(2)}>{data[this.props.questionIndex].option1}</Button>
          <Button onPress={() => this.clickedOption(2)}>{data[this.props.questionIndex].option2}</Button>
          <Button onPress={() => this.clickedOption(3)}>{data[this.props.questionIndex].option3}</Button>
          <Button onPress={() => this.clickedOption(4)}>{data[this.props.questionIndex].option4}</Button>
          </View>
      )
    } else {
      quest = (<Text style={styles.text}> Loading your opponent!</Text>)
    }
    return (
      <View style={styles.container}>
        {quest}
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
    color: '#fff'
  },
  timer: {
    color: '#fff',
    fontSize: 60
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

export default connect(mapStateToProps, actions)(Playnow);
