// notesReducer for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains a string with notes user has previously saved

const notesReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        case 'UNSET_USER':
            return '';
        default:
            return state;
    }
};

export default notesReducer;
