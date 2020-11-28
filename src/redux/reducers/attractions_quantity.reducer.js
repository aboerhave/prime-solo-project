const attractionsQuantityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTRACTIONS_QUANTITY':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};


export default attractionsQuantityReducer;
