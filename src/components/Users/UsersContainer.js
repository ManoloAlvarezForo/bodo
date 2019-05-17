import React from 'react'
import UserList from './UsersList';
import CustomToolBar from '../CustomToolBar/CustomToolBar';

export default class UsersContainer extends React.Component {
    state = {
        applicantSelectedId: ''
    }

    _actionSelected = (applicantSelectedId) => {
        this.setState({
            applicantSelectedId: applicantSelectedId
        })
    }
    render() {
        return (
            <React.Fragment>
                <div >
                    <CustomToolBar title="Users"/>
                    <div style={{ marginLeft: '5px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <UserList
                                selectedAction={this._actionSelected}
                                list={this.props.users}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
