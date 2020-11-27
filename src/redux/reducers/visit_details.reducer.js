const visitDetailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VISIT_DETAILS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};


export default visitDetailsReducer;
