const userVisitsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_VISITS':
            return action.payload;
        case 'UNSET_USER':
            return [];
        default:
            return state;
    }
};

export default userVisitsReducer;
