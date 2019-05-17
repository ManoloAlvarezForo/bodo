import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { FiSearch, FiPlus } from 'react-icons/fi';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';

class ApplicantsToolBarOptions extends React.Component {

    _openContentDialog = () => {
        // this.props.clearApplicantSelectedId();
        this.props.setValues('content', true)
        this.props.setValues('isNewApplicant', true)
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.grow} />
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <FiSearch />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button style={{ marginLeft: '20px', color: 'white' }} onClick={this._openContentDialog} variant="contained" size="medium" color="primary">
                        <FiPlus style={{ margin: '0 5px' }} /> Add applicant
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden'
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
    },
    content: {
        flexGrow: 1,
        // padding: '0 24px',
        overflow: 'hidden'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

export default withStyles(styles, { withTheme: true })(ApplicantsToolBarOptions);
