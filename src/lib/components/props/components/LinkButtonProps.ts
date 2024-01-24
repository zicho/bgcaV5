import type ButtonProps from "./ButtonProps";

type LinkButtonProps = ButtonProps & {
    href: string;
    forceReloadOnClicked?: boolean;
    external?: boolean
}

export default LinkButtonProps;
