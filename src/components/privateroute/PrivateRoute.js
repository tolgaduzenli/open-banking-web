/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
        }
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object,
    component: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
