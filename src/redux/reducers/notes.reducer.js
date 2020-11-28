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
