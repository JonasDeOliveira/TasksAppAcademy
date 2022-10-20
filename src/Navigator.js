import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import Menu from './screens/Menu'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const menuConfig = {
    labelStyle : {
        fontSize: 20,
    },

    activeTintColor: '#080',
    headerShown: false
}

const DrawerNavigator = props => {
    return (
        <Drawer.Navigator screenOptions={menuConfig}
            drawerContent={(props) => <Menu {...props} />}>
               <Drawer.Screen name='Today' component={TaskList}>
               </Drawer.Screen> 
               <Drawer.Screen name='Amanhã' component={TaskList}>
               </Drawer.Screen> 
        </Drawer.Navigator>
    )
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"Auth"} screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Auth" component={Auth}/>
            <Stack.Screen name="Home" component={DrawerNavigator}/>
        </Stack.Navigator>
    )
}

const Navigator = () => {
    return (
        <NavigationContainer>
            <AuthNavigator/>
        </NavigationContainer>
    )
}

export default Navigator