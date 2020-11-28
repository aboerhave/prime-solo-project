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
