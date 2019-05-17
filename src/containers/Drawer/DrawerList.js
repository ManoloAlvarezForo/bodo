import React from 'react';
import List from '@material-ui/core/List';
import { withRouter } from 'react-router';
import UserProfileItem from './UserProfileItem';
import AppDrawerList from './AppDrawerList';
import UserDrawerList from './UserDrawerList';
import Divider from '@material-ui/core/Divider';


class DrawerList extends React.Component {

    state = {
        selectedItem: this.props.history.location.pathname,
    };

    _handleListItemClick = (option) => {
        if (option.action !== undefined) {
            option.action();
        } else {
            this.setState({ selectedItem: option.path });
            this.props.history.push(option.path);
            this.props.changeTitle(option.name);
        }

    };

    render() {
        return (
                <List>
                    <UserProfileItem
                        name="Manolo Alvarez"
                        selectedItem={this.state.selectedItem} 
                        handleListItemClick={this._handleListItemClick} />
                    <Divider />
                    <AppDrawerList 
                        selectedItem={this.state.selectedItem} 
                        handleListItemClick={this._handleListItemClick} 
                    />
                    <Divider />
                    <UserDrawerList 
                        selectedItem={this.state.selectedItem} 
                        handleListItemClick={this._handleListItemClick} 
                    />
                </List>
        )
    }
}

export default withRouter(DrawerList);