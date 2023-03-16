import { adListController } from "./adsList/adsListController.js";
import { notificationController } from "./notifications/notificationController.js"
import { userActionsController } from "./userActions/userActionsController.js";

const notificationsElement = document.querySelector('.notifications');
notificationController(notificationsElement);

const userActionsElement = document.querySelector('.userActions');
const greetingElement = document.querySelector('.greeting');
userActionsController(userActionsElement, greetingElement);

const adsListElement = document.querySelector('.adsListContainer');
adListController(adsListElement);