import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import TodoService from "../services/todo-list.service";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.handleTodo = this.handleTodo.bind(this);
        this.onChangeName = this.onChangeName.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            name: "",
            content: []
        };
    }

    componentDidMount() {
        TodoService.getTodoListContent()
            .then((res) => {
                this.setState({
                    content: res.data
                });
            }, (err) => {
                this.setState({
                    content: err.message
                });
            });
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleTodo(event) {
        event.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        TodoService.createTodoList(this.state.name)
            .then(() => {
                    this.props.history.push("/home");
                    window.location.reload();
                },
                (error) => {
                    this.setState({
                        loading: false,
                        message: error.message.toString
                    })
                })
    }

    render() {
        const { currentUser } = this.state;

        return (
          <div>
              <header>
                  <h1>
                      { currentUser.email }
                  </h1>
              </header>
              <p>
                  Id:{" "}
                  { currentUser.id }
              </p>

              <hr/>

              <p>
                  <strong>Create new Todo</strong>
              </p>

              <div>
                  <Form
                      onSubmit={this.handleTodo}
                      ref={ c => {
                          this.form = c;
                      }}
                  >
                      <div>
                          <label id="name">name</label>
                          <Input
                              type="text"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChangeName}
                          />
                      </div>

                      <div>
                          <button>
                              <span>Create</span>
                          </button>
                      </div>

                  </Form>
              </div>

              <hr/>
              <p>
                  <strong>Todos:</strong>
                  <ul>
                      {this.state.content.map(function(data, idx) {
                          return <li key={idx}>
                              <Link to={`todos/${data.id}`}>
                                  {data.name}
                              </Link>
                          </li>
                      })}
                  </ul>
              </p>
          </div>
        );
    }
}