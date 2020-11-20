import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the visits for current user
function* getVisitsForUser() {
    try {
        console.log('in getVisitsForUser function');
        
        const userVisitsResponse = yield axios.get('/api/visitPark');
        console.log('userVisitsResponse.data', userVisitsResponse.data);
        yield put({type: 'SET_USER_VISITS', payload: userVisitsResponse.data});
    }
    catch (error) {
        console.log('error in getVisitsForUser function', error);        
    }
}

function* deleteUserVisit (action) {
    console.log('in deleteUserVisit', action.payload);
    const deleteVisitResponse = yield axios.delete(`/api/visitPark/${action.payload}`);
    yield put({type: 'GET_ALL_VISITS_FOR_USER'});
}

function* userVisitsSaga() {
    console.log('in userVisitsSaga');
    
    yield takeEvery('GET_ALL_VISITS_FOR_USER', getVisitsForUser);
    yield takeEvery('DELETE_VISIT', deleteUserVisit);
}

export default userVisitsSaga;



