import React from 'react';
import { Text, View, StyleSheet,  TouchableHighlight } from 'react-native';
import { Header, Button, Spinner } from './common';

export default class Home extends React.Component {


    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
            	<Button onPress= {() => navigate('PlayLoading')}> Play Now </Button>
			    <Text style={styles.text}>
			        Welcome to Challenger
			    </Text>
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
