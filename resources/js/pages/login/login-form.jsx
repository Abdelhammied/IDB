import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { CircularProgress } from '@material-ui/core';
import { DoneRounded } from '@material-ui/icons'

import Axios from 'axios';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: {
                value: '',
                errors: ''
            },
            password: {
                value: '',
                errors: ''
            },
            remember: {
                value: false,
                errors: ''
            },

            loggedIn: false,
            loading: false
        }
    }

    enableLoading() {
        this.setState({
            loading: true
        })
    }

    disableLoading() {
        this.setState({
            loading: false
        })
    }

    handleInput(event, input) {
        let value = event.target.value;

        if (input == 'remember') {
            value = !this.state.remember;
        }

        this.setState({
            [input]: {
                value,
                errors: this.state[input].errors
            }
        })
    }

    validateInputsBeforeSubmit() {
        if (this.state.email.value == '') {
            this.state.email.errors = "Email Field is Required."
        }

        if (this.state.password.value == '') {
            this.state.password.errors = "Password Field is Required."
        }

        if (this.state.password.value == '' || this.state.email.value.length == '') {
            return false;
        }

        return true;
    }

    resetStateErrors(state) {
        this.setState({
            [state]: {
                value: this.state[state].value,
                errors: ""
            }
        })
    }

    submitLoginForm(e) {
        e.preventDefault();

        this.enableLoading()

        if (!this.validateInputsBeforeSubmit()) {
            this.disableLoading();

            return;
        };

        this.resetStateErrors('email')

        this.resetStateErrors('password')

        Axios.post("/api/login", {
            email: this.state.email.value,
            password: this.state.password.value,
            remember: this.state.remember.value
        }).then(response => {
            if (response.status == 200) {
                this.resetStateErrors('email');

                this.resetStateErrors('password');

                this.setState({
                    loggedIn: true
                })

                window.location.replace(response.data.route)
            }
        }).catch(({ response }) => {

            if (response.status == 422) {
                let { errors } = response.data;

                this.disableLoading()

                for (const error in errors) {
                    if (this.state.hasOwnProperty(error)) {
                        this.setState({
                            [error]: {
                                value: this.state[error].value,
                                errors: errors[error][0]
                            }
                        })
                    }
                }
            }
        })

    }

    render() {
        const checkboxStyle = {
            position: 'relative',
            marginLeft: '0px',
            top: '2px'
        }

        let submitButtonContent = this.state.loading ? <CircularProgress color="inherit" size={20} /> : 'Sign In'

        if (this.state.loggedIn) {
            submitButtonContent = <DoneRounded />;
        }

        return (
            <form onSubmit={this.submitLoginForm.bind(this)}>
                <div
                    className={`${this.state.email.errors !== '' ? 'has-error' : ''} form-group has-feedback`}>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        disabled={this.state.loading}
                        onChange={(event) => { this.handleInput(event, 'email') }} />
                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    <p className="text-danger">
                        {this.state.email.errors !== undefined ? this.state.email.errors : null}
                    </p>
                </div>
                <div className={`${this.state.password.errors !== '' ? 'has-error' : ''} form-group has-feedback`}>
                    <input
                        type="password"
                        className="form-control"
                        disabled={this.state.loading}
                        placeholder="Password"
                        onChange={(event) => { this.handleInput(event, 'password') }} />
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    <p className="text-danger">
                        {this.state.password.errors !== undefined ? this.state.password.errors : null}
                    </p>
                </div>
                <div className="form-group row">
                    <div className="col-xs-8">
                        <div className="checkbox icheck">
                            <label>
                                <input
                                    type="checkbox"
                                    disabled={this.state.loading}
                                    style={checkboxStyle}
                                    onChange={(event) => this.handleInput(event, 'remember')} /> Remember Me
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button type="button"
                            onClick={this.submitLoginForm.bind(this)}
                            className={`btn btn-primary btn-block btn-flat ${this.state.loggedIn ? 'btn-success' : ''}`}
                            disabled={this.state.loading}>
                            {submitButtonContent}
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}


if (document.getElementById("login-form")) {
    ReactDOM.render(<LoginForm />, document.getElementById("login-form"))
}