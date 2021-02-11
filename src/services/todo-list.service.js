import axios from 'axios';
import authHeader from "./auth-headers";

import AuthService from './auth.service'

const BASE_URL = `http://localhost:9000/api/user/`;

class TodoListService {
    getTodoListContent() {
        let USERID = AuthService.getCurrentUser().id;
        return axios.get(
            BASE_URL + `${USERID}/todos`,
            { headers: authHeader() }
        );
    }

    getSingleTodoListContent(todoId) {
        let USERID = AuthService.getCurrentUser().id;
        return axios.get(
            BASE_URL + `${USERID}/todos/${todoId}`,
            { headers: authHeader() }
        );
    }

    createTodoList(name) {
        let USERID = AuthService.getCurrentUser().id;
        return axios.post(
            BASE_URL + `${USERID}/todos/create`,
            { name },
            { headers: authHeader() }
        ).then((res) => {
            return res.data;
        });
    }

    deleteTodoList(todoId) {
        let USERID = AuthService.getCurrentUser().id;
        return axios.delete(
            BASE_URL + `${USERID}/todos/${todoId}/delete`,
            { headers: authHeader() }
        ).then((res) => {
            return res.data;
        });
    }
}

export default new TodoListService();