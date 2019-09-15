/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UserProfile = props => {
    const { user } = props
    return (
        <div
            style={{ height: '75vh', paddingTop: '2rem' }}
            className="container"
            data-testid="user-profile"
        >
            <table className="responsive-table striped" style={{ width: '50%' }}>
                <tbody>
                    <tr>
                        <td>
                            Name: &nbsp;<strong>{user.name}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email: &nbsp;<strong>{user.email}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Role: &nbsp;<strong>{user.role}</strong>
                        </td>
                    </tr>
                    {user.role === 'CLIENT' && (
                        <tr>
                            <td>
                                Empire: &nbsp;<strong>{user.empireId}</strong>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

UserProfile.propTypes = {
    user: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps)(UserProfile)
