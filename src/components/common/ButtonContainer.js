import React from 'react'
import PropTypes from 'prop-types'
import './ButtonContainer.css'

const ButtonContainer = props => {
    const { application, onClickDelete, onClickEdit, editText, deleteText } = props

    return (
        <div className="button-container">
            <button
                type="button"
                className="waves-effect waves-light btn-small orange lighten-2"
                onClick={() => onClickEdit(application, editText)}
            >
                {editText}
            </button>
            <button
                type="button"
                className="waves-effect waves-light btn-small red lighten-1"
                onClick={() => onClickDelete(application, deleteText)}
            >
                {deleteText}
            </button>
        </div>
    )
}

ButtonContainer.propTypes = {
    application: PropTypes.objectOf(PropTypes.string),
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    editText: PropTypes.string.isRequired,
    deleteText: PropTypes.string.isRequired,
}

export default ButtonContainer
