/**
 * Validate a given email
 * @param {String} email 
 * @returns 
 */
export function validateEmail(email) {
    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return emailRegex.test(email);
}