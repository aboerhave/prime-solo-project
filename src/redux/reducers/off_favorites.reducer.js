const offFavoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OFF_FAVORITES':
            return action.payload;
        default:
            return state;
    }
};


export default offFavoritesReducer;
