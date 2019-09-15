/* eslint-disable no-underscore-dangle */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    loadApplicationsAction,
    updateApplicationStatusAction,
} from '../../actions/applicationActions'
import Loader from '../../utils/Loader'
import YesNoModal from '../common/YesNoModal'
import ApplicationTable from '../common/ApplicationTable'
import StatusFilter from '../common/StatusFilter'

class OfficerDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showYesNoModal: false,
            selectedApplication: {
                title: '',
                description: '',
                _id: null,
            },
            selectedAction: null,
        }
    }

    componentDidMount() {
        const { loadApplications } = this.props
        loadApplications()
    }

    toggleYesNoModal = () => {
        const { showYesNoModal } = this.state
        this.setState({ showYesNoModal: !showYesNoModal })
    }

    onClickChangeStatusApplication = (application, selectedAction) => {
        const selectedApplication = {
            id: application._id,
            title: application.title,
            description: application.description,
            newStatus: selectedAction,
        }
        this.setState({ selectedApplication, selectedAction })
        this.toggleYesNoModal()
    }

    onClickChangeStatusYesButton = () => {
        const { updateApplicationStatus, user } = this.props
        const { selectedApplication } = this.state
        const params = {
            id: selectedApplication.id,
            newStatus: selectedApplication.newStatus === 'APPROVE' ? 'APPROVED' : 'REJECTED',
            reviewerId: user.id,
        }
        updateApplicationStatus(params)
        this.toggleYesNoModal()
    }

    onChangeFilter = filter => {
        const { loadApplications } = this.props
        const params = {}
        if (filter !== 'ALL') {
            params.status = filter
        }
        loadApplications(params)
    }

    render() {
        const { applicationList, error, loading, errorMessage, user } = this.props
        const { showYesNoModal, selectedApplication, selectedAction } = this.state
        return (
            <div style={{ height: '75vh' }} className="container" data-testid="officer-dashboard">
                <StatusFilter onChangeFilter={this.onChangeFilter} />
                {!error && !loading && (
                    <ApplicationTable
                        applicationList={applicationList}
                        user={user}
                        onClickEdit={this.onClickChangeStatusApplication}
                        onClickDelete={this.onClickChangeStatusApplication}
                    />
                )}
                {loading && <Loader />}
                {error && <div>{errorMessage}</div>}
                {showYesNoModal && (
                    <YesNoModal
                        onClickYes={this.onClickChangeStatusYesButton}
                        onClickNo={this.toggleYesNoModal}
                        showModal={showYesNoModal}
                        application={selectedApplication}
                        action={selectedAction}
                    />
                )}
            </div>
        )
    }
}

OfficerDashboard.propTypes = {
    user: PropTypes.objectOf(PropTypes.object),
    loadApplications: PropTypes.func,
    applicationList: PropTypes.arrayOf(PropTypes.object),
    updateApplicationStatus: PropTypes.func,
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
        updateApplicationStatus: params => dispatch(updateApplicationStatusAction(params)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OfficerDashboard)
