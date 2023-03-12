import { createAd } from "./createAdService.js"
import { isURLValid } from "../validation/formValidation.js"
import { pubSub } from "../pubSub.js"

export const createAdController = async (createAdElement, spinnerElement) => {

    createAdElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ad = creteAdFrom(createAdElement);
        if (typeof ad != 'undefined') {

            const submitButton = createAdElement.querySelector('#submitButton');
            showLoadingState(submitButton, spinnerElement);

            try {
                await createAd(ad);
                alert(`✅  Tu anuncio fue dado de alta éxitosamente`);
                window.location = '/';
            } catch (error) {
                pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, `❌ ${error.message}`);
            } finally {
                hideLoadingState(submitButton, spinnerElement);
            }
        }
        
    })
}

function creteAdFrom(createAdElement) {
    const formData = new FormData(createAdElement);
    const article = formData.get('articleName');
    const description = formData.get('description');
    const adType = formData.get('onSale');
    const price = formData.get('price');
    const imageURL = formData.get('imageUrl');

    if (!isURLValid(imageURL) && price >= 0) {
        return undefined;
    }

    const onSale = adType === 'onSale' ? true : false;
    const adObject = {
        articleName: article,
        description: description,
        onSale: onSale,
        price: price,
        imageURL: imageURL
    }
    
    return adObject;
}

function showLoadingState(submitButton, spinner) {
    submitButton.disabled = true;
    spinner.style.visibility = 'visible';
    debugger;
}

function hideLoadingState(submitButton, spinner) {
    submitButton.disabled = false;
    spinner.style.visibility = 'hidden';
}