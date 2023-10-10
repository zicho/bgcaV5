export interface ITextInput {
    name: string;
    label: string;
    value?: string;
    placeholder: string;
    required: boolean;
    hasError?: boolean;
    errorMessage?: string | string[] | undefined | null;
    type?: 'text' | 'password'
}