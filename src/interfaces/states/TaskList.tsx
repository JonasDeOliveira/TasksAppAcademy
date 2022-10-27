import { TaskResponse } from '../response/Task'

export default interface State {
    showAddTask: boolean;
    showDoneTasks: boolean;
    visibleTasks: Array<TaskResponse>;
    tasks: Array<TaskResponse>;
}