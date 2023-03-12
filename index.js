import { notificationController } from "./notifications/notificationController.js"
import { userActionsController } from "./userActions/userActionsController.js";

const notificationsElement = document.querySelector('.notifications');
notificationController(notificationsElement);

const userActionsElement = document.querySelector('.userActions');
userActionsController(userActionsElement);