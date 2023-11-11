import type { INavbarLink } from "$lib/interfaces/components/INavbarLink";
import type { User } from "lucia";

const generateNavbarLinks = (user: User): INavbarLink[] => {
    if (user) {
        return [
            {
                url: `/profile/${user?.username}`,
                displayText: user?.username,
                id: 'navbar-link-profile',
                aria: 'View and edit user profile',
                icon: 'fa-user',
            },
            {
                url: `/messages`,
                displayText: 'Messages',
                id: 'navbar-link-messages',
                aria: 'View and send messages',
                icon: 'fa-message',
            },
            {
                url: '/games',
                displayText: 'Games',
                id: 'navbar-link-games',
                aria: 'Find and organize games',
                icon: 'fa-dice',
            },
            {
                url: '/events',
                displayText: 'Events',
                id: 'navbar-link-events',
                aria: 'Find and organize events',
                icon: 'fa-calendar-alt',
            },
            {
                url: '/logout',
                displayText: 'Sign Out',
                id: 'navbar-link-signout',
                aria: 'Sign out',
                icon: 'fa-sign-out',
            },
        ]
    } else {
        return [
            {
                url: '/login',
                displayText: 'Login',
                id: 'navbar-link-login',
                aria: 'Log in',
                icon: 'fa-sign-in',
            },
            {
                url: '/register',
                displayText: 'Register',
                id: 'navbar-link-register',
                aria: 'Register a new user',
                icon: 'fa-user-plus',
            }
        ]
    }
};

export default generateNavbarLinks;
