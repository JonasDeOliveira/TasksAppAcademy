import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import UserResponse from '../interfaces/response/User'
import Props from '../interfaces/props/AuthOrApp'

class AuthOrApp extends Component<Props> {

    componentDidMount = async (): Promise<void> => {
        let userDataJson: any;
        let userData: UserResponse;
        userDataJson = await AsyncStorage.getItem('userData');

        userData = JSON.parse(userDataJson)

        if (userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'Home' },
                  ],
                })
              );
                
            return
        }

        this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Auth' },
              ],
            })
          );
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    }
})

export default AuthOrApp