import React from 'react'
import { GET_APPLICANTS_BASIC } from './ApplicantsQueries'
import { Query } from "react-apollo";
import ApplicantsContainer from './ApplicantsContainer';

const ApplicantsMain = () => (
  <Query query={GET_APPLICANTS_BASIC}  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return `Error!: ${error}`
      return (
        data.applicants.length === 0 ?
          <div>NO DATA</div> :
          <ApplicantsContainer applicants={data.applicants} />
      )
    }}
  </Query>
);

export default class Applicants extends React.Component {
  render() {
    return (
        <ApplicantsMain />
    )
  }
}

// TODO: Separate Components for ApplicantsContainer and ApplicantDialogContent
