import type { INavbarLink } from "$lib/components/interfaces/components/INavbarLink";
import type { User } from "lucia";
import { UserIcon, MailIcon, GameIcon, CalendarIcon, SignoutIcon, LoginIcon, RegisterIcon } from "$lib/data/icons";

const generateNavbarLinks = (user: User): INavbarLink[] => {
    return [
        {
            url: `/profile/${user?.username}`,
            displayText: user?.username,
            id: 'navbar-link-profile',
            aria: 'View and edit user profile',
            icon: UserIcon,
            authOnly: true,
        },

        {
            url: `/messages`,
            displayText: 'Messages',
            id: 'navbar-link-messages',
            aria: 'View and send messages',
            icon: MailIcon,
            authOnly: true
        },
        {
            url: '/games',
            displayText: 'Games',
            id: 'navbar-link-games',
            aria: 'Find and organize games',
            icon: GameIcon,
            authOnly: true
        },
        {
            url: '/events',
            displayText: 'Events',
            id: 'navbar-link-events',
            aria: 'Find and organize events',
            icon: CalendarIcon,
            authOnly: true
        },
        {
            url: '/logout',
            displayText: 'Sign Out',
            id: 'navbar-link-signout',
            aria: 'Sign out',
            icon: SignoutIcon,
            authOnly: true
        },
        {
            url: '/login',
            displayText: 'Login',
            id: 'navbar-link-login',
            aria: 'Log in',
            icon: LoginIcon,
            authOnly: false
        },
        {
            url: '/register',
            displayText: 'Register',
            id: 'navbar-link-register',
            aria: 'Register a new user',
            icon: RegisterIcon,
            authOnly: false
        }
    ]
};

export default generateNavbarLinks;
