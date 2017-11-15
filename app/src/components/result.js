import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, Spinner } from './common';

export default class Result extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> You WIN !  </Text>
        <Button onPress={() => navigate('PlayLoading')}> Play Again </Button>
        <Button onPress={() => navigate('Home')}> Go Home  </Button>
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
    fontSize: 25,
    marginBottom: 30
  }
});


