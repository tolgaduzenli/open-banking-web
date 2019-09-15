import {
    LOAD_APPLICATIONS,
    LOAD_APPLICATIONS_SUCCESS,
    LOAD_APPLICATIONS_FAILURE,
    CHANGE_APPLICATION,
    CHANGE_APPLICATION_SUCCESS,
    CHANGE_APPLICATION_FAILURE,
} from './types'
import {
    loadApplicationsAPICall,
    createApplicationAPICall,
    updateApplicationAPICall,
    deleteApplicationAPICall,
    updateApplicationStatusAPICall,
} from '../utils/APICall'

const loadApplications = () => {
    return { type: LOAD_APPLICATIONS }
}
const loadApplicationsSuccess = data => {
    return { type: LOAD_APPLICATIONS_SUCCESS, data }
}
const loadApplicationsFailure = error => {
    return { type: LOAD_APPLICATIONS_FAILURE, error }
}

const changeApplication = () => {
    return { type: CHANGE_APPLICATION }
}
const changeApplicationSuccess = () => {
    return { type: CHANGE_APPLICATION_SUCCESS }
}
const changeApplicationFailure = error => {
    return { type: CHANGE_APPLICATION_FAILURE, error }
}

export const loadApplicationsAction = params => dispatch => {
    dispatch(loadApplications())
    loadApplicationsAPICall(params)
        .then(response => {
            if (response.status === 200) {
                dispatch(loadApplicationsSuccess(response.data))
            } else {
                dispatch(loadApplicationsFailure(response.error))
            }
        })
        .catch(err => {
            dispatch(loadApplicationsFailure(err.message))
        })
}

export const createApplicationAction = params => dispatch => {
    dispatch(changeApplication())
    createApplicationAPICall(params)
        .then(response => {
            if (response.status === 200) {
                dispatch(changeApplicationSuccess())
                dispatch(loadApplicationsAction({ createdBy: params.createdBy }))
            } else {
                dispatch(changeApplicationFailure(response.error))
            }
        })
        .catch(err => {
            if (err && err !== null && err.response && err.response !== null) {
                dispatch(changeApplicationFailure(err.response.data.message))
            } else {
                dispatch(changeApplicationFailure(err.message))
            }
        })
}

export const updateApplicationAction = params => dispatch => {
    dispatch(changeApplication())
    updateApplicationAPICall(params)
        .then(response => {
            if (response.status === 200) {
                dispatch(changeApplicationSuccess())
                dispatch(loadApplicationsAction({ createdBy: params.createdBy }))
            } else {
                dispatch(changeApplicationFailure(response.error))
            }
        })
        .catch(err => {
            if (err && err !== null && err.response && err.response !== null) {
                dispatch(changeApplicationFailure(err.response.data.message))
            } else {
                dispatch(changeApplicationFailure(err.message))
            }
        })
}

export const deleteApplicationAction = params => dispatch => {
    dispatch(changeApplication())
    deleteApplicationAPICall(params)
        .then(response => {
            if (response.status === 200) {
                dispatch(changeApplicationSuccess())
                dispatch(loadApplicationsAction({ createdBy: params.createdBy }))
            } else {
                dispatch(changeApplicationFailure(response.error))
            }
        })
        .catch(err => {
            if (err && err !== null && err.response && err.response !== null) {
                dispatch(changeApplicationFailure(err.response.data.message))
            } else {
                dispatch(changeApplicationFailure(err.message))
            }
        })
}

export const updateApplicationStatusAction = params => dispatch => {
    dispatch(changeApplication())
    updateApplicationStatusAPICall(params)
        .then(response => {
            if (response.status === 200) {
                dispatch(changeApplicationSuccess())
                dispatch(loadApplicationsAction())
            } else {
                dispatch(changeApplicationFailure(response.error))
            }
        })
        .catch(err => {
            if (err && err !== null && err.response && err.response !== null) {
                dispatch(changeApplicationFailure(err.response.data.message))
            } else {
                dispatch(changeApplicationFailure(err.message))
            }
        })
}
