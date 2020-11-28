// attractionsQuantityReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an array with attractions and times_ridden for attractions for 
// selected park visit for user

const attractionsQuantityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTRACTIONS_QUANTITY':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};


export default attractionsQuantityReducer;
