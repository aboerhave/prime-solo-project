// singleParkVisitReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an array with all user visits that have been saved

const userVisitsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_VISITS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default userVisitsReducer;
