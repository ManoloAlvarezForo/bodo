import React from 'react'
import GenericListItem from '../GenericList/GenericListItem';

export default class ApplicantListItem extends React.Component {
    render() {
        const {
            item,
            handleListItemClick,
            selectedItem
        } = this.props;

        return (
            <GenericListItem
                handleListItemClick={handleListItemClick}
                id={item.id}
                avatar={item.name[0]}
                selected={selectedItem}
                primaryText={item.name}
                secondaryTextOne={item.email}
            />
        )
    }
}
