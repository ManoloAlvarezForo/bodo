import React from 'react'
//Icons
import { FiUsers, FiLogOut, FiCalendar } from 'react-icons/fi';
import { MdNotificationsNone } from "react-icons/md";
import ListItemWithIcon from './ListItemWithIcon';

const styles = {
    fontSize: {
        fontSize: '22px'
    }
}

const iconList = {
    users: FiUsers,
    scheduler: FiCalendar,
    notifications: MdNotificationsNone,
    logout: FiLogOut
}

const options = [
    {
        name: 'Notifications',
        variant: 'notifications',
        path: '/notifications'
    },
    {
        name: 'Logout',
        variant: 'logout',
        path: '/logout',
        action: () => {
            console.log('Logout');
        }
    }
]

class UserDrawerList extends React.Component {

    _handleClick = option => {
        this.props.handleListItemClick(option)
    }
    
    render () {
        return (
            <React.Fragment>
                {options.map((option, index) => (
                        <ListItemWithIcon
                            iconStyles={styles.fontSize}
                            iconList={iconList}
                            key={index} 
                            name={option.name} 
                            variant={option.variant} 
                            selectedItem={this.props.selectedItem} 
                            path={option.path}
                            handleListItemClick={() => this._handleClick(option)}
                        />
                    ))}
            </React.Fragment>
        )
    }
}

export default UserDrawerList