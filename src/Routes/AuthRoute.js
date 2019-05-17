import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AUTH_TOKEN } from '../Utils/Constans/Communication'
import { Query } from 'react-apollo';
import { IS_VALID_TOKEN } from './AuthQueries';

export const AuthRoute = ({ component: Component, container: CustomContainer, ...rest }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return (
        token ?
            <Query
                query={IS_VALID_TOKEN}
                variables={{ token: token }}
                skipe={token === ''}
                fetchPolicy="cache-and-network">
                {({ loading, error, data }) => {
                    if (loading) return <div></div>
                    if (error) return `Error to verify token!: ${error}`
                    const isAuth = data.isValidToken.isValid
                    return (
                        <Route {...rest} render={(props) => (
                            isAuth === true
                                ? <CustomContainer {...props} body={Component} />
                                : <Redirect to="/access" />
                        )} />
                    )
                }}
            </Query> :
            <Redirect to="/access" />
    )
}