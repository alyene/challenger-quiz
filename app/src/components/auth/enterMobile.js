import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Header, Button, Spinner } from '../common';

export default class EnterMobile extends React.Component {

    navigateOtp(){
      const { navigate } = this.props.navigation;
      navigate('Otp');
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
    			    <Text style={styles.text}>
    			        Enter your mobile number
    			    </Text>

              <TextInput
              keyboardType='numeric'
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder="eg: 8089647060" />

              <Text>
                We will send you a one time sms message.
              </Text>

              <Button onPress={this.navigateOtp.bind(this)}> Next >  </Button>
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
