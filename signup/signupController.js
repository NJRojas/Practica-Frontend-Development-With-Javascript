import { createUser } from "./signupService.js";
import { isEmailValid, isPasswordValid } from "../validation/validationForm.js"
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
        const submitButton = signupElement.querySelector('#submitButton');

        if (isEmailValid(email) && isPasswordValid(password, passwordConfirmation)) {
            
            try {
                showLoadingState(submitButton, spinnerElement);
                await createUser(email, password);
                signupElement.reset();
                alert(`✅ Usuario ${email} ha sido creado`);
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