import { pubSub } from "../pubSub.js";

/**
 * Local validation for entered remail
 * it verifies that email string is well formatted
 * in case is not broadcast warning message. 
 * @param {String} email 
 * @returns true if email is well formatted, otherwise false.
 */
export function isEmailValid(email) {

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
export function isPasswordValid(password, confirmation) {

    if (password === confirmation) {
        return true;
    }
    pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, '⚠️ Las contraseñas no coinciden');
    return false;
}

/**
 * Validate a given email
 * @param {String} email 
 * @returns 
 */
function validateEmail(email) {
    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return emailRegex.test(email);
}