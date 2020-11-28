// visitAttractionsReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an array with attractions at park selected

const visitAttractionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VISIT_ATTRACTIONS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};


export default visitAttractionsReducer;
