import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ParksPage from '../ParksPage/ParksPage';
import AttractionsPage from '../AttractionsPage/AttractionsPage';
import DateSelection from '../DateSelection/DateSelection';
import DailyLogPage from '../DailyLogPage/DailyLogPage';
import SavedVisitsPage from '../SavedVisitsPage/SavedVisitsPage';
import PreviousVisitDetailPage from '../PreviousVisitDetailPage/PreviousVisitDetailPage';

import './App.scss';

class App extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' });
     }

  render() {
        return (
            <Router>
                <Nav/>
                <main>
                    <Switch>
                        {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                        <Redirect exact from="/" to="/home" />

                            {/* Visiting localhost:3000/about will show the about page. */}
                        <ProtectedRoute 
                            exact 
                            path="/parks" 
                            component={ParksPage} 
                        />
                        <ProtectedRoute 
                            exact 
                            path='/attractions/:id' 
                            component={AttractionsPage} 
                        />
                        <ProtectedRoute 
                            exact 
                            path='/dateSelection/:id' 
                            component={DateSelection} 
                        />
                        <ProtectedRoute 
                            exact 
                            path='/dailyLog/:id' 
                            component={DailyLogPage} 
                        />
                        <ProtectedRoute 
                            exact 
                            path='/savedVisits' 
                            component={SavedVisitsPage} 
                        />
                        <Route exact path='/previousVisitDetail/:id' component={PreviousVisitDetailPage} />
                        {/* For protected routes, the view could show one of several things on the same route.
                        Visiting localhost:3000/user will show the UserPage if the user is logged in.
                        If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
                        Even though it seems like they are different pages, the user is always on localhost:3000/user */}

                        {/* When a value is supplied for the authRedirect prop the user will
                        be redirected to the path supplied when logged in, otherwise they will
                        be taken to the component and path supplied. */}
                        <ProtectedRoute
                            // with authRedirect:
                            // - if logged in, redirects to "/parks"
                            // - else shows LoginPage at /login
                            exact
                            path="/login"
                            component={LoginPage}
                            authRedirect="/parks"
                        />
                        <ProtectedRoute
                            // with authRedirect:
                            // - if logged in, redirects to "/parks"
                            // - else shows RegisterPage at "/registration"
                            exact
                            path="/registration"
                            component={RegisterPage}
                            authRedirect="/parks"
                        />
                        <ProtectedRoute
                            // with authRedirect:
                            // - if logged in, redirects to "/parks"
                            // - else shows LandingPage at "/home"
                            exact
                            path="/home"
                            component={LandingPage}
                            authRedirect="/parks"
                        />

                        {/* If none of the other routes matched, we will show a 404. */}
                        <Route render={() => <h1>404</h1>} />
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default connect()(App);
