export interface IButton {
    id: string;
    label: string;
    disabled?: boolean;
    type?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'info' | 'success' | 'warning' | 'error'
}