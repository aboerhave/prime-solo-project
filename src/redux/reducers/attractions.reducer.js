const attractionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTRACTIONS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default attractionsReducer;
