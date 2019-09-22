import axios from 'axios'
import {
    LOGIN_URL,
    REGISTER_URL,
    LOAD_APPLICATIONS_URL,
    CREATE_APPLICATION_URL,
    UPDATE_APPLICATION_URL,
    DELETE_APPLICATION_URL,
    UPDATE_APPLICATION_STATUS_URL,
} from '../constants/APIUrl'

export const loginAPICall = params => {
    return axios.post(process.env.REACT_APP_API_URL + LOGIN_URL, params).then(response => response)
}

export const registerAPICall = params => {
    return axios
        .post(process.env.REACT_APP_API_URL + REGISTER_URL, params)
        .then(response => response)
}

export const loadApplicationsAPICall = params => {
    return axios
        .get(process.env.REACT_APP_API_URL + LOAD_APPLICATIONS_URL, { params })
        .then(response => response)
}

export const createApplicationAPICall = params => {
    return axios
        .post(process.env.REACT_APP_API_URL + CREATE_APPLICATION_URL, params)
        .then(response => response)
}

export const updateApplicationAPICall = params => {
    return axios
        .put(process.env.REACT_APP_API_URL + UPDATE_APPLICATION_URL, params)
        .then(response => response)
}

export const deleteApplicationAPICall = params => {
    return axios
        .delete(process.env.REACT_APP_API_URL + DELETE_APPLICATION_URL, { params })
        .then(response => response)
}

export const updateApplicationStatusAPICall = params => {
    return axios
        .put(process.env.REACT_APP_API_URL + UPDATE_APPLICATION_STATUS_URL, params)
        .then(response => response)
}
