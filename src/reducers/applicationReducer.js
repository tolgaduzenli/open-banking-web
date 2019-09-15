import {
    LOAD_APPLICATIONS,
    LOAD_APPLICATIONS_SUCCESS,
    LOAD_APPLICATIONS_FAILURE,
    CHANGE_APPLICATION,
    CHANGE_APPLICATION_SUCCESS,
    CHANGE_APPLICATION_FAILURE,
} from '../actions/types'

const initialState = {
    applications: null,
    loading: false,
    error: false,
    errorMessage: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOAD_APPLICATIONS:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        case LOAD_APPLICATIONS_SUCCESS:
            return {
                ...state,
                applications: action.data,
                loading: false,
                error: false,
                errorMessage: null,
            }
        case LOAD_APPLICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.error,
            }
        case CHANGE_APPLICATION:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        case CHANGE_APPLICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                errorMessage: null,
            }
        case CHANGE_APPLICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.error,
            }
        default:
            return state
    }
}
