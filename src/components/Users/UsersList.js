import React from 'react';
import GenericList from '../GenericList/GenericList';
import UserListItem from './UserListItem';

class UserList extends React.Component {
    render() {
        const { 
            list, 
            selectedAction 
        } = this.props;
        
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                <div style={{ overflow: 'auto', height: 'calc(100vh - 65px)', width: '100%', padding: '5px 5px 5px 0' }}>
                    <GenericList
                        selectedAction={selectedAction}
                        item={UserListItem}
                        list={list}
                    />
                </div>
            </div>
        );
    }
}

export default UserList;