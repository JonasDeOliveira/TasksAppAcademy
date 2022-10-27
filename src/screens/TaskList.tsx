import React, { Component } from 'react'
import {
    View, Text, StyleSheet, ImageBackground, 
    TouchableOpacity, FlatList, Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthmage from '../../assets/imgs/month.jpg'
import AddTask from './AddTask'
import State from '../interfaces/states/TaskList'
import Props from '../interfaces/props/TaskList'
import Task from '../components/Task'
import { TaskRequest, TaskResponse } from '../interfaces/response/Task'
import axios from 'axios'
import { server, showError } from '../common'
import moment from 'moment'
import commonStyles from '../commonStyles'

const initialState = {
    showAddTask: false,
    showDoneTasks: true,
    visibleTasks: [],
    tasks: []
}

class TaskList extends Component<Props, State> {

    state: State = {
        ...initialState
    }

    componentDidMount = async() => {
        this.loadTasks()
    }

    loadTasks = async (): Promise<void> => {
        try {
            const maxDate = moment()
                .add({days: this.props.daysAhead})
                .format('YYYY-MM-DD 23:59:59')
            const resp = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: resp.data}, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleTask = async (taskId: number): Promise<void> => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            this.loadTasks()
        } catch(e) {
            showError(e)
        }
    }

    toggleFilter = (): void => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
    }

    filterTasks = ():void => {
        let visibleTasks: Array<TaskResponse> = [];
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt == null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })

    }

    addTask = async (newTask: TaskRequest): Promise<void> => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.estimateAt
            })

            this.setState({showAddTask: false}, this.loadTasks)
        } catch(e) {
            showError(e)
        }
    }

    deleteTask = async (taskId: number): Promise<void> => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        } catch(e) {
            showError(e)
        }
    }

    getColor = (): any => {
        switch (this.props.daysAhead) {
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            case 30: return commonStyles.colors.month
            default: return commonStyles.colors.today
        }
    }

    getImage = (): any => {
        switch (this.props.daysAhead) {
            case 1: return tomorrowImage
            case 7: return weekImage
            case 30: return monthmage
            default: return todayImage
        }
    }

    render(): React.ReactElement {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <>
                <View style={styles.constainer}>
                    <AddTask isVisible={this.state.showAddTask}
                        closeModal={() => this.setState({showAddTask: false})}
                        onSave={this.addTask}
                        colorDay={this.getColor()}/>
                    <ImageBackground source={this.getImage()}
                        style={styles.background}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="bars" size={20} color={'#fff'}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={'#fff'}/>
                            </TouchableOpacity>
                        </View>   
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskList}>
                        <FlatList data={this.state.visibleTasks} 
                            keyExtractor={task => `${task.id}`}
                            renderItem={({item}) => <Task {...item} onDelete={this.deleteTask} onToggleTask={this.toggleTask}/>}/>
                        
                    </View>
                    <TouchableOpacity style={[styles.addButton, {backgroundColor: this.getColor()}]}
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