import type ButtonType from "./ButtonType";

export interface ILinkButton {
    id: string;
    href: string;
    label: string;
    disabled?: boolean;
    type?: ButtonType
}