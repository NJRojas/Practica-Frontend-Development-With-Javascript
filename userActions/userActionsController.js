import { decodedToken } from '../utils/decodedToken.js'
import { buildGreeting } from './userActionsView.js'

export function userActionsController(userActionsElement, greetingElement) {
    const token = localStorage.getItem('token');
    const createAdElement = userActionsElement.querySelector('#createAdLink');
    const closeSessionElement = userActionsElement.querySelector('#closeSession');

    if (token) {

        // If there is a session on, removes signup and login link and shows user greeting
        const signupLinkElement = userActionsElement.querySelector('#signupLink');
        signupLinkElement.remove();
        const loginLinkElement = userActionsElement.querySelector('#loginLink');
        loginLinkElement.remove();

        const payload = decodedToken(token);
        const userGreetingElement = buildGreeting(payload.username);
        greetingElement.appendChild(userGreetingElement);

        closeSessionElement.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.reload();
        });

    } else {
        createAdElement.remove();
        closeSessionElement.remove();
    }
}