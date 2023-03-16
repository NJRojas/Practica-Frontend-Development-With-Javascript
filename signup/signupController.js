import { createUser } from "./signupService.js";
import { isEmailValid, isPasswordValid } from "../validation/formValidation.js"
import { pubSub } from "../pubSub.js";

/**
 * Handles logic for creating new users.
 * @param {Element} signupElement 
 * @param {Element} spinnerElement 
 */
export function signupController(signupElement, spinnerElement) {

    signupElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(signupElement);
        const email = formData.get('username');
        const password = formData.get('password');
        const passwordConfirmation = formData.get('passwordConfirm');

        if (isEmailValid(email) && isPasswordValid(password, passwordConfirmation)) {
            
            try {
                showLoadingState(signupElement, spinnerElement);
                await createUser(email, password);
                signupElement.reset();
                alert(`✅ Usuario ${email} ha sido creado`);
                window.location = '/';
            } catch (error) {
                pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
            } finally {
                hideLoadingState(signupElement, spinnerElement);
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