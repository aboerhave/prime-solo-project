// notes saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains all sagas for getting and saving notes to/from database

import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getNotes(action) {
    try {
        console.log('in getNotes function with parkVisitId', action.payload);
        const notesResponse = yield axios.get(`/api/visitNotes/${action.payload}`);
        console.log('notesResponse.data', notesResponse.data);
        // send notes to notes reducer
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
        // send notes to getNotes function which sends them to notes reducer
        yield put({type: 'GET_NOTES', payload: action.payload.visitId});    
        // give user feedback that the notes were successfully saved
        alert('Notes have been saved.')
    }
    catch (error){
        console.log('error in saveNotes function', error);
    }
}

// saga to watch for actions related to notes
function* notesSaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_NOTES', getNotes);
    yield takeEvery('SAVE_NOTES', saveNotes);
}

export default notesSaga;



