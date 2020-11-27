import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <div className="center">
                <LoginForm />

                <center>
                    <button
                        type="button"
                        className="wordButton"
                        onClick={() => {
                            this.props.history.push('/registration');
                        }}
                    >
                    Register
                    </button>
                </center>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LoginPage);
