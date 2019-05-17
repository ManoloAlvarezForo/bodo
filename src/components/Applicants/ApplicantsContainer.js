import React from 'react'
import ApplicantList from './ApplicantList';
// import ApplicantDialogDetail from './ApplicantDialogDetail';
import ApplicantDialogContent from './ApplicantDialogContent';
import ApplicantsToolBarOptions from './ApplicantsToolBarOptions';
import CustomToolBar from '../CustomToolBar/CustomToolBar';
import CustomSnackBar from '../SnackBar/CustomSnackBar';
import ApplicantDetail from '../Applicants/ApplicantDetail';

class ApplicantsContainer extends React.Component {

    state = {
        detail: false,
        content: false,
        snackBar: false,
        snackBarCurrentVariant: '',
        snackBarCurrentMessage: '',
        snackBarUpdatedMessage: 'Applicant was updated successfully.',
        snackBarAddedMessage: 'Applicant was added successfully.',
        applicantSelectedId: '',
        isNewApplicant: false,
        isDetailOpen: false,
        listWidth: '50%',
        detailWidth: '50%',
    }

    actionSelected = (applicantSelectedId) => {
        this.setState({
            isDetailOpen: true,
            listWidth: '50%',
            detailWidth: '50%',
            isNewApplicant: false,
            applicantSelectedId: applicantSelectedId
        })
    }

    _handleDialog = (property, value) => {
        this.setState({
            [property]: value
        })
    }

    _setValues = (property, value) => {
        this.setState({
            [property]: value
        })
    }

    _setSnackBar = (variant, message) => {
        this.setState({
            snackBarCurrentVariant: variant,
            snackBarCurrentMessage: this.state[message] || 'Error to show a message.'
        })
    }

    render() {
        return (
            <React.Fragment>
                <div styles={{display: 'flex', flexDirection: 'column'}}>
                    <CustomToolBar title='Applicants' additional={<ApplicantsToolBarOptions setValues={this._setValues} />} />
                    <div style={{ marginLeft: '5px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <ApplicantList
                                width={this.state.isDetailOpen ? this.state.listWidth : '100%'}
                                selectedAction={this.actionSelected}
                                list={this.props.applicants}
                            />
                            {
                                this.state.isDetailOpen && (<ApplicantDetail
                                    width={this.state.detailWidth}
                                    handleDialog={this._handleDialog}
                                    applicantSelectedId={this.state.applicantSelectedId}
                                />
                                )
                            }
                        </div>
                        <React.Fragment>
                            <ApplicantDialogContent
                                isEnabled={this.state.content}
                                handleDialog={this._handleDialog}
                                applicantSelectedId={this.state.applicantSelectedId}
                                clearApplicantSelectedId={this._clearApplicantSelectedId}
                                setValue={this._setValues}
                                setSnackBar={this._setSnackBar}
                                isNewApplicant={this.state.isNewApplicant}
                            />
                        </React.Fragment>
                    </div>
                    <CustomSnackBar
                        openSnackBar={this.state.snackBar}
                        variant={this.state.snackBarCurrentVariant}
                        message={this.state.snackBarCurrentMessage}
                        handleClose={() => this._setValues('snackBar', false)}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default ApplicantsContainer