// user_visits saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains all sagas related to getting, completing, and deleting user visits

import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the visits for current user
function* getVisitsForUser() {
    try {
        console.log('in getVisitsForUser function');
        const userVisitsResponse = yield axios.get('/api/visitPark');
        console.log('userVisitsResponse.data', userVisitsResponse.data);
        // save all user visits from the database to the user visits reducers
        yield put({type: 'SET_USER_VISITS', payload: userVisitsResponse.data});
    }
    catch (error) {
        console.log('error in getVisitsForUser function', error);        
    }
}

// function to delete an entire visit from the database
function* deleteUserVisit (action) {
    console.log('in deleteUserVisit', action.payload);
    const deleteVisitResponse = yield axios.delete(`/api/visitPark/${action.payload}`);
    console.log('deleteVisitResponse', deleteVisitResponse);
    // get all the visits for the user again after the visit has been deleted
    yield put({type: 'GET_ALL_VISITS_FOR_USER', payload: deleteVisitResponse.data[0].user_id});
}

// function to toggle the visit_complete state to false.  It only goes to true, and does
// not go back to false.
function* completeVisit (action) {
    console.log('in completeVisit function', action.payload);
    yield axios.put(`api/visitPark/${action.payload}`);
    // update the visite details to include the new complete status
    yield put({type: 'GET_VISIT_PARK', payload: action.payload});
    let locationToGoTo = action.location + `/${action.payload}`;
    // advance user from dailyLog page to the PreviousVisitDetailsPage
    yield action.history.push(locationToGoTo);
}

// watcher saga to watch for any actions related to user visits
function* userVisitsSaga() {
    console.log('in userVisitsSaga');
    
    yield takeEvery('GET_ALL_VISITS_FOR_USER', getVisitsForUser);
    yield takeEvery('DELETE_VISIT', deleteUserVisit);
    yield takeEvery('VISIT_COMPLETE', completeVisit);
}

export default userVisitsSaga;



