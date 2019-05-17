import React from 'react'
import Notifications from '../../components/Notifications/Notifications';

class NotificationPage extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Notifications')
    }
    render() {
        return (
            <Notifications />
        )
    }
}

export default NotificationPage;