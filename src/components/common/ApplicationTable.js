/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import ApplicationTableRow from './ApplicationTableRow'

const ApplicationTable = props => {
    const { applicationList, user, onClickEdit, onClickDelete } = props

    return (
        <div>
            <table className="responsive-table striped centered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Reviewer</th>
                        <th>Empire</th>
                        <th>Creator</th>
                    </tr>
                </thead>
                <tbody>
                    {applicationList &&
                        applicationList !== null &&
                        applicationList.length > 0 &&
                        Object.values(applicationList).map(application => {
                            return (
                                <ApplicationTableRow
                                    application={application}
                                    user={user}
                                    onClickEdit={onClickEdit}
                                    onClickDelete={onClickDelete}
                                />
                            )
                        })}
                </tbody>
            </table>
            <span className="right" style={{ paddingTop: '1rem' }}>
                Total count:{' '}
                {applicationList && applicationList !== null ? applicationList.length : 0}
            </span>
        </div>
    )
}

ApplicationTable.propTypes = {
    applicationList: PropTypes.objectOf(PropTypes.object),
    user: PropTypes.objectOf(PropTypes.string),
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
}

export default ApplicationTable
