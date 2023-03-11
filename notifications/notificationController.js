import { buildNotificationView } from "./notificationView.js";
import { pubSub } from "../pubSub.js";

/**
 * Handles notification logic.
 * @param {node} notificationsElement an html node to embed the notification view
 * @returns a function 
 */
export function notificationController(notificationsElement) {

    function showMessage(message) {
        notificationsElement.innerHTML = buildNotificationView(message);
        setTimeout(() => {
            notificationsElement.innerHTML = '';
        }, 5000);
    }

    pubSub.subscribe(pubSub.TOPICS.SHOW_NOTIFICATION, (message) => {
        showMessage(message);
    })

    return showMessage;
}