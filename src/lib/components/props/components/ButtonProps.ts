import type ButtonType from "./ButtonType";

type ButtonProps = {
    id: string;
    label: string;
    disabled?: boolean;
    type?: ButtonType
}

export default ButtonProps;
