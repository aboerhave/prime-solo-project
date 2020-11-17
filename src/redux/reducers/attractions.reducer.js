const attractionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTRACTIONS':
            return action.payload;
        default:
            return state;
    }
};


export default attractionsReducer;
