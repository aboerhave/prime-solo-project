import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import parksSaga from './parks.saga';
import singleParkSaga from './single_park.saga';
import attractionsSaga from './attractions.saga';
import favoritesSaga from './favorites.saga';
import dateSaga from './date.saga';
import visitAttractionsSaga from './visit_attractions.saga';
import attractionsQuantitySaga from './attractions_quantity.saga';
import userVisitsSaga from './user_visits.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
    yield all([
        loginSaga(), // login saga is now registered
        registrationSaga(),
        userSaga(),
        parksSaga(),
        singleParkSaga(),
        attractionsSaga(),
        favoritesSaga(),
        dateSaga(),
        visitAttractionsSaga(),
        attractionsQuantitySaga(),
        userVisitsSaga(),
        
    ]);
}
