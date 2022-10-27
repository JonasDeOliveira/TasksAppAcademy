import React from 'react'
import { Platform, ScrollView, View, 
    Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Props from '../interfaces/props/Menu'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const Menu: React.FC<Props> = (props: Props) => {

    const logout = (): void => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')

        props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Auth' }
              ],
            })
          );
    }

    return (
        <DrawerContentScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
            
                <View style={styles.userInfo}>
                    <Text style={styles.name}>Jonas</Text>
                    <Text style={styles.email}>jonas@.com</Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name="sign-out" size={30} color='#800'/>
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontSize: 30,
        paddingTop: 30,
        paddingLeft: 10,
        paddingBottom: 10
    },
    userInfo: {
        paddingLeft: 10
    },
    name: {
        color: '#222', 
        fontSize: 20,
        marginBottom: 5
    },
    email: {
        fontSize: 15,
        marginBottom: 15
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    }
})

export default Menu