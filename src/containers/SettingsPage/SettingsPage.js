import React from 'react'
import Settings from '../../components/Settings/Settings'

export default class SettingsPage extends React.Component {
  componentDidMount() {
    this.props.changeTitle('Settings')
}
  render() {
    return (
      <Settings />
    )
  }
}
