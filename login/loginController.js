import { isEmailValid } from "../validation/formValidation.js"
import { loginUser } from "./loginService.js";
import { pubSub } from "../pubSub.js";

/**
 * Validates and trigger usere login call
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
            showLoadingState(submitButton, spinnerElement);

            try {
                const token = await loginUser(email, password);
                localStorage.setItem('token', token);
                loginElement.reset();
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

function showLoadingState(submitButton, spinner) {
    submitButton.disabled = true;
    spinner.style.visibility = 'visible';
}

function hideLoadingState(submitButton, spinner) {
    submitButton.disabled = false;
    spinner.style.visibility = 'hidden';
}