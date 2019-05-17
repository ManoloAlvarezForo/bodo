import React from 'react';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
      width: '100%',
      // maxWidth: 800,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '5px',
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
  },
  inline: {
      display: 'inline',
  },
});

class GenericList extends React.Component {
  state = {
    selectedItem: ''
  }

  _handleListItemClick = (id) => {
    this.setState({ selectedItem: id });
    this.props.selectedAction(id)
  };

  render() {
    
    const { list = [], classes } = this.props;
    const Item = this.props.item;

    return (
      <List className={classes.root} >
      {
          list.map((item, index) => {
              return (
                  <Item 
                    key={index}
                    selectedItem={this.state.selectedItem === item.id}
                    handleListItemClick={this._handleListItemClick}
                    item={item}
                  />
              )
          })
      }
    </List>
    )
  }
}

GenericList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenericList);