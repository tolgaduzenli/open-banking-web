/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import LoginForm from './LoginForm'
import RegisterLink from './RegisterLink'
import HomeLink from './HomeLink'

class Login extends Component {

    componentDidUpdate() {
        const { auth, history } = this.props
        // If logged in and user navigates to Login page, should redirect to dashboard
        if (auth && auth !== null && auth.isAuthenticated) {
            if (auth.user.role === 'OFFICER') {
                history.push('/officerdashboard')
            } else {
                history.push('/clientdashboard')
            }
        }
    }

    onSubmit = event => {
        event.preventDefault()
        const { email, password } = event.target.elements
        const { loginUser: loginUserAPICall } = this.props
        const userData = {
            email: email.value,
            password: password.value,
        }
        // since we handle the redirect within our component,
        // we don't need to pass in this.props.history as a parameter
        loginUserAPICall(userData)
    }

    render() {
        const { errors } = this.props
        return (
            <div className="container" data-testid="login-page">
                <div style={{ marginTop: '4rem' }} className="row">
                    <div className="col s6">
                        <HomeLink />
                        <RegisterLink />
                        <LoginForm onSubmit={this.onSubmit} errors={errors} />
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func,
    auth: PropTypes.object,
    errors: PropTypes.object,
    history: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})
export default connect(
    mapStateToProps,
    { loginUser },
)(Login)
