import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

class UserProfileItem extends React.Component {

    state = {
        profile: 'profile',
        option: {
            name: 'Profile',
            variant: 'profile',
            path: '/profile',
            // action: () => {
            //     console.log('Profile');
            // }
        }
    }

    _handleClick = () => {
        this.props.handleListItemClick(this.state.option)
    }

    render() {
        const { name, selectedItem } = this.props;
        return (
            <ListItem selected={selectedItem === this.state.option.path} style={{ paddingLeft: '9px' }} button onClick={this._handleClick}>
                <ListItemAvatar>
                    <Avatar src="">u</Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} />
            </ListItem>

        )
    }
}

export default UserProfileItem