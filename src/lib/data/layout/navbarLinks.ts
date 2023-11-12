import type { INavbarLink } from "$lib/interfaces/components/INavbarLink";
import type { User } from "lucia";
import type { SvelteComponent } from "svelte";
import UserIcon from 'virtual:icons/lucide/user';
import MailIcon from 'virtual:icons/lucide/mail';
import GameIcon from 'virtual:icons/lucide/dice-6';
import CalendarIcon from 'virtual:icons/lucide/calendar';
import SignoutIcon from 'virtual:icons/lucide/log-out';
import LoginIcon from 'virtual:icons/lucide/log-in';
import RegisterIcon from 'virtual:icons/lucide/user-plus';

const generateNavbarLinks = (user: User): INavbarLink[] => {
    return [
        {
            url: `/profile/${user?.username}`,
            displayText: user?.username,
            id: 'navbar-link-profile',
            aria: 'View and edit user profile',
            icon: UserIcon as typeof SvelteComponent,
            authOnly: true
        },

        {
            url: `/messages`,
            displayText: 'Messages',
            id: 'navbar-link-messages',
            aria: 'View and send messages',
            icon: MailIcon as typeof SvelteComponent,
            authOnly: true
        },
        {
            url: '/games',
            displayText: 'Games',
            id: 'navbar-link-games',
            aria: 'Find and organize games',
            icon: GameIcon as typeof SvelteComponent,
            authOnly: true
        },
        {
            url: '/events',
            displayText: 'Events',
            id: 'navbar-link-events',
            aria: 'Find and organize events',
            icon: CalendarIcon as typeof SvelteComponent,
            authOnly: true
        },
        {
            url: '/logout',
            displayText: 'Sign Out',
            id: 'navbar-link-signout',
            aria: 'Sign out',
            icon: SignoutIcon as typeof SvelteComponent,
            authOnly: true
        },
        {
            url: '/login',
            displayText: 'Login',
            id: 'navbar-link-login',
            aria: 'Log in',
            icon: LoginIcon as typeof SvelteComponent,
            authOnly: false
        },
        {
            url: '/register',
            displayText: 'Register',
            id: 'navbar-link-register',
            aria: 'Register a new user',
            icon: RegisterIcon as typeof SvelteComponent,
            authOnly: false
        }
    ]
};

export default generateNavbarLinks;
