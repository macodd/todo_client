// checks local storage for a logged in user
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    }
    return {};
}