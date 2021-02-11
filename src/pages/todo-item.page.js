import React from 'react';
import Form from "react-validation/build/form";
import { Link } from 'react-router-dom';

import TodoItemService from "../services/todo-item.service"

let TODOID;
let ITEMID;

export default class TodoItemPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        TODOID = props.match.params.todoId;
        ITEMID = props.match.params.id;

        this.state = {
            todoId: "",
            itemId: "",
            content: "",
            done: false
        }
    }

    componentDidMount() {
        TodoItemService.getSingleTodoItem(TODOID, ITEMID)
            .then((res) => {
                this.setState({
                    todoId: res.data.todoListId,
                    itemId: res.data.id,
                    content: res.data.todo,
                    done: res.data.done
                })
            },
            (err) => {
                this.setState({
                    content: err.message.toString
                })
            })
    }

    handleDelete(event) {
        event.preventDefault();

        TodoItemService.deleteTodoListItem(TODOID, ITEMID)
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

    handleUpdate(event) {
        event.preventDefault();

        console.log(this.state.done);
        const isDone = this.state.done;

        TodoItemService.updateTodoListItem(TODOID, ITEMID, isDone)
            .then(() => {
                window.location.reload();
            },
            (err) => {
                this.setState({
                    error: err.message.toString
                })
            });
    }

    render() {
        return (
            <div>
                <header>
                    <Link to={`/todos/${TODOID}`}>
                        Back
                    </Link>
                    <h1>
                        {this.state.content}
                    </h1>
                </header>

                <p>
                  List Id:{" "}
                  {this.state.todoId}
                </p>
                <p>
                  Item Id:{" "}
                  {this.state.itemId}
                </p>
                <p>
                  Done?{" "}
                  {this.state.done? "Yes" : "No"}
                </p>
                <div>
                    <Form
                        onSubmit={this.handleUpdate}
                        ref={ u => {
                            this.form = u;
                        }}>
                        <button>
                            <span>Mark as {this.state.done? "Incomplete" : "Complete"}</span>
                        </button>
                    </Form>
                </div>
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
          </div>
        );
    }
}