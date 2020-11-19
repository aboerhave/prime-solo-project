const singleParkVisitReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_VISIT_PARK':
            return action.payload;
        default:
            return state;
    }
};


export default singleParkVisitReducer;
