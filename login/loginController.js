import { validateEmail } from "../utils/validator.js";
import { loginUser } from "./loginService.js";
import { pubSub } from "../pubSub.js";

/**
 * 
 * @param {Element} loginElement 
 * @param {Element} spinnerElement 
 */
export function loginController(loginElement, spinnerElement) {

    loginElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginElement);
        const email = formData.get('username');
        const password = formData.get('password');
        const submitButton = loginElement.querySelector('#submitButton');

        if (isEmailValid(email)) {

            try {
                showLoadingState(submitButton, spinnerElement);
                const token = await loginUser(email, password);
                localStorage.setItem('token', token);
                alert(`✅ Bienvenido ${email}`);
                window.location = '/';
            } catch (error) {
                pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
            } finally {
                hideLoadingState(submitButton, spinnerElement);
            }
        }
    })
}

/**
 * Validates wheher give email 
 * @param {String} email 
 * @returns true if email is well formatted, otherwise false.
 */
function isEmailValid(email) {
    if (validateEmail(email)) {
        return true;
    }
    pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, '⚠️ El email ingresado no corresponde a un email');
    return false;
}

function showLoadingState(submitButton, spinner) {
    submitButton.disabled = true;
    spinner.style.visibility = 'visisble';
}

function hideLoadingState(submitButton, spinner) {
    submitButton.disabled = false;
    spinner.style.visibility = 'hidden';
}