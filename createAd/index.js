import { createAdController } from "./createAdController.js"
import { notificationController } from "../notifications/notificationController.js"

const notificationsElement = document.querySelector('.notifications');
notificationController(notificationsElement);

const createAdElement = document.querySelector('#createAdForm');
const spinnerElement = document.querySelector('.spinner');
createAdController(createAdElement, spinnerElement);