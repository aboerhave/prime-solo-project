import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the favorites selected by user
function* getFavorites() {
    try {
        console.log('in getFavoritess function');
        
        const favoritesResponse = yield axios.get(`/api/favorites/on`);
        console.log('favoritesResponse.data', favoritesResponse.data);

        yield put({type: 'SET_FAVORITES', payload: favoritesResponse.data});
    }
    catch (error) {
        console.log('error in getFavorites function', error);        
    }
}

function* getOffFavorites() {
    try {
        console.log('in getOffFavorites function');
        const offFavoritesResponse = yield axios.get('api/favorites/off');
        console.log('offFavoritesResponse.data', offFavoritesResponse.data);
        yield put({type: 'SET_OFF_FAVORITES', payload: offFavoritesResponse.data});
    }
    catch (error) {
        console.log('error in getOffFavorites function');
        
    }
}

// function to toggle a favorite
function* toggleFavorite(action) {
    try {
        console.log('in toggleFavorite function with attractionId', action.payload);
        yield axios.put(`/api/favorites/${action.payload}`);
        // try to get new list off on and off favorites here
        yield put({type: 'GET_FAVORITES'});
        yield put({type: 'GET_OFF_FAVORITES'});
    }
    catch (error) {
        console.log('error in removeFavorite function', error);        
    }
}

// function to set a new favorite for a user
function* setAsFavorite(action) {
    try {
        console.log('in setAsFavorite function with attractionId', action.payload);
        yield axios.post(`/api/favorites/${action.payload}`);
        yield put({type: 'GET_FAVORITES'});
        yield put({type: 'GET_OFF_FAVORITES'});
    }
    catch (error) {
        console.log('error in set favorite function', error);
    }
}

function* favoritesSaga() {
    console.log('in favoritesSaga');
    
    yield takeEvery('GET_FAVORITES', getFavorites);
    yield takeEvery('GET_OFF_FAVORITES', getOffFavorites);
    yield takeEvery('TOGGLE_FAVORITE', toggleFavorite);
    yield takeEvery('SET_ATTRACTION_AS_FAVORITE', setAsFavorite);
}

export default favoritesSaga;



