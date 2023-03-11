/**
 * Builds a html node with message embedded.
 * 
 * @param {string} message to be displayed.
 * @returns Returns a html paragraph.
 */
export function buildNotificationView(message) {
    return `<p>${message}</p>`;
}