import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* addDate(action) {
    try {
        console.log('addDate action.payload', action.payload);
        // yield axios.post('/api/movie', action.payload);
    }
    catch (error) {
        console.log('error in add Date function', error);
        
    }
}

function* datesSaga() {
    console.log('in datesSaga');
    
    yield takeEvery('ADD_DATE', addDate);
}

export default datesSaga;

