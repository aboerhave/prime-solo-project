// attractionsReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an array with all attractions at park selected

const attractionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTRACTIONS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default attractionsReducer;
