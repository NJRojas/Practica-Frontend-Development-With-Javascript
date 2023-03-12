/**
 * Receives username and password to be authenticated by a POST call
 * to `/auth/login` api.
 * @param {String} username 
 * @param {String} password 
 * @returns a JWT access toke if user is sucessfully identified, throws error otherwise.
 */
export async function loginUser(username, password) {

    const user = {
        username: username,
        password: password
    }

    const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // handle response
    if (!response.ok) {
        throw new Error("Un error ha ocurrido, la sesión no pudo ser iniciada");
    }

    const data = await response.json();
    return data.accessToken;
}