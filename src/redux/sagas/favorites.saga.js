import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the favorites selected by user
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

// function to toggle a favorite
function* toggleFavorite(action) {
    try {
        console.log('in toggleFavorite function with attractionId', action.payload);
        yield axios.put(`/api/favorites/${action.payload}`);
    }
    catch (error) {
        console.log('error in removeFavorite function', error);        
    }
}

function* favoritesSaga() {
    console.log('in favoritesSaga');
    
    yield takeEvery('GET_FAVORITES', getFavorites);
    yield takeEvery('TOGGLE_FAVORITE', toggleFavorite);
}

export default favoritesSaga;



