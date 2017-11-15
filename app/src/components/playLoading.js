import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class Playnow extends React.Component {

    socket;

    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.state = { gameinitiated: false, questions: '' };

        this.socket = SocketIOClient('http://192.168.225.37:8000');
        this.socket.emit('hereisthedata', { userid:1, subjectid:2 });

        // this.dataToServer = this.dataToServer.bind(this);
        // this.gameCreated = this.gameCreated.bind(this);
        // this.gotQuestions = this.gotQuestions.bind(this);

        // this.socket.on('datatoserver', this.dataToServer);
        // this.socket.on('gamecreatedpleasewait');

        this.socket.on('questions', (Questiondata) => {
          this.setState({gameinitiated: true, questions: Questiondata});
          navigate('Play');
        });
    }

  componentDidMount() {
    const { navigate } = this.props.navigation;
  }

  render() {
    return (
      <View style={styles.container}>
          { this.state.gameinitiated ? <Text style={styles.text}> Starting your game !  </Text> : <Text style={styles.text}> Loading your opponent !  </Text>
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
