import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
// , background: 'none', borderBottom: '0.5px solid #676c77'
class CustomToolBar extends React.Component {

    render() {
        const { additional } = this.props;
        return (
                <AppBar position="static" style={{background: 'none'}}>
                <Toolbar style={{ width: '100%'}} >
                <Typography variant="h6" style={{ color: 'white', width: '20%'  }} noWrap>
                    {this.props.title}
                </Typography>
                {
                    additional
                }
            </Toolbar>
                </AppBar>
               
        )
    }
}

export default CustomToolBar;
