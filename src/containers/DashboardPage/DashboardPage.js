import React from 'react'
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Dashboards')
    }
    render() {
        return (
            <Dashboard />
        )
    }
}

export default DashboardPage;