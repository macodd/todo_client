import axios from 'axios';
import authHeader from "./auth-headers";

const BASE_URL = "http://localhost:9000/api/";

class UserService {
    getPublicContent() {
        return axios.get(BASE_URL + "all");
    }

    getUserContent() {
        return axios.get(BASE_URL + "user", {
            headers: authHeader(),
        });
    }
}

export default new UserService();