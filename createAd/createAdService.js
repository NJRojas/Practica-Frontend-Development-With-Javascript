export const createAd = async (ad) => {

    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8000/api/ads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ad)
    });

    if (!response.ok) {
        throw new Error('Error: El anuncion no pudo ser creado');
    }

}