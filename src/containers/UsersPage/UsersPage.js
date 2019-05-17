import React from 'react'
import Users from '../../components/Users/Users';

class UsersPage extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Users')
    }
    render() {
        return (
            <Users />
        )
    }
}

export default UsersPage;