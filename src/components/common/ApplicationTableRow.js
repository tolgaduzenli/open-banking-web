/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import ButtonContainer from './ButtonContainer'

const ApplicationTableRow = ({ application, user, onClickEdit, onClickDelete }) => {
    return (
        <tr key={application._id}>
            <td>{application.title}</td>
            <td>{application.description}</td>
            <td>{application.status}</td>
            <td>{application.reviewedBy ? application.reviewedBy.name : ''}</td>
            <td>{application.empireId}</td>
            <td>{application.createdBy.name}</td>
            <td>
                {user.role === 'OFFICER' && application.status === 'PENDING' && (
                    <ButtonContainer
                        application={application}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEdit}
                        editText="APPROVE"
                        deleteText="REJECT"
                    />
                )}
            </td>
            <td>
                {user.role === 'CLIENT' &&
                    application.status === 'PENDING' &&
                    application.createdBy._id === user.id && (
                        <ButtonContainer
                            application={application}
                            onClickDelete={onClickDelete}
                            onClickEdit={onClickEdit}
                            editText="EDIT"
                            deleteText="DELETE"
                        />
                    )}
            </td>
        </tr>
    )
}
ApplicationTableRow.propTypes = {
    application: PropTypes.objectOf(PropTypes.string).isRequired,
    user: PropTypes.objectOf(PropTypes.string).isRequired,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
}
export default ApplicationTableRow
