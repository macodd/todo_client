import axios from 'axios';
import authHeader from "./auth-headers";

import AuthService from './auth.service'

const BASE_URL = `http://localhost:9000/api/user/`;

class TodoItemService {

    getSingleTodoItem(todoId, itemId) {
        let USERID = AuthService.getCurrentUser().id;
        return axios.get(
            BASE_URL + `${USERID}/todos/${todoId}/item/${itemId}`,
            { headers: authHeader() }
        );
    }

    createTodoListItem(todoId, todo) {
        let USERID = AuthService.getCurrentUser().id;
        let done = false;
        return axios.post(
            BASE_URL + `${USERID}/todos/${todoId}/create`,
            { todo, done },
            { headers: authHeader() }
        ).then((res) => {
            return res.data;
        });
    }

    deleteTodoListItem(todoId, itemId) {
        let USERID = AuthService.getCurrentUser().id;
        return axios.delete(
            BASE_URL + `${USERID}/todos/${todoId}/item/${itemId}/delete`,
            { headers: authHeader() }
        ).then((res) => {
            return res.data;
        });
    }

    updateTodoListItem(todoId, itemId, isDone) {
        let USERID = AuthService.getCurrentUser().id;
        let done = !isDone;
        return axios.put(
            BASE_URL + `${USERID}/todos/${todoId}/item/${itemId}/update`,
            { done },
            { headers: authHeader() }
        ).then((res) => {
            return res.data;
        });
    }
}

export default new TodoItemService();