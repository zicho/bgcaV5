export interface ITextInput {
    name: string;
    label: string;
    placeholder: string;
    hasError?: boolean;
    errorMessage?: string | undefined | null;
    type?: 'text' | 'password'
}