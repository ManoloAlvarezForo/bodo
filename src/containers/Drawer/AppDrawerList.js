import React from 'react'
//Icons
import ListItemWithIcon from './ListItemWithIcon';
import {drawerAppIconList, drawerAppOptions} from './DrawerAppListUtil'

const styles = {
    fontSize: {
        fontSize: '22px'
    }
}

class AppDrawerList extends React.Component {
    _handleClick = option => {
        this.props.handleListItemClick(option)
    }
    render () {
        return (
            <React.Fragment>
                {drawerAppOptions.map((option, index) => (
                        <ListItemWithIcon
                            iconStyles={styles.fontSize}
                            iconList={drawerAppIconList}
                            key={index} 
                            name={option.name} 
                            variant={option.variant} 
                            selectedItem={this.props.selectedItem} 
                            path={option.path}
                            handleListItemClick={() => this._handleClick(option)}
                        />
                    ))}
            </React.Fragment>
        )
    }
}

export default AppDrawerList