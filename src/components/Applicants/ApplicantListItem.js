import React from 'react'
import GenericListItem from '../GenericList/GenericListItem';

export default class ApplicantListItem extends React.Component {
  render() {
      const {item, handleListItemClick, selectedItem} = this.props;
        return (
            <GenericListItem
                handleListItemClick={handleListItemClick}
                id={item.id}
                selected={selectedItem}
                avatar={(item.avatar !== "") ? item.avatar : item.name[0]}
                primaryText={`${item.name} ${item.lastName}`}
                secondaryTextOne={item.phones.list.length === 0 ? `No Phones - ` : `${item.phones.list[0].number} - `}
                secondaryTextTwo={`${`${item.mails.list.length === 0 ? 'No Mails' : item.mails.list[0].mail} - `}${`${item.position === "" ? 'No Position' : item.position}`}`}
            />
        )
    }
}
