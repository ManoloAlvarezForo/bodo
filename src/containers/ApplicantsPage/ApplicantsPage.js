import React from 'react'
import Applicants from '../../components/Applicants/Applicants';

class ApplicantsPage extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Applicants')
    }
    render() {
        return (
            <Applicants />
        )
    }
}

export default ApplicantsPage;