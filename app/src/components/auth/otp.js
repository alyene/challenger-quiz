import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, Button, Spinner } from '../common';

export default class Otp extends React.Component {

  submitOtp(){
    const { navigate } = this.props.navigation;
    navigate('PlayLoading');
  }


  render() {
    return (
      <View style={styles.container}>
        <Text> Please type verification code sent to this number </Text>
        <TextInput keyboardType='numeric' style={{height: 40, borderColor: 'gray', borderWidth: 1}} />

        <Button onPress={this.submitOtp.bind(this)}> Submit </Button>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
