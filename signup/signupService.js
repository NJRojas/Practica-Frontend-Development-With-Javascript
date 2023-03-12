/**
 * It creates a new user by sending POST request to `/auth/register`.
 * 
 * @param {String} username String email string to be set as username.
 * @param {String} password string password string for new user.
 * @returns 200 status code ok with the new user object, throws error otherwise
 */
export async function createUser(username, password) {
    // Create user object acc. to `/auth/register` api
    const newUser = {
        username: username,
        password: password
    }

    // POST new user request
    const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
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