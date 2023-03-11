import { createUser } from "./signupService.js";
import { isEmailValid } from "../utils/validator.js";

export function signupController(signupElement) {

    signupElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailElement = signupElement.querySelector('#username');
        const passwordElement = signupElement.querySelector('#password');
        const passwordConfirmationElement = signupElement.querySelector('#passwordConfirmation');

        const email = emailElement.value;
        const password = passwordElement.value;
        const passwordConfirmation = passwordConfirmationElement.value;

        if (isEmailValid(email) && isPasswordValid(password, passwordConfirmation)) {

            try {
                await createUser(email, password);
                signupElement.reset();
                window.location = '/';
            } catch (error) {
                console.log(error);
            }
        }

    })

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
    console.log('passwords did not match');
    return false;
}