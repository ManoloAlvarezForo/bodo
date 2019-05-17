import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FiCheckCircle, FiAlertCircle, FiInfo, FiX, FiAlertTriangle} from 'react-icons/fi';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: FiCheckCircle,
    warning: FiAlertTriangle,
    error: FiAlertCircle,
    info: FiInfo,
};

const styles1 = theme => ({
    success: {
        backgroundColor: '#13b9cc',
        // backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: 'rgb(49, 49, 49)',
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class MySnackbarContent extends React.Component {
    render() {
        const { classes, className, message, onClose, variant, ...other } = this.props;
        const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span style={{color: 'white'}} id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <FiX style={{color: 'white'}} className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
    }
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

const CustomSnackbar = ({openSnackBar, handleClose, variant, message, vertical = 'bottom', horizontal='center'}) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: vertical,
                    horizontal: horizontal,
                }}
                open={openSnackBar}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={variant}
                    message={message}
                />
            </Snackbar>
        </div>
    );
}

CustomSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(CustomSnackbar);