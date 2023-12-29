import type ButtonType from "./ButtonType";

export interface IButton {
    id: string;
    label: string;
    disabled?: boolean;
    type?: ButtonType
}