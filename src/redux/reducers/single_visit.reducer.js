// singleVisitReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an object with details about selected visit

const singleVisitReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_VISIT':
            return action.payload;
        case 'UNSET_USER':
            return {};
        default:
            return state;
    }
};

export default singleVisitReducer;
