// offFavoritesReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an array with attractions that were previously saved as favorites
// by user, and are currently turned off and favorite_status is false

const offFavoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OFF_FAVORITES':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default offFavoritesReducer;
