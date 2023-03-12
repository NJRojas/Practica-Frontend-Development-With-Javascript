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
 * Local validation for url strings. 
 * Expected format `http://www.sample.com` or https://sampl.com` 
 * In case it is not a match to the expected format, it broadcast warning message
 * @param {String} url 
 * @returns returns true if is strings match url format, false otherwise
 */
export function isURLValid(url) {
    if (validateURL(url)) {
        return true;
    }
    pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `⚠️ El enlace ${url} no corresponde a un enlace valido`);
    return false;
}

/**
 * Validate a given string to be formatted as email
 * @param {String} email 
 * @returns 
 */
function validateEmail(email) {
    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return emailRegex.test(email);
}

/**
 * Evaluates a given string to be formatted as URL
 * It is not case sensitive
 * @param {String} url 
 * @returns true or false according to the test.
 */
function validateURL(url) {
    const urlRegex = new RegExp(/^[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?/)
    return urlRegex.test(url);
}