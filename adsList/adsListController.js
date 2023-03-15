import { getAdsList } from "./adsService.js";
import { buildAdView, buildEmptyListMessage } from "./adsView.js";
import { pubSub } from "../pubSub.js"

export async function adListController(adsListElement, spinnerElement) {

    adsListElement.innerHTML = '';
    spinnerElement.style.display = 'block';
    try {
        const ads = await getAdsList();
        spinnerElement.style.display = 'none';
        drawResults(ads, adsListElement);

    } catch (error) {
        spinnerElement.style.display = 'none';
        pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
    }
}

function drawResults(ads, adsListElement) {

    if (ads.length > 0) {
        ads.forEach(ad => {
            const newAd = buildAdView(ad);
            adsListElement.appendChild(newAd);
        });
    } else {
        showEmptyMessage(adsListElement);
    }  
}

function showEmptyMessage(adsListElement) {
    adsListElement.innerHTML = buildEmptyListMessage();
}