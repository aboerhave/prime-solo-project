const visitAttractionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VISIT_ATTRACTIONS':
            return action.payload;
        default:
            return state;
    }
};


export default visitAttractionsReducer;
