import React from 'react';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import AuthService from '../services/auth.service';

import { isEmail } from 'validator';

const required = value => {
    if (!value) {
        return (
            <div>
                This field is required!
            </div>
        )
    }
}

const email = value => {
    if (!isEmail(value)) {
        return (
            <div>
                Not a valid email.
            </div>
        )
    }
}

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        }
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin(event) {
        event.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        AuthService.login(this.state.email, this.state.password)
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
        return (
            <Form
                onSubmit={this.handleLogin}
                ref={ c => {
                    this.form = c;
                }}
            >
                <div>
                    <label id="email">Email</label>
                    <Input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                    />
                </div>

                <div>
                    <label id="password">Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]}
                    />
                </div>

                <div>
                    <button>
                        <span>Login</span>
                    </button>
                </div>

            </Form>
        )
    }
}

