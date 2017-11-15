import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Otp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> This is otp page </Text>
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
