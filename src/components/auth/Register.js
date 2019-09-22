/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import HomeLink from './HomeLink'
import LoginLink from './LoginLink'
import RegisterForm from './RegisterForm'

class Register extends Component {
    componentDidMount() {
        const { auth, history } = this.props
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (auth && auth !== null && auth.isAuthenticated) {
            if (auth.user.role === 'OFFICER') {
                history.push('/officerdashboard') // push user to dashboard when they logged in
            } else {
                history.push('/clientdashboard')
            }
        }
    }

    onSubmit = event => {
        event.preventDefault()

        const { name, email, password, role, empireId } = event.target.elements
        const { registerUser: registerUserAPICall, history } = this.props

        const newUser = {
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value,
        }
        if (role.value === 'CLIENT') {
            newUser.empireId = empireId
        }
        registerUserAPICall(newUser, history)
    }

    render() {
        const { errors } = this.props // comes from redux store to props

        return (
            <div className="container" data-testid="register-page">
                <div className="row">
                    <div className="col s12">
                        <HomeLink />
                        <LoginLink />
                        <RegisterForm onSubmit={this.onSubmit} errors={errors} />
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    history: PropTypes.object,
    auth: PropTypes.object,
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})
export default connect(
    mapStateToProps,
    { registerUser },
)(withRouter(Register))
