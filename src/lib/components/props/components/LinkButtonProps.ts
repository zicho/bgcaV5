import type ButtonProps from "./ButtonProps";

type LinkButtonProps = ButtonProps & {
    href: string;
    forceReloadOnClicked?: boolean;
}

export default LinkButtonProps;
