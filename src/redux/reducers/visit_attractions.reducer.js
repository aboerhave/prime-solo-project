const visitAttractionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VISIT_ATTRACTIONS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};


export default visitAttractionsReducer;
