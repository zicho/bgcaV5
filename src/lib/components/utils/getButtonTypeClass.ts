import type { IButton } from "../interfaces/components/IButton";

export default function getButtonTypeClass(type: IButton['type']): string {
    switch (type) {
        case 'neutral':
            return 'btn-neutral';
        case 'primary':
            return 'btn-primary';
        case 'secondary':
            return 'btn-secondary';
        case 'accent':
            return 'btn-accent';
        case 'ghost':
            return 'btn-ghost';
        case 'link':
            return 'btn-link';
        case 'info':
            return 'btn-info';
        case 'success':
            return 'btn-success';
        case 'warning':
            return 'btn-warning';
        case 'error':
            return 'btn-error';
        default:
            return 'btn-neutral'; // Default to 'neutral' if the type is not recognized
    }
}