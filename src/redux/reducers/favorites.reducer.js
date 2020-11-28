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
