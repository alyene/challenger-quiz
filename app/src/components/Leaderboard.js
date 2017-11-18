import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default class Leaderboard extends React.Component {

    constructor(props) {
        super(props);    
        this.state = {
            toppers: []
        }
    }
    
    componentWillMount () {
        axios.post('http://192.168.1.101:8000/leaderboard', {
        })
        .then(function(response){
            response.data.data.forEach(element => {
                this.state.toppers.push(element)
            });
        })
        .catch(function(error){
            console.log("Error", error);
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>Leaderboard</Text>

                <ScrollView>
                    <Text>Topper Name</Text>
                </ScrollView>
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