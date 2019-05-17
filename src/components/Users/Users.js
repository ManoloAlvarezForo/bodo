import React from 'react'
import { Query } from "react-apollo";
import UsersContainer from './UsersContainer';

//GraphQL Queries
import { GET_USERS } from './UsersQueries'

const UserData = ({ setAdditionalComponent }) => (
    <Query query={GET_USERS}  >
        {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return `Error!: ${error}`
            return (
                data.users.length === 0 ?
                    <div>NO DATA</div> :
                    <UsersContainer
                        setAdditionalComponent={setAdditionalComponent}
                        users={data.users}
                    />
            )
        }}
    </Query>
);

export default class Users extends React.Component {
    render() {
        return (
            <UserData setAdditionalComponent={this.props.setAdditionalComponent} />
        )
    }
}
