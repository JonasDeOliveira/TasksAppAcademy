import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Auth from './screens/Auth'
import AuthOrApp from './screens/AuthOrApp'
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
               <Drawer.Screen name='Hoje'>
                    {props => <TaskList {...props} title='Hoje' daysAhead={0}/>}
               </Drawer.Screen> 
               <Drawer.Screen name='Amanhã'>
                    {props => <TaskList {...props} title='Amanhã' daysAhead={1}/>}
               </Drawer.Screen> 
               <Drawer.Screen name='Semana'>
                    {props => <TaskList {...props} title='Semana' daysAhead={7}/>}
               </Drawer.Screen>
               <Drawer.Screen name='Mês'>
                    {props => <TaskList {...props} title='Mês' daysAhead={30}/>}
               </Drawer.Screen>
        </Drawer.Navigator>
    )
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"AuthOrApp"} screenOptions={{ headerShown: false}}>
            <Stack.Screen name="AuthOrApp" component={AuthOrApp}/>
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