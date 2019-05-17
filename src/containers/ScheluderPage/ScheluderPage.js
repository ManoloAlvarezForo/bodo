import React from 'react'
import Scheduler from '../../components/Scheduler/Scheduler';

class SchedulerPage extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Scheduler')
    }
    render () {
        return (
            <Scheduler />
        )
    }
}

export default SchedulerPage