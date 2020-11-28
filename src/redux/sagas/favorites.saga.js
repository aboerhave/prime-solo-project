import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the favorites selected by user
function* getFavorites() {
    try {
        console.log('in getFavoritess function');
        
        const favoritesResponse = yield axios.get(`/api/favorites/on`);
        console.log('favoritesResponse.data', favoritesResponse.data);
        // send to favorites reducer
        yield put({type: 'SET_FAVORITES', payload: favoritesResponse.data});
    }
    catch (error) {
        console.log('error in getFavorites function', error);        
    }
}

// function to get all the previously favorites for the user that are now turned off
function* getOffFavorites() {
    try {
        console.log('in getOffFavorites function');
        const offFavoritesResponse = yield axios.get('api/favorites/off');
        console.log('offFavoritesResponse.data', offFavoritesResponse.data);
        // send to offFavorites reducer
        yield put({type: 'SET_OFF_FAVORITES', payload: offFavoritesResponse.data});
    }
    catch (error) {
        console.log('error in getOffFavorites function', error);
    }
}

// function to toggle a favorite.  This happens only if it has previously been turned on,
// otherwise it would need to be posted
function* toggleFavorite(action) {
    try {
        console.log('in toggleFavorite function with attractionId', action.payload);
        yield axios.put(`/api/favorites/${action.payload}`);
        // reset the favorites and offFavorites reducers to be current
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
        // reset the favorites and offFavorites reducers to be current
        yield put({type: 'GET_FAVORITES'});
        yield put({type: 'GET_OFF_FAVORITES'});
    }
    catch (error) {
        console.log('error in set favorite function', error);
    }
}

// watcher for favorites actions
function* favoritesSaga() {
    console.log('in favoritesSaga');
    
    yield takeEvery('GET_FAVORITES', getFavorites);
    yield takeEvery('GET_OFF_FAVORITES', getOffFavorites);
    yield takeEvery('TOGGLE_FAVORITE', toggleFavorite);
    yield takeEvery('SET_ATTRACTION_AS_FAVORITE', setAsFavorite);
}

export default favoritesSaga;



