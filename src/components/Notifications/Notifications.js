import React from 'react';
import CustomToolBar from '../CustomToolBar/CustomToolBar';
import UnderConstruction from '../UnderConstruction/UnderConstruction';

class Notifications extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CustomToolBar title="Notifications"/>
                <UnderConstruction />
            </div>
        );
    }
}

export default Notifications;