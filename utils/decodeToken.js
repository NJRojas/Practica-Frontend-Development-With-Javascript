/**
 * Extract token from a JWT token 
 * @param {String} toke A string in the form of a JWT token
 * @returns 
 */
export const decodedToken = (token) => {
    try {
        let decodedToken;
        const stringifiedToken = atob(token.split(".")[1]);
        decodedToken = JSON.parse(stringifiedToken);
        return decodedToken;
    } catch {
        console.log("Undefined token");
        return null;
    }
}