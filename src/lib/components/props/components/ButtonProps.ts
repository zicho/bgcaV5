import type { SvelteComponent } from "svelte";
import type ButtonType from "./ButtonType";

type ButtonProps = {
    id: string;
    label: string;
    disabled?: boolean;
    type?: ButtonType,
    alignIconRight?: boolean,
    icon?: typeof SvelteComponent<any, SVGAElement> | undefined
    loading?: boolean
}

export default ButtonProps;
