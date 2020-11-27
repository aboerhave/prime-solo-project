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
