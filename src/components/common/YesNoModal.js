/* eslint-disable no-underscore-dangle */
import React from 'react'
import Modal from 'react-awesome-modal'
import PropTypes from 'prop-types'
import './YesNoModal.css'

const YesNoModal = props => {
    const { onClickYes, onClickNo, application, showModal, action } = props
    return (
        <section>
            <Modal
                visible={showModal}
                width="400"
                height="200"
                effect="fadeInUp"
                onClickAway={() => onClickNo()}
            >
                <div className="modal-view">
                    <div>Do you want to &nbsp;{action} &nbsp;the application</div>
                    <div>Title: {application.title}</div>
                    <div>Description: {application.description}</div>
                    <div className="button-group">
                        <button
                            className="waves-effect waves-light btn-small green lighten-1"
                            onClick={() => onClickYes(application._id)}
                            type="button"
                        >
                            Yes
                        </button>
                        <button
                            className="waves-effect waves-light btn-small grey"
                            onClick={() => onClickNo()}
                            type="button"
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    )
}
YesNoModal.propTypes = {
    onClickYes: PropTypes.func.isRequired,
    onClickNo: PropTypes.func.isRequired,
    application: PropTypes.objectOf(PropTypes.string),
    showModal: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
}
export default YesNoModal
