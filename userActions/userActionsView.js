/**
 * Buils a agreeting string with the given user. 
 * @param {String} name 
 * @returns a paragraph Element
 */
export function buildGreeting(name) {
    const paragraph = document.createElement('p');
    paragraph.textContent = `Hola ${name}!`;
    return paragraph
}