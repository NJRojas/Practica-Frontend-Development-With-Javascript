/**
 * Fetch Ad object corresponding to the given id.
 * 
 * @param {String} adId id of ad to be fetch
 * @returns a json object with ad details or error if fails
 */
export const getAdById = async (adId) => {
  
  const response = await fetch(`http://localhost:8000/api/ads/${adId}`);

  if (!response.ok) {
    throw new Error("El anuncio solicitado no existe");
  }

  const ad = await response.json();
  return ad;
};

/**
 * This service deletes an Ad object according to the given id
 * in case it exist.
 * 
 * @param {String} adId 
 */
export const deleteAd = async (adId) => {

  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:8000/api/ads/${adId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

};
