export default interface Props {
    id: number;
    doneAt: string;
    estimateAt: string;
    desc: string;
    onDelete?: (idItem:number) => void;
    onToggleTask?: (idItem:number) => void;
    onChangeText?:() => void;  
};