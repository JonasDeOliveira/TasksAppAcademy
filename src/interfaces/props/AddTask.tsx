import {TaskRequest} from '../response/Task'

export default interface Props {
    isVisible: boolean;
    closeModal: () => void;
    onSave: (task: TaskRequest) => void;
}