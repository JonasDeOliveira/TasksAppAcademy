import React, {Component} from 'react';
import { 
    View, Text, StyleSheet,
    TouchableOpacity, ImageBackground
 } from 'react-native'
 import backgroundImage from '../../assets/imgs/login.jpg'
 import commonStyles from '../commonStyles';
 import AuthInput from '../components/AuthInput'

class Auth extends Component {

    signin = () => {
        console.warn('Login')
    }

    render(): React.ReactElement {

        return (
            <>
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View>
                    <Text style={styles.subtitle}>Faça seu Login</Text>
                    <AuthInput icon="user" placeholder="Nome"/>
                    <TouchableOpacity onPress={this.signin}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}}>
                    <Text style={styles.buttonText}>Ainda não possui conta?</Text>
                </TouchableOpacity>
            </ImageBackground>
        </>
        )

    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    title: {
        fontSize: 70,
        textAlign: 'center',
        color: commonStyles.colors.title
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        color: commonStyles.colors.title
    },
    button: {
        backgroundColor: '#080',
        padding: 10,
        borderRadius: 7
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
    }
})

export default Auth