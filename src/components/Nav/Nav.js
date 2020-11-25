import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.scss';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {useHistory} from 'react-router-dom';


const Nav = (props) => {
    let loginLinkData = {
        path: '/login',
        text: 'Login / Register',
    };

    if (props.store.user.id != null) {
        loginLinkData.path = '/parks';
        loginLinkData.text = 'Home';
    }

    const history = useHistory();

    return (

        <div className="nav">
            {/* This one is for the main name in the middle */}
            <div className="heading">
                <Link to="/parks">
                    <h2 className="nav-title">Parks & Coasters</h2>
                </Link>
            </div>
    
            <Link className="nav-link top-left" to="/parks">
                Home
            </Link>
            {/* Show the logout button if the user is logged in */}
            {props.store.user.id ? 
                <LogOutButton className="nav-link top-right" />
            :
                <Link className="nav-link top-right" to="/login" >
                    Login / Register
                </Link>
            }
            
            <button className="nav-link bottom-left" 
                onClick={()=>history.goBack()}
            >
                Back
            </button>
            <Link className="nav-link bottom-right" to="/savedVisits">
                Saved Visits
            </Link>
        </div>
    );
}

export default connect(mapStoreToProps)(Nav);
