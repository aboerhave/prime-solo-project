import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the parks from database
function* getParks() {
    try {
        console.log('in getParks function');
        
        const parksResponse = yield axios.get('/api/parks');
        console.log('parksResponse.data', parksResponse.data);
        yield put({type: 'SET_PARKS', payload: parksResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

function* parksSaga() {
    console.log('in parksSaga');
    
    yield takeEvery('GET_PARKS', getParks);
}

export default parksSaga;



