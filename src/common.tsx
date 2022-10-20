import { Alert, Platform } from 'react-native'

const server: string = Platform.OS == 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000' 

function showError(err: any): void {
    Alert.alert('Ops! Ocorreu um problemaaaaa!', `Mensagem: ${err}`)
}


function showSuccess(msg: string): void {
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }