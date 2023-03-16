/**
 * Receives an Ad object, a build HTML object based on its attributes.
 * 
 * @param {JSON Object} ad 
 * @returns HTML Element
 */
export function buildAdView(ad) {
    const type = ad.onSale ? 'Se vende' : 'Se busca';
    return`
        <div class="adCard">
            <img src="${ad.imageURL}"/>
            <div class="cardAdInfo">
                <p class="cardTitle">${ad.articleName}</p>
                <p>${ad.description}</p>
            </div>
            <div class="cardFooter">
                <p>${ad.price} €</p>
                <p>${type}</p>
                <button id="deleteAd">🗑️</button>
            </div>
        </div>
    `;
    return adElement;
}

export function buildSpinner() {
    return `<div class="spinnerContainer">
                <div class="spinner"></div>
                <div>
                    <p>Cargando anuncios...</p>
                </div>
            </div>
    `;
}