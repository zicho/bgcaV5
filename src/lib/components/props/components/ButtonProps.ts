import type { SvelteComponent } from "svelte";
import type ButtonType from "./ButtonType";

type ButtonProps = {
    id: string;
    label: string;
    disabled?: boolean;
    loading?: boolean;
    type?: ButtonType,
    alignIconRight?: boolean,
    icon?: typeof SvelteComponent<any, SVGAElement> | undefined
}

export default ButtonProps;
