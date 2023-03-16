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

        if (isEmailValid(email)) {
            showLoadingState(loginElement, spinnerElement);

            try {
                const token = await loginUser(email, password);
                localStorage.setItem('token', token);
                loginElement.reset();
                alert(`✅ Bienvenido ${email}`);
                window.location = '/';
            } catch (error) {
                pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
            } finally {
                hideLoadingState(loginElement, spinnerElement);
            }
        }
    })
}

function showLoadingState(form, spinner) {
    form.style.display = 'none';
    spinner.style.display = 'block';
}

function hideLoadingState(form, spinner) {
    form.style.display = 'grid';
    spinner.style.display = 'none';
}