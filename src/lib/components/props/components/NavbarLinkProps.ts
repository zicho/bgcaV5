import type { SvelteComponent } from "svelte";

export type NavbarLinkProps = {
    url: string;
    displayText?: string;
    id: string;
    aria: string;
    icon: typeof SvelteComponent<any, SVGAElement>;
    authOnly: boolean;
}
