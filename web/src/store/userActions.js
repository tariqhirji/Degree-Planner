import { SET_ME } from './actionTypes';

export const setUser = (user) => {
    return (dispatch) => {
        const signedIn = (user) ? true: false;

        dispatch({
            type: SET_ME,
            signedIn,
            user
        });
    }
}