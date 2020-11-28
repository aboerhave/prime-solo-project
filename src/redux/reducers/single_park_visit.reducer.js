// singleParkVisitReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an object with details about selected visit

const singleParkVisitReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_VISIT_PARK':
            return action.payload;
        case 'UNSET_USER':
            return {};
        default:
            return state;
    }
};

export default singleParkVisitReducer;
