import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const listItemStyle = {
    inline: {
        display: 'inline',
    },
}

export default class GenericListItem extends React.Component {
    render() {

        const { 
            id, 
            selected, 
            avatar, 
            primaryText, 
            secondaryTextOne, 
            secondaryTextTwo ='',
            withDivider,
            handleListItemClick
        } = this.props

        return (
            <React.Fragment>
                <ListItem
                    onClick={() => handleListItemClick(id)}
                    alignItems="flex-start"
                    button
                    selected={selected}
                >
                    {
                        avatar !== undefined && (<ListItemAvatar>
                            {
                                avatar.length === 1 ?
                                    <Avatar>{avatar}</Avatar> :
                                    <Avatar src={avatar}></Avatar>
                            }
                        </ListItemAvatar>)
                    }
                    <ListItemText
                        primary={primaryText}
                        secondary={
                            <React.Fragment>
                                <Typography 
                                    component="span" 
                                    style={listItemStyle.inline} 
                                    color="textPrimary">
                                    {secondaryTextOne}
                                </Typography>
                                    {secondaryTextTwo}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {
                    withDivider && (<Divider variant="inset" component="li" />)
                }
            </React.Fragment>
        )
    }
}