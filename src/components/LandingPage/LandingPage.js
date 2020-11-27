import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

class LandingPage extends Component {

    onLogin = (event) => {
        this.props.history.push('/registration');
    };

    render() {
        return (
            <div className="center">
                <LoginForm />

                <h4>New User? Register Here:</h4>
                <button className="wordButton" onClick={this.onLogin}>
                    Register
                </button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LandingPage);
