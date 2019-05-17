import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MiniDrawer from './MiniDrawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router';

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
        backgroundColor: '#555d6f',
        // padding: '0 24px',
        overflow: 'hidden'
    },
    beforeRoot: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    }
});

class CustomDrawer extends React.Component {
    state = {
        toolbarTitle: 'Non title',
    };

    _changeTitle = (newTitle) => {
        this.setState({
            toolbarTitle: newTitle
        })
    }

    _setAdditionalComponent = component => {
        this.setState({
            additional: component
        })
    }

    render() {
        const { classes } = this.props;
        const Body = this.props.body;

        return (
            <div className={[classes.beforeRoot, "app-wrapper-web"].join(' ')}>
                <div className={[classes.root, '_3dqpi'].join(' ')}>
                    <CssBaseline />
                    <MiniDrawer changeTitle={this._changeTitle} />
                    <div className={classes.mainContent}>
                        <main className={classes.content}>
                            <Body changeTitle={this._changeTitle} />
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

CustomDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(CustomDrawer));
