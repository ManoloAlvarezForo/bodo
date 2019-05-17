import React from 'react';
import CustomToolBar from '../CustomToolBar/CustomToolBar';
import UnderConstruction from '../UnderConstruction/UnderConstruction';

class Settings extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CustomToolBar title="Settings"/>
                <UnderConstruction />
            </div>
        );
    }
}

export default Settings;