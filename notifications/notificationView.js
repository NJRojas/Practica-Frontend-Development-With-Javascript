/**
 * Builds a html node with message embedded.
 * 
 * @param {string} message to be displayed.
 * @returns Returns a html paragraph.
 */
export function buildNotificationView(message) {
    return `<div class="messageContainer">
                <p>${message}</p>
    </div>`;
}