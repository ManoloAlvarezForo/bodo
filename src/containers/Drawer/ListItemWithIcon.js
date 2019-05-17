import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class ListItemWithIcon extends React.Component {
    render() {
        const {name, iconList, variant, handleListItemClick, selectedItem, path, iconStyles} = this.props;
        const Icon = iconList[variant]
        return (
            <ListItem selected={selectedItem === path} button onClick={handleListItemClick}>
                <ListItemIcon>
                    <Icon style={iconStyles} />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
        )
    }
}

export default ListItemWithIcon;