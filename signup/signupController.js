import { createUser } from "./signupService.js";
import { validateEmail } from "../utils/validator.js";
import { pubSub } from "../pubSub.js";

/**
 * Handles logic for creating new users.
 * @param {*} signupElement a html node with sign up data embedded.
 */
export function signupController(signupElement) {

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
            try {
                await createUser(email, password);
                signupElement.reset();
                alert(`✅ Usuario ${email} ha sido creado`);
                window.location = '/';
            } catch (error) {
                pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
            } finally {
                submitButton.disabled = false;
            }
        } 

    })
}

/**
 * Validates wheter give email 
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
 * Returns true if both given string parameters are equal
 * otherwise broadcast error message
 *  
 * @param {String} password 
 * @param {string} confirmation 
 */
function isPasswordValid(password, confirmation) {

    if (password === confirmation) {
        return true;
    }
    pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, '⚠️ Las contraseñas no coinciden');
    return false;
}