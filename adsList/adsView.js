export function buildAdView(ad) {

    const adElement = document.createElement('article');
    adElement.classList.add('ad');
    const type = ad.onSale ? 'Se vende' : 'Se busca';
    adElement.innerHTML = `
        <div class="adCard">
            <img src="${ad.imageURL}"/>
            <div class="cardHeader">
                
            </dv>
            <div class="cardAdInfo">
                <p class="cardTitle">${ad.articleName}</p>
                <p>${ad.description}</p>
            </div>
            <div class="cardFooter">
                <p class="cardPriceText">${ad.price} €</p>
                <p>${type}</p>
            </div>
        </div>
    `;

    return adElement;
}

export function buildErrorMessage() {
    return `<div class="messageContainer">
                <p>La carga de los anuncios falló. Inténtalo de nuevo más tarde</p>
            </div>
    `;
}
  
export function buildEmptyListMessage() {
    return `<div class="messageContainer">
                <p>No hay anuncios disponibles</p>
            </div>
    `;
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