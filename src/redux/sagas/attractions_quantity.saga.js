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

function* attractionsQuantitySaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_ATTRACTIONS_QUANTITY', getAttractionsQuantity);
}

export default attractionsQuantitySaga;



