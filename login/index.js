import { loginController } from "./loginController.js";
import { notificationController } from "../notifications/notificationController.js"

const notificationsElement = document.querySelector('.notifications');
notificationController(notificationsElement);

const loginElement = document.querySelector('#loginForm');
const spinnerElement = document.querySelector('.spinnerContainer');
loginController(loginElement, spinnerElement);