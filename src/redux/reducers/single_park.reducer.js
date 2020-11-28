// singleParkReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an object with details about the single park selected by user

const singleParkReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_PARK':
            return action.payload;
        case 'UNSET_USER':
            return {};
        default:
            return state;
    }
};

export default singleParkReducer;
