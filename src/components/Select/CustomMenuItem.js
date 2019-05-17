import React, {useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
// import ItemWithAvatar from '../Select/ItemWithAvatar';

const CustomMenuItem = ({ suggestion, itemAvatar: ItemWithAvatar, getItemProps }) => {
    return (
        <MenuItem
            {...getItemProps({
                item: {
                    name: `${suggestion.name} ${suggestion.lastName}`,
                    id: suggestion.id
                }
            })}
            component="div"
        >
            <ItemWithAvatar
                avatar={suggestion.avatar}
                title={`${suggestion.name} ${suggestion.lastName}`}
            />
        </MenuItem>
    )
}

export default CustomMenuItem;