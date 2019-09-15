/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends React.Component {
    onLogoutClick = e => {
        e.preventDefault()
        const { logoutUser: logoutUserFromServer } = this.props
        logoutUserFromServer()
    }

    render() {
        const { auth } = this.props
        const { user } = auth || {}

        return (
            <nav className="container" data-testid="nav-bar">
                <div className="nav-wrapper">
                    <Link
                        to="/"
                        style={{
                            fontFamily: 'monospace',
                        }}
                        className="brand-logo"
                    >
                        Open Banking System
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {user && user !== null && user.role && user.role === 'CLIENT' && (
                            <li>
                                <a href="/clientdashboard">Dashboard</a>
                            </li>
                        )}
                        {user && user !== null && user.role && user.role === 'OFFICER' && (
                            <li>
                                <a href="/officerdashboard">Dashboard</a>
                            </li>
                        )}
                        {user && user !== null && user.name && user.name !== null && (
                            <li>
                                <a href="/profile">{user.name}</a>
                            </li>
                        )}
                        {user && user !== null && user.name && user.name !== null && (
                            <li>
                                <a href="/" onClick={this.onLogoutClick}>
                                    Logout
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(
    mapStateToProps,
    { logoutUser },
)(Navbar)
