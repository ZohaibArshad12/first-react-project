import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const onFetchUsers = () => {
    return dispatch => {
        dispatch({ type: actionTypes.LOADING_USERS_FROM_API, loading: true });

        axios.get('users').then(response => {

            // console.log('Get Users Response ', response);
            if (response.status === 200) {
                dispatch({ type: actionTypes.LOADED_USERS_FROM_API, users: response.data });
            } else {
                alert(`Getting Users Error, Status Code: ${response.status} , Status Text : ${response.statusText}`)
            }
        }).catch(err => {
            console.log('Error Getting Users : ', err);
        })
    }
}
