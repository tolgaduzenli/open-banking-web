/* eslint-disable no-underscore-dangle */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    loadApplicationsAction,
    createApplicationAction,
    updateApplicationAction,
    deleteApplicationAction,
} from '../../actions/applicationActions'
import Loader from '../../utils/Loader'
import ApplicationModal from '../common/ApplicationModal'
import YesNoModal from '../common/YesNoModal'
import ApplicationTable from '../common/ApplicationTable'

class ClientDashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            showCreateApplicationModal: false,
            showYesNoModal: false,
            newApplication: {
                title: '',
                description: '',
                _id: null,
            },
            selectedAction: null,
        }
    }

    componentDidMount() {
        const { loadApplications, user } = this.props
        const params = {}
        if (user && user !== null) {
            params.createdBy = user.id
        }
        loadApplications(params)
    }

    toggleModal = () => {
        const { showCreateApplicationModal } = this.state
        this.setState({ showCreateApplicationModal: !showCreateApplicationModal })
    }

    toggleYesNoModal = () => {
        const { showYesNoModal } = this.state
        this.setState({ showYesNoModal: !showYesNoModal })
    }

    onClickAddApplication = () => {
        this.setState(
            {
                newApplication: {
                    title: '',
                    description: '',
                    _id: null,
                },
            },
            () => {
                this.toggleModal()
            },
        )
    }

    onClickSaveApplication = newApplication => {
        const { createApplication, updateApplication, user } = this.props
        const params = {
            title: newApplication.title,
            description: newApplication.description,
            id: newApplication._id,
            createdBy: user.id,
        }
        if (newApplication._id === null) {
            createApplication(params)
        } else {
            updateApplication(params)
        }
        this.toggleModal()
    }

    onClickEditApplication = application => {
        const newApplication = {
            title: application.title,
            description: application.description,
            _id: application._id,
        }
        this.setState({ newApplication })
        this.toggleModal()
    }

    onClickDeleteApplication = (application, selectedAction) => {
        const newApplication = {
            title: application.title,
            description: application.description,
            _id: application._id,
        }
        this.setState({ newApplication, selectedAction }, () => {
            this.toggleYesNoModal()
        })
    }

    onClickDeleteApplicaitonYesButton = id => {
        const { deleteApplication, user } = this.props
        const params = { id, createdBy: user.id }
        deleteApplication(params)
        this.toggleYesNoModal()
    }

    render() {
        const { applicationList, error, loading, errorMessage, user } = this.props
        const {
            showCreateApplicationModal,
            newApplication,
            showYesNoModal,
            selectedAction,
        } = this.state

        return (
            <div style={{ height: '75vh' }} className="container" data-testid="client-dashboard">
                {!error && !loading && (
                    <ApplicationTable
                        applicationList={applicationList}
                        user={user}
                        onClickEdit={this.onClickEditApplication}
                        onClickDelete={this.onClickDeleteApplication}
                    />
                )}
                <div className="fixed-action-btn">
                    <button
                        className="btn-floating btn-large waves-effect waves-light green"
                        type="button"
                        onClick={this.onClickAddApplication}
                    >
                        <i className="material-icons">add</i>
                    </button>
                </div>
                {loading && <Loader />}
                {error && <div>{errorMessage}</div>}
                {showCreateApplicationModal && (
                    <ApplicationModal
                        closeModal={this.toggleModal}
                        showModal={showCreateApplicationModal}
                        onClickModalSave={this.onClickSaveApplication}
                        application={newApplication}
                    />
                )}
                {showYesNoModal && (
                    <YesNoModal
                        onClickYes={this.onClickDeleteApplicaitonYesButton}
                        onClickNo={this.toggleYesNoModal}
                        showModal={showYesNoModal}
                        application={newApplication}
                        action={selectedAction}
                    />
                )}
            </div>
        )
    }
}

ClientDashboard.propTypes = {
    user: PropTypes.objectOf(PropTypes.object),
    loadApplications: PropTypes.func,
    createApplication: PropTypes.func,
    updateApplication: PropTypes.func,
    deleteApplication: PropTypes.func,
    applicationList: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        applicationList: state.applicationReducer.applications,
        loading: state.applicationReducer.loading,
        error: state.applicationReducer.error,
        errorMessage: state.applicationReducer.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadApplications: params => dispatch(loadApplicationsAction(params)),
        createApplication: params => dispatch(createApplicationAction(params)),
        updateApplication: params => dispatch(updateApplicationAction(params)),
        deleteApplication: params => dispatch(deleteApplicationAction(params)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ClientDashboard)
