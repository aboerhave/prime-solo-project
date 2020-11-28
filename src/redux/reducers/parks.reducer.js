// parksReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an array with parks in the database

const parksReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARKS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default parksReducer;
