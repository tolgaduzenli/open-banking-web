/* eslint-disable no-underscore-dangle */
import React from 'react'
import Modal from 'react-awesome-modal'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class ApplicationModalDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.application.description,
            title: props.application.title,
            _id: props.application._id,
            error: false,
            errorMessage: '',
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        if (e.target.name === 'title' && e.target.value !== null && e.target.value !== '') {
            this.setState({ error: false, errorMessage: '' })
        }
    }

    onClickModalSave = () => {
        const { title, description, _id } = this.state
        const { onClickModalSave } = this.props

        if (title && title !== null) {
            onClickModalSave({ title, description, _id })
        } else {
            this.setState({ error: true, errorMessage: 'Title is required' })
        }
    }

    render() {
        const { closeModal, showModal } = this.props
        const { title, description, error, errorMessage } = this.state

        return (
            <section>
                <Modal
                    visible={showModal}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => closeModal()}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <form
                                onSubmit={this.onSubmit}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div style={{ width: '100%' }}>
                                    <label htmlFor="title" className="active">
                                        Title
                                        <input
                                            type="text"
                                            value={title}
                                            name="title"
                                            id="title"
                                            error={error}
                                            onChange={this.onChange}
                                            className={classnames('', { invalid: errorMessage })}
                                        />
                                    </label>
                                    <span className="red-text">{errorMessage}</span>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <label htmlFor="description" className="active">
                                        Description
                                        <input
                                            value={description}
                                            type="text"
                                            name="description"
                                            id="description"
                                            onChange={this.onChange}
                                        />
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <button
                                className="waves-effect waves-light btn-small grey"
                                type="button"
                                onClick={() => closeModal()}
                            >
                                Cancel
                            </button>
                            <button
                                className="waves-effect waves-light btn-small"
                                style={{ marginLeft: '20px' }}
                                type="button"
                                onClick={() => this.onClickModalSave()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
            </section>
        )
    }
}

ApplicationModalDialog.propTypes = {
    application: PropTypes.objectOf(PropTypes.string).isRequired,
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    onClickModalSave: PropTypes.func.isRequired,
}

export default ApplicationModalDialog
