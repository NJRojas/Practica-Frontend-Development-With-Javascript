export async function getAdsList() {
    const reponse = await fetch('http://127.0.0.1:8000/api/ads');
    const adsList = await reponse.json();
    return adsList;
}