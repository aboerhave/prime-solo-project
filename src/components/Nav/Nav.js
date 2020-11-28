import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.scss';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {useHistory} from 'react-router-dom';


const Nav = (props) => {

    const history = useHistory();

    let navClass = 'navOn';
    if (props.store.user.id == null) {
        navClass = "navOff"
    }

    return (
        <div className={navClass}>
            {/* This one is for the main name in the middle */}
            <div className="center">
                <Link to="/parks">
                    <h2 className="nav-title">Parks & Coasters</h2>
                </Link>
            </div>

            {/* ROW OF LINKS should show up if user is logged in */}
            {props.store.user.id &&
                <div>
                    <button className="nav-link" 
                        onClick={()=>history.goBack()}
                    >
                        Back
                    </button>

                    <Link className="nav-link" to="/parks">
                        Home
                    </Link>

                    <Link className="nav-link" to="/savedVisits">
                        Saved Visits
                    </Link>
                    
                    {/* Show the logout button if the user is logged in */}
                    <LogOutButton className="nav-link" history={history}/>

                </div>
            }
        </div>
    );
}

export default connect(mapStoreToProps)(Nav);
