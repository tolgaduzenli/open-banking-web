import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types'

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
}

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future requests
    setAuthToken(false)
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/register`, userData)
        .then(() => history.push('/login')) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        )
}

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post(`${process.env.REACT_APP_API_URL  }/api/user/login`, userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            // Set token to Auth header
            setAuthToken(token)
            // Decode token to get user data
            const decoded = jwtDecode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        )
}
