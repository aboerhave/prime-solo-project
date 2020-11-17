const parksReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARKS':
            return action.payload;
        default:
            return state;
    }
};


export default parksReducer;
