export default interface Props {
    style: object;
    icon: string;
    value: string;
    placeholder: string;
    onChangeText: (text:string) => void;
    secureTextEntry?: boolean;
}