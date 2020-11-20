import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {push} from 'react-router-redux';

function* addDate(action) {
    try {
        console.log('addDate action.payload', action.payload);
        const dateResponse = yield axios.post('/api/dates',  action.payload);
        let dateId = dateResponse.data[0];
        
        console.log('dateResponse', dateId);
        yield put({type: 'SET_SINGLE_VISIT', payload: dateId});
        // yield put(push('/parks'));
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

