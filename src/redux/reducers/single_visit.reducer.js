const singleVisitReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_VISIT':
            return action.payload;
        default:
            return state;
    }
};


export default singleVisitReducer;
