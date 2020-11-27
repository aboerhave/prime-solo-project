import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {

    onLogin = (event) => {
        this.props.history.push('/login');
    };

    render() {
        return (
            <div className="container center">
                <RegisterForm />

                <h4>Already a Member?</h4>
                <button className="wordButton" onClick={this.onLogin}>
                    Login
                </button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LandingPage);
