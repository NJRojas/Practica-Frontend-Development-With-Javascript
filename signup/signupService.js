/**
 * It creates a new user by sending POST request
 * Returns error or 200 status code ok with the new user object
 * 
 * @param {String} username String reresenting username,
 * @param {String} password string p
 */
export async function createUser(username, password) {
    // Create user object acc. to `/auth/register` api
    const user = {
        username: username,
        password: password
    }

    // POST new user request
    const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })

    // handle response
    if (!response.ok) {
        throw new Error("Un error ha ocurrido, el usuario no pudo ser creado");
    }

    return response.json();
}