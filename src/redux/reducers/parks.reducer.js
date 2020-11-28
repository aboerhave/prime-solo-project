const parksReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARKS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default parksReducer;
