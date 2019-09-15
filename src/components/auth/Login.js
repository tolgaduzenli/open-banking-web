/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { loginUser } from '../../actions/authActions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        const { loginUser: loginUserAPICall } = this.props
        const userData = {
            email,
            password,
        }
        // since we handle the redirect within our component,
        // we don't need to pass in this.props.history as a parameter
        loginUserAPICall(userData)
    }

    render() {
        const { email, password } = this.state
        const { history, errors, auth } = this.props
        const styleName = 'btn btn-large waves-effect waves-light hoverable blue accent-3'

        if (auth && auth !== null && auth.isAuthenticated) {
            if (auth.user.role === 'OFFICER') {
                history.push('/officerdashboard') // push user to dashboard when they logged in
            } else {
                history.push('/clientdashboard')
            }
        }

        return (
            <div className="container" data-testid="login-page">
                <div style={{ marginTop: '4rem' }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                            <p className="grey-text text-darken-1">
                                Don&apos;t have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames('', {
                                        invalid: errors.email || errors.emailnotfound,
                                    })}
                                />
                                <label htmlFor="email" className="active">
                                    Email
                                </label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames('', {
                                        invalid: errors.password || errors.passwordincorrect,
                                    })}
                                />
                                <label htmlFor="password" className="active">
                                    Password
                                </label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                                <button
                                    style={{
                                        width: '150px',
                                        borderRadius: '3px',
                                        letterSpacing: '1.5px',
                                        marginTop: '1rem',
                                    }}
                                    type="submit"
                                    className={styleName}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func,
    history: PropTypes.object,
    auth: PropTypes.object,
    errors: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})
export default connect(
    mapStateToProps,
    { loginUser },
)(Login)
