import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getFavorites() {
    try {
        console.log('in getFavoritess function');
        
        const favoritesResponse = yield axios.get(`/api/favorites/`);
        console.log('favoritesResponse.data', favoritesResponse.data);
        yield put({type: 'SET_FAVORITES', payload: favoritesResponse.data});
    }
    catch (error) {
        console.log('error in getFavorites function', error);        
    }
}

function* favoritesSaga() {
    console.log('in favoritesSaga');
    
    yield takeEvery('GET_FAVORITES', getFavorites);
}

export default favoritesSaga;



