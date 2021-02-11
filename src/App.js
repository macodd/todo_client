import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import LoginPage from "./pages/login.page";
import HomePage from "./pages/home.page";
import TodoPage from "./pages/todo.page";
import TodoItemPage from "./pages/todo-item.page";


class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={["/","/login"]} component={LoginPage} />
                        <Route path="/home" component={HomePage} />
                        <Route path="/todos/:todoId/item/:id" component={TodoItemPage} />
                        <Route path="/todos/:id" component={TodoPage} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
