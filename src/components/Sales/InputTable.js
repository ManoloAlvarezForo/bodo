import React from 'react';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    inputStyles: {
        textAlign: 'center'
    }
})

const InputTable = ({styles, value, placeholder, classes, onChange}) => {
    return (
        <Input
            classes={{
                input: classes.inputStyles
            }}
            disableUnderline={true}
            style={styles}
            placeholder={placeholder}
            value={value}
            type="number"
            min="1"
            onChange={e => onChange(e)}
        />
    )
}

export default withStyles(styles)(InputTable);