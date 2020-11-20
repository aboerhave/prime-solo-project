const userVisitsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_VISITS':
            return action.payload;
        default:
            return state;
    }
};


export default userVisitsReducer;
