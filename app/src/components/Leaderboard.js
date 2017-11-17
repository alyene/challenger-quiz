import React from 'react';
import { Text, View, StyleSheet,  TouchableHighlight } from 'react-native';

export default class Leaderboard extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>Leaderboard</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: 50
    },
    headerText: {
        fontSize: 26,
        alignSelf: 'center'
    }
})