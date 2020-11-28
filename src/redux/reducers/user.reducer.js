// userReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains an object with user id and username

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'UNSET_USER':
            return {};
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default userReducer;
