import { getAdsList } from "./adsService.js";
import { buildAdView, buildEmptyListMessage, buildSpinner } from "./adsView.js";
import { pubSub } from "../pubSub.js"

export async function adListController(adsListElement) {

    adsListElement.innerHTML = buildSpinner();
    try {
        const ads = await getAdsList();
       
        drawResults(ads, adsListElement);

    } catch (error) {
        adsListElement.innerHTML = '';
        pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
    }
}

function drawResults(ads, adsListElement) {

    adsListElement.innerHTML = '';
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