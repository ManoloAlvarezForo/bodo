import React, { useState } from 'react';
import { TextField, Paper, MenuList, MenuItem, Popper, Grow, ClickAwayListener, ListItem, Avatar, ListItemText } from '@material-ui/core';
import { FiImage } from 'react-icons/fi';

const ProductMenuItem = ({product, selectedItemEvent}) => {
    const onClickItem = product => {
        console.log('press item')
        selectedItemEvent(product);
    }

    return(
        <MenuItem onClick={() => onClickItem(product)}>
                <Avatar>
                    <FiImage />
                </Avatar>
                <ListItemText primary={`${product.productName} - Precio: ${product.price} Bs.`} secondary={`Code: ${product.productId} / ${product.description}`} />
        </MenuItem>
        
    )
}

const SpecialSelectComponent = ({label, placeholder, addItems, suggestions: Suggestions }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedTextField, setSelectedTextField] = useState('');
    const anchorEl = React.useRef(null);

    const _onChangeHandle = event => {
        setOpen(true)
        setSelectedTextField(event.target.value);
        // event.target.value === '' ? setOpen(false) : setOpen(true);
    }

    const _handleClose = item => {
        setSelectedTextField('')
        setOpen(false);
    }

    const _clickItemHandle = item => {
        setSelectedItem(item)
        addItems(item);
        setOpen(false);
        setSelectedTextField('')
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <TextField
                onChange={_onChangeHandle}
                value={selectedTextField}
                id="outlined-full-width"
                label={label}
                style={{ margin: 5, width: 'auto' }}
                placeholder={placeholder}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            
            <Popper style={styles.menu} open={open} anchorEl={anchorEl.current} transition disablePortal>

                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={_handleClose}>
                            <MenuList>
                                <Suggestions
                                    query={selectedTextField}
                                    item={ProductMenuItem}
                                    selectedItemEvent={_clickItemHandle}
                                />
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

const styles = {
    menu: {
        position: 'absolute',
        zIndex: 3,
        top: '55px',
        overflow: 'auto',
        width: '100%',
        height: '350px'
    }
}

export default SpecialSelectComponent;