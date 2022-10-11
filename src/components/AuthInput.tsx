import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Props from '../interfaces/props/AuthInput'

const AuthInput: React.FC<Props> = ({size = 20, ...props}: Props) => {
    return (
        <View style={[styles.container, props.style]}>
            <Icon name={props.icon} size={size} style={styles.icon}/>
            <TextInput {...props} style={styles.input}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#eee',
        borderRadius:10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'

    },
    icon: {
        color: '#333',
        marginLeft: 20
    },
    input: {
        marginLeft: 20,
        width: '70%',
    }
})

export default AuthInput;