import { signupController } from "./signupController.js";
import { notificationController } from "../notifications/notificationController.js"

const notificationsElement = document.querySelector('.notifications');
notificationController(notificationsElement);

const signupElement = document.querySelector('#signupForm');
signupController(signupElement);
