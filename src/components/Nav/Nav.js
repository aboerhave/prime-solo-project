import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
    let loginLinkData = {
        path: '/login',
        text: 'Login / Register',
    };

    if (props.store.user.id != null) {
        loginLinkData.path = '/parks';
        loginLinkData.text = 'Home';
    }

    return (
        <div className="nav">
    
            <div className="heading">
                <Link to="/parks">
                    <h2 className="nav-title">Parks and Coasters</h2>
                </Link>
            </div>
    
            <div>
                <Link className="nav-link top-left" to="/parks">
                    Home
                </Link>
                {/* Show the link to the info page and the logout button if the user is logged in */}
                    {props.store.user.id && (
                    <LogOutButton className="nav-link top-right" />
                )}
            </div>
            {/* This one is for the main name in the middle */}
  


            <div className="nav-right">
                <Link className="nav-link" to={loginLinkData.path}>
                    {/* Show this link if they are logged in or not,
                    but call this link 'Home' if they are logged in,
                    and call this link 'Login / Register' if they are not */}
                    {loginLinkData.text}
                </Link>

            </div>
        </div>
    );
};

export default connect(mapStoreToProps)(Nav);
