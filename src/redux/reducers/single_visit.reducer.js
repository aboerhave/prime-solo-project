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
