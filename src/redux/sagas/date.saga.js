import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addDate(action) {
    try {
        console.log('addDate action.payload', action.payload);
        
        const dateResponse = yield axios.post('/api/dates',  action.payload);
        let dateId = dateResponse.data[0].id;
        console.log('dateId', dateId);
        
        let locationToGoTo = action.location + `/${dateId}`;
        
        yield put({type: 'SET_SINGLE_VISIT', payload: dateId});
        yield action.history.push(locationToGoTo)
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

