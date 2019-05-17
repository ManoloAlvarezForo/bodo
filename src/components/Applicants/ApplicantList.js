import React from 'react';
import GenericList from '../GenericList/GenericList';
import ApplicantListItem from '../Applicants/ApplicantListItem';

class ApplicantList extends React.Component {
    render() {
        const { list, selectedAction } = this.props;
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: this.props.width }}>
                <div style={{ overflow: 'auto', height: 'calc(100vh - 97px)', width: '100%', padding: '5px 5px 5px 0' }}>
                    <GenericList
                        selectedAction={selectedAction}
                        item={ApplicantListItem}
                        list={list}
                    />
                </div>
            </div>
        );
    }
}

export default ApplicantList;