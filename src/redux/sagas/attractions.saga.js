import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getAttractions(action) {
    try {
        console.log('in getAttractions function with parkId', action.payload);
        
        const attractionsResponse = yield axios.get(`/api/attractions/${action.payload}`);
        console.log('attractionsResponse.data', attractionsResponse.data);
        yield put({type: 'SET_ATTRACTIONS', payload: attractionsResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

function* attractionsSaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_ATTRACTIONS', getAttractions);
}

export default attractionsSaga;



