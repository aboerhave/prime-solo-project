import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getAttractionsQuantity(action) {
    try {
        console.log('in getAttractionsQuantity function with parkVisitId', action.payload);
        
        const attractionsQuantityResponse = yield axios.get(`/api/attractionsQuantity/${action.payload}`);
        console.log('attractionsQuantityResponse.data', attractionsQuantityResponse.data);
        yield put({type: 'SET_ATTRACTIONS_QUANTITY', payload: attractionsQuantityResponse.data});
    }
    catch (error) {
        console.log('error in getAttractionsQuantity function', error);        
    }
}

function* createOneAttractionQuantity(action) {
    try {
        console.log('in createOneAttractionQuantity', action.payload);
        const attractionsQuantityResponse = yield axios.post(`/api/attractionsQuantity`, action.payload);
        console.log('parkVisitId', attractionsQuantityResponse.data.park_visit_id);
        
        yield put({type: 'GET_ATTRACTIONS_QUANTITY', payload: attractionsQuantityResponse.data.park_visit_id});
    }
    catch (error) {
        console.log('error in createOneAttractionQuantiy', error);
        
    }
}

function* addAttractionQuantity(action) {
    console.log('in addAttractionQuantity', action);
    const addAttractionQuantityResponse = yield axios.put(`/api/attractionsQuantity`, action.payload);
    console.log('parkVisitId', addAttractionQuantityResponse.data.park_visit_id);
    yield put({type: 'GET_ATTRACTIONS_QUANTITY', payload: addAttractionQuantityResponse.data.park_visit_id});
}

function* attractionsQuantitySaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_ATTRACTIONS_QUANTITY', getAttractionsQuantity);
    yield takeEvery('POST_ONE_RIDE', createOneAttractionQuantity);
    yield takeEvery('ADD_ONE_RIDE', addAttractionQuantity);
}

export default attractionsQuantitySaga;



