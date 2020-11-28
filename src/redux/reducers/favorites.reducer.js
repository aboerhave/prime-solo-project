// favoritesReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an array with attractions that are currently selected as favorites by user

const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default favoritesReducer;
