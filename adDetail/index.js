import { adDetailController } from "./adDetailController.js";
import { notificationController } from "../notifications/notificationController.js"

const notificationsElement = document.querySelector('.notifications');
notificationController(notificationsElement);

// retrieve ad id
const params = new URLSearchParams(window.location.search)
const adId = params.get('adId');

// redirect to home, if parameter does not exist
if (!adId) {
  window.location = '/'
} else {
  // set controller
  const adDetailElement = document.querySelector('.adDetailContainer');
  adDetailController(adDetailElement, adId)
}