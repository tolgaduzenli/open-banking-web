/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = props => {
    const { auth, history } = props
    const styleNames = 'btn btn-large waves-effect waves-light hoverable blue accent-3'

    if (auth && auth !== null && auth.isAuthenticated) {
        if (auth.user.role === 'OFFICER') {
            history.push('/officerdashboard') // push user to dashboard when they logged in
        } else {
            history.push('/clientdashboard')
        }
    }

    return (
        <div
            style={{ height: '75vh' }}
            className="container valign-wrapper"
            data-testid="landing-page"
        >
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        Welcome to&nbsp;<b>Open Banking system</b>
                    </h4>
                    <p className="flow-text grey-text text-darken-1">Please Register or Log in</p>
                    <br />
                    <div className="col s6">
                        <Link
                            to="/register"
                            style={{
                                width: '140px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px',
                            }}
                            className={styleNames}
                        >
                            Register
                        </Link>
                    </div>
                    <div className="col s6">
                        <Link
                            to="/login"
                            style={{
                                width: '140px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px',
                            }}
                            className="btn btn-large btn-flat waves-effect white black-text"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

Landing.propTypes = {
    auth: PropTypes.object,
    history: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Landing)
