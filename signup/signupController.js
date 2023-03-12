import { createUser } from "./signupService.js";
import { validateEmail } from "../utils/validator.js";
import { pubSub } from "../pubSub.js";

/**
 * Handles logic for creating new users.
 * @param {Element} signupElement 
 * @param {Element} spinnerElement 
 */
export function signupController(signupElement, spinnerElement) {

    signupElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailElement = signupElement.querySelector('#username');
        const passwordElement = signupElement.querySelector('#password');
        const passwordConfirmationElement = signupElement.querySelector('#passwordConfirmation');
        const submitButton = signupElement.querySelector('#submitButton');

        const email = emailElement.value;
        const password = passwordElement.value;
        const passwordConfirmation = passwordConfirmationElement.value;

        if (isEmailValid(email) && isPasswordValid(password, passwordConfirmation)) {
            submitButton.disabled = true;
            spinnerElement.style.visibility = 'visible';
            try {
                await createUser(email, password);
                signupElement.reset();
                alert(`✅ Usuario ${email} ha sido creado`);
                window.location = '/';
            } catch (error) {
                pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
            } finally {
                submitButton.disabled = false;
                spinnerElement.style.visibility = 'hidden';
            }
        } 
    })
}

/**
 * Local validation for entered remail
 * it verifies that email string is well formatted
 * in case is not broadcast warning message. 
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

/**
 * Local validation for entered password
 * It compares the two given string parameters,
 * in case is not valid broadcast warning message.
 * 
 * @param {String} password 
 * @param {string} confirmation 
 * @returns true if both given string parameters are equal, otherwise false.
 */
function isPasswordValid(password, confirmation) {

    if (password === confirmation) {
        return true;
    }
    pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, '⚠️ Las contraseñas no coinciden');
    return false;
}