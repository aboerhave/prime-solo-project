import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
    };

    registerUser = (event) => {
        event.preventDefault();

        this.props.dispatch({
        type: 'REGISTER',
        payload: {
            username: this.state.username,
            password: this.state.password,
        },
        });
    }; // end registerUser

    handleInputChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    };

    render() {
        return (
            <form className="formPanel" onSubmit={this.registerUser}>
                <h2>Register User</h2>
                {this.props.store.errors.registrationMessage && (
                    <h3 className="alert" role="alert">
                    {this.props.store.errors.registrationMessage}
                </h3>
                )}
                <div>
                    <label htmlFor="username">
                        Username:
                    </label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            required
                            onChange={this.handleInputChangeFor('username')}
                        />
                </div>
                <div>
                    <label htmlFor="password">
                        Password:
                    </label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            required
                            onChange={this.handleInputChangeFor('password')}
                        />
                </div>
                <div>
                    {/* <input className="wordButton" type="submit" name="submit" value="Register" /> */}
                    <button onClick={()=>this.registerUser} className="wordButton">Register</button>
                </div>
            </form>
        );
    }
}

export default connect(mapStoreToProps)(RegisterForm);
