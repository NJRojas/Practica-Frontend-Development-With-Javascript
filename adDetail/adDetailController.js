import { getAdById, deleteAd } from "./adDetailService.js";
import { buildAdView, buildSpinner } from "./adDetailView.js";
import { decodedToken } from "../utils/decodedToken.js"
import { pubSub } from "../pubSub.js"

/**
 * Handles logic for displaying ad detail
 * 
 * @param {Element} adDetailElement 
 * @param {String} adId 
 */
export const adDetailController = async (adDetailElement, adId,) => {

  adDetailElement.innerHTML = buildSpinner();

  try {
    const ad = await getAdById(adId);
    adDetailElement.innerHTML = buildAdView(ad);
    handleDeleteAdButton(adDetailElement, ad);
  
  } catch (error) {
    adDetailElement.innerHTML = '';
    pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
    //alert(error);
  }
}

/**
 * Handles logic to display delete button in an ad detail
 * as well as logic behind delete button.
 * 
 * @param {Element} adDetailElement 
 * @param {String} ad 
 */
function handleDeleteAdButton(adDetailElement, ad) {
  const token = localStorage.getItem('token');
  const deleteButtonElement = adDetailElement.querySelector("#deleteAd");

  if (!token) {
    deleteButtonElement.remove();
  } else {
    const userInfo = decodedToken(token);
    if (ad.userId === userInfo.userId) {
      deleteButtonElement.addEventListener("click", async () => {
        const answer = confirm("¿Deseas borrar este anuncio ?");
        if (answer) {
          try {
            await deleteAd(ad.id);
            window.location = "/";
          } catch (error) {
            alert(error);
          }
        }
      })
    } else {
      deleteButtonElement.remove();
    }
  }
}

function showLoadingState(container, spinner) {
  container.style.display = 'none';
  spinner.style.display = 'block';
}

function hideLoadingState(container, spinner) {
  container.style.display = 'grid';
  spinner.style.display = 'none';
}