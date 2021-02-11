import axios from 'axios';

// path to api
const BASE_URL = "http://localhost:9000/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(BASE_URL + "login", {
                email,
                password
            })
            .then((res) => {
                // check for access token
                if (res.data.accessToken) {
                    // stored the user in local storage
                    localStorage.setItem("user", JSON.stringify(res.data));
                }

                return res.data;
            });
    }

    logout() {
        // removes the user
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        // returns the user in json format
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
