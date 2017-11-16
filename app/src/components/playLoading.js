import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import SocketIOClient from 'socket.io-client';
import { environment } from '../config/environment';

class Playnow extends React.Component {

    socket;

    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.socket = SocketIOClient(environment.backendUrl);
        this.socket.emit('hereisthedata', { userid:1, subjectid:2 });
        this.socket.on('questions', (Questiondata) => {
          // this.setState({gameinitiated: true, questions: Questiondata});
          this.props.store_questions(Questiondata);
          navigate('Play');
        });
    }

  render() {
    return (
      <View style={styles.container}>
          { (this.props.question.data > 0) ? 
            <Text style={styles.text}>Starting your game!</Text> : 
            <Text style={styles.text}> Loading your opponent!</Text>
          }
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
  }
});

const mapStateToProps = state => {
  return {
    question: state.questions.question,
    questionIndex: state.questions.questionIndex
  };
};

export default connect(mapStateToProps, actions)(Playnow);
