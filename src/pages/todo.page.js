import React from 'react';
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import AuthService from "../services/auth.service";
import TodoService from "../services/todo-list.service";
import TodoItemService from "../services/todo-item.service"

let TODOID;

export default class TodoPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.onChangeTodo = this.onChangeTodo.bind(this);

        TODOID = props.match.params.id;

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            content: {},
            items: [],
            error: "",
            todo: ""
        };
    }

    componentDidMount() {
        TodoService.getSingleTodoListContent(TODOID)
            .then((res) => {
                this.setState({
                    content: res.data,
                    items: res.data.todoListItems,
                });
            }, (err) => {
                this.setState({
                    content: err.message.toString
                });
            });
    }

    onChangeTodo(event) {
        this.setState({
            todo: event.target.value,
        })
    }

    handleDelete(event) {
        event.preventDefault();

        TodoService.deleteTodoList(TODOID)
            .then(() => {
                this.props.history.push("/home");
                window.location.reload();
            },
            (err) => {
                this.setState({
                    error: err.message.toString
                })
            })
    }

    handleAddItem(event) {
        event.preventDefault();

        TodoItemService.createTodoListItem(TODOID, this.state.todo)
            .then(() => {
                this.props.history.push(`/todos/${TODOID}`);
                window.location.reload();
            },
            (err) => {
                this.setState({
                    error: err.message.toString
                })
            })
    }

    render() {
        console.log(this.state.content);

        const data = this.state.content;

        return (
            <div>
                <header>
                    <h1>
                        Todo:{" "}
                        {data.name}
                    </h1>
                    <p>
                        <strong>ID:</strong>{" "}
                        {data.id}
                    </p>
                    <p>
                        <strong> Created on:</strong>{" "}
                        {data.createdAt}
                    </p>
                    <p>
                        <strong>number of items:</strong>{" "}
                        {this.state.items.length}
                    </p>
                    <div>
                        <Form
                            onSubmit={this.handleDelete}
                            ref={ c => {
                                this.form = c;
                            }}>
                            <button>
                                <span>Delete</span>
                            </button>
                        </Form>
                    </div>
                </header>
                <hr/>
                <div>
                    <Form
                        onSubmit={this.handleAddItem}
                        ref={ x => {
                            this.form = x;
                        }}>

                        <div>
                            <label id="item">Add Item</label>
                            <Input
                                type="text"
                                name="item"
                                value={this.state.todo}
                                onChange={this.onChangeTodo}
                            />
                        </div>

                        <button>
                            <span>add</span>
                        </button>
                    </Form>
                </div>
                <hr/>
                <p>
                    <h3>Items</h3>
                    <ul>
                        {this.state.items.map(function(item, idx) {
                            return <li key={idx}>
                                <Link to={`/todos/${TODOID}/item/${item.id}`}>
                                    TODO: {item.todo}
                                </Link>
                                {" | "}DONE: {item.done? "yes" : "no"}
                            </li>
                        })}
                    </ul>
                </p>
            </div>
        );
    }
}