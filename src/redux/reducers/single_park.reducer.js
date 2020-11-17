const singleParkReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_PARK':
            return action.payload;
        default:
            return state;
    }
};


export default singleParkReducer;
