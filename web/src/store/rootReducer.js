import { SET_ME } from './actionTypes';

const initState = {
    signedIn: false,
    user: null
};

const rootReducer = (state = initState, action) => {
    switch (action.type){
        case SET_ME:
            return{
                ...state,
                signedIn: action.signedIn,
                user: action.user
            }
        default:
            return state
    }
}

export default rootReducer;