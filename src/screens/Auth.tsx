import React, {Component} from 'react'
import { 
    View, Text, StyleSheet,
    TouchableOpacity, ImageBackground,
    Alert
 } from 'react-native'
 import axios from 'axios'
 import AsyncStorage from '@react-native-community/async-storage'
 import backgroundImage from '../../assets/imgs/login.jpg'
 import commonStyles from '../commonStyles'
 import AuthInput from '../components/AuthInput'
 import State from '../interfaces/states/Auth'
 import Props from '../interfaces/props/Auth'
 import If from '../components/If'
 import { server, showError, showSuccess } from '../common'
 
const initialState = {
    name: '',
    email: 'jonas@.com',
    password: '123456',
    confirmPassword: '',
    stageNew: false
}
 
class Auth extends Component<Props, State> {


    state: State = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signin = async () => {
        // console.warn('aqui')
        try {
            const response = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })
            AsyncStorage.setItem('userData', JSON.stringify(response.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`
            this.props.navigation.navigate('Home')
        } catch (e) {
            showError(e)
        }
    }

    signup = async () => {
        console.warn(this.state)
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            showSuccess('Usuário cadastrado')
        } catch(e) {
            showError(e)
        }
    }

    render(): React.ReactElement {
        let validations: Array<any> = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)
        
        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password == this.state.confirmPassword)
        }
        
        const validForm = validations.reduce((a, b) => a && b)

        return (
            <>
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Faça seu Login' }
                    </Text>
                    <If test={this.state.stageNew}>
                        <AuthInput icon="user" placeholder="Nome" style={styles.input} 
                            value={this.state.name} 
                            onChangeText={name => this.setState({ name })} />
                    </If>                    
                    <AuthInput icon="at" placeholder="E-mail" style={styles.input} 
                        value={this.state.email} 
                        onChangeText={email => this.setState({ email })}/>
                    <AuthInput icon="lock" placeholder="Senha" style={styles.input} 
                        value={this.state.password} size={25}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={true}/>
                    <If test={this.state.stageNew}>
                        <AuthInput icon="asterisk" placeholder="Confirmação de Senha" style={styles.input} 
                            value={this.state.confirmPassword} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry={true}/>
                    </If>
                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10, marginTop: 10}} 
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?': 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </>
        )

    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 70,
        textAlign: 'center',
        color: commonStyles.colors.title
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: commonStyles.colors.title
    },
    button: {
        backgroundColor: '#080',
        padding: 10,
        borderRadius: 7,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10
    }
})

export default Auth