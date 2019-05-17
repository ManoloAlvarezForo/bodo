import React from 'react'
import Sales from '../../components/Sales/Sales';

class SalesPage extends React.Component {
    componentDidMount() {
        this.props.changeTitle('Ventas')
    }
    render() {
        return (
            <Sales />
        )
    }
}

export default SalesPage;