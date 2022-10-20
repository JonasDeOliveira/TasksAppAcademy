import React, { Component } from 'react'
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import todayImage from '../../assets/imgs/today.jpg'
import AddTask from './AddTask'
import State from '../interfaces/states/TaskList'
import Props from '../interfaces/props/TaskList'
import Task from '../components/Task'

const initialState = {
    showAddTask: false
}

class TaskList extends Component<Props, State> {

    state: State = {
        ...initialState
    }

    render(): React.ReactElement {

        return (
            <>
                <View style={styles.constainer}>
                    <AddTask isVisible={this.state.showAddTask}
                        closeModal={() => this.setState({showAddTask: false})}/>
                    <ImageBackground source={todayImage}
                        style={styles.background}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="bars" size={20} color={'#fff'}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="eye" size={20} color={'#fff'}/>
                            </TouchableOpacity>
                        </View>   
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subtitle}>ter, 18 de outubro</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskList}>
                        <Task/>
                    </View>
                    <TouchableOpacity style={styles.addButton}
                        onPress={() => this.setState({showAddTask: true})}>
                        <Icon name="plus" size={20} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            </>
        )

    }

}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
        color: '#fff',

    },
    subtitle: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
        color: '#fff',
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        backgroundColor: '#B13B44',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    }
})

export default TaskList