import React from 'react'
import SimpleTable from '../SimpleTable/SimpleTable';
import ApplicantDialogDetail from './ApplicantDialogDetail';
import { DialogProvider, DialogConsumer } from '../../Context/DialogContext'

const rowTitles = [
    { id: 1, title: 'name' },
    { id: 2, title: 'lastName' },
    { id: 3, title: 'phones' },
    { id: 4, title: 'mails' },
    { id: 5, title: 'position' },
]

const getApplicantRow = (row, rowTitle) => {

    const value = row[rowTitle.title];

    if(value instanceof Object) {
        !Array.isArray(value.list) 
          return value.list[0][value.keyName]
    }

    return value;
}

class ApplicantsDialogContainer extends React.Component {

    state = {
        dialogEnabled: false,
        applicantSelectedId: '',
        openDialog: () => this._changeDialogOpen(),
        closeDialog: () => this._changeDialogClose(),
    }

    _actionSelected = (applicantSelectedId) => {
        this.setState({
            dialogEnabled: true,
            applicantSelectedId: applicantSelectedId
        })
    }

    _changeDialogOpen = () => {
        this.setState({
            dialogEnabled: true
        })
    }

    _changeDialogClose = () => {
        this.setState({
            dialogEnabled: false
        })
    }

    render() {
        return (
            <DialogProvider value={this.state}>
                <SimpleTable selectedAction={this._actionSelected} rowsTitles={rowTitles} rowsData={this.props.applicants} getRow={getApplicantRow} />
                <DialogConsumer>
                    {
                        context => (
                            <ApplicantDialogDetail handleDialog={context} />
                        )
                    }
                </DialogConsumer>
            </DialogProvider>
        )
    }
}

export default ApplicantsDialogContainer