import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import parks from './parks.reducer';
import singlePark from './single_park.reducer';
import attractions from './attractions.reducer';
import favorites from './favorites.reducer';
import offFavorites from './off_favorites.reducer';
import singleVisit from './single_visit.reducer';
import singleParkVisit from './single_park_visit.reducer';
import visitAttractions from './visit_attractions.reducer';
import attractionsQuantity from './attractions_quantity.reducer';
import userVisits from './user_visits.reducer';
import notes from './notes.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
     errors, // contains registrationMessage and loginMessage
    user, // will have an id and username if someone is logged in
    parks,
    singlePark,
    attractions,
    favorites,
    offFavorites,
    singleVisit,
    singleParkVisit,
    visitAttractions,
    attractionsQuantity,
    userVisits,
    notes,
});

export default rootReducer;
