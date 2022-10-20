import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

const Task: React.FC = () => {

    const getRightContent: React.FC = ():React.ReactElement => {

        return (
            <TouchableOpacity style={styles.right}>
                 <Icon name="trash" size={30} color='#fff' />
            </TouchableOpacity>
        )
    }

    const getLeftContent: React.FC = ():React.ReactElement => {

        return (
            <TouchableOpacity style={styles.left}>
                 <Icon style={styles.excludeIcon} name="trash" size={20} color='#fff' />
                 <Text style={styles.excludeText}>Excluir</Text>
            </TouchableOpacity>
        )
    }


    return (
        <Swipeable 
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}> 
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <View style={styles.checkContainer}>
                        <View style={styles.pending}></View>
                        <View style={styles.done}>
                            <Icon name="check" size={20} color='#fff'/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={styles.desc}>Tarefa</Text>
                    <Text style={styles.date}>ter, 18 de outubro</Text>
                </View>
            </View>

        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#aaa',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 13
    },
    done: {
        height: 25,
        width: 25,
        borderColor: '#555',
        backgroundColor: '#4D7031',
        borderWidth: 1,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        color: '#222',
        fontSize: 16
    },
    date: {
        fontSize: 12,
        color: '#555',
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft: 10
    },
    excludeText: {
        margin: 10,
        color: "#fff",
        fontSize: 20
    }
})

export default Task