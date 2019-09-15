/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import EmpireSelector from 'react-select'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { registerUser } from '../../actions/authActions'

const empireOptions = [{ label: 'ESSOS', value: 'ESSOS' }, { label: 'WESTEROS', value: 'WESTEROS' }]

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            role: 'OFFICER',
            empireId: '',
        }
    }

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

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { name, email, password, role, empireId } = this.state
        const { registerUser: registerUserAPICall, history } = this.props

        const newUser = {
            name,
            email,
            password,
            role,
        }
        if (role === 'CLIENT') {
            newUser.empireId = empireId
        }
        registerUserAPICall(newUser, history)
    }

    onChangeEmpire = selectedEmpire => {
        this.setState({ empireId: selectedEmpire.value })
    }

    render() {
        const { name, email, password, role } = this.state
        const { errors } = this.props // comes from redux store to props
        const styleNames = 'btn btn-large waves-effect waves-light hoverable blue accent-3'

        return (
            <div className="container" data-testid="register-page">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        onChange={this.onChange}
                                        value={name}
                                        error={errors.name}
                                        id="name"
                                        name="name"
                                        type="text"
                                        className={classnames('', {
                                            invalid: errors.name,
                                        })}
                                    />
                                    <label htmlFor="name" className="active">
                                        Name
                                    </label>
                                    <span className="red-text">{errors.name}</span>
                                </div>
                                <div className="input-field col s6">
                                    <input
                                        onChange={this.onChange}
                                        value={email}
                                        error={errors.email}
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={classnames('', {
                                            invalid: errors.email,
                                        })}
                                    />
                                    <label htmlFor="email" className="active">
                                        Email
                                    </label>
                                    <span className="red-text">{errors.email}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        onChange={this.onChange}
                                        value={password}
                                        error={errors.password}
                                        id="password"
                                        name="password"
                                        type="password"
                                        className={classnames('', {
                                            invalid: errors.password,
                                        })}
                                    />
                                    <label htmlFor="password" className="active">
                                        Password
                                    </label>
                                    <span className="red-text">{errors.password}</span>
                                </div>
                                <div className="col s6">
                                    <div className="row">
                                        <span>Select your role</span>
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="col s6">
                                                <p>
                                                    <label>
                                                        <input
                                                            className="with-gap"
                                                            name="role"
                                                            id="role-officer"
                                                            value="OFFICER"
                                                            type="radio"
                                                            checked={role === 'OFFICER'}
                                                            onChange={this.onChange}
                                                        />
                                                        <span>OFFICER</span>
                                                    </label>
                                                </p>
                                            </div>
                                            <div className="col s6">
                                                <p>
                                                    <label>
                                                        <input
                                                            className="with-gap"
                                                            name="role"
                                                            id="role-client"
                                                            value="CLIENT"
                                                            type="radio"
                                                            checked={role === 'CLIENT'}
                                                            onChange={this.onChange}
                                                        />
                                                        <span>CLIENT</span>
                                                    </label>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {role && role !== null && role === 'CLIENT' && (
                                    <div className="col s6 offset-s6">
                                        <EmpireSelector
                                            className="basic-single"
                                            classNamePrefix="select"
                                            placeholder="Select your empire"
                                            name="empireId"
                                            options={empireOptions}
                                            onChange={this.onChangeEmpire}
                                        />
                                    </div>
                                )}
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
                                    className={styleNames}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
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
    errors: PropTypes.objectOf(PropTypes.object),
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})
export default connect(
    mapStateToProps,
    { registerUser },
)(withRouter(Register))
