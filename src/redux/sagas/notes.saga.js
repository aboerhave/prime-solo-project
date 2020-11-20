import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getNotes(action) {
    try {
        console.log('in getNotes function with parkVisitId', action.payload);
        
        const notesResponse = yield axios.get(`/api/visitNotes/${action.payload}`);
        console.log('notesResponse.data', notesResponse.data);
        yield put({type: 'SET_NOTES', payload: notesResponse.data[0].notes});
    }
    catch (error) {
        console.log('error in getNotes function', error);        
    }
}

function* saveNotes(action) {
    try {
        console.log('in saveNotes function with notes', action.payload.notes);
        console.log('in saveNotes function with parkVisitId', action.payload.visitId);
        yield axios.post(`/api/visitNotes/${action.payload.visitId}`, action.payload);
        yield put({type: 'GET_NOTES', payload: action.payload.visitId});    
    }
    catch (error){
        console.log('error in saveNotes function', error);
    }
}

function* notesSaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_NOTES', getNotes);
    yield takeEvery('SAVE_NOTES', saveNotes);
}

export default notesSaga;



