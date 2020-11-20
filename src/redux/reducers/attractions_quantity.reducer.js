const attractionsQuantityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTRACTIONS_QUANTITY':
            return action.payload;
        default:
            return state;
    }
};


export default attractionsQuantityReducer;
