import React from 'react';
import CustomToolBar from '../CustomToolBar/CustomToolBar'
import UnderConstruction from '../UnderConstruction/UnderConstruction';

class Profile extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CustomToolBar title="Profile" />
                <UnderConstruction />
            </div>
        );
    }
}

export default Profile;