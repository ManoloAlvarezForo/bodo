import React from 'react';
import {GET_CLIENTS_BY_FILTER} from './ClientsQueries'
import { Query } from 'react-apollo';

const ClientsQueryComponent = ({ query, properties, item: Item }) => {
    return <Query query={GET_CLIENTS_BY_FILTER}
        variables={{ query, properties }}
        fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return `Error!: ${error}`
            return data.applicantsByFilter.map((suggestion, index) => {
                return (
                    <Item
                        key={index}
                        suggestion={suggestion}
                        itemAvatar={ItemWithAvatar}
                        getItemProps={getItemProps}
                    />
                )
            })
        }}
    </Query>
}

export default ClientsQueryComponent;