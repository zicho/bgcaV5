import type { SvelteComponent } from "svelte";

export interface INavbarLink {
    url: string;
    displayText?: string;
    id: string;
    aria: string;
    icon: typeof SvelteComponent;
    authOnly: boolean;
    mobile: boolean;
}
