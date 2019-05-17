import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';
import { Query } from 'react-apollo';
import {GET_CLIENTS_BY_FILTER} from '../Clients/ClientsQueries'

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

const filterColors = (inputValue) => {
  return colourOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const graphQLSelectSuggestions = (inputValue) => {
    const query = inputValue;
    const properties = ['name', 'lastName', 'phone']
    return <Query query={GET_CLIENTS_BY_FILTER}
         skip={query === "" || query === undefined}
        variables={{ query, properties}}
        fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return `Error!: ${error}`
            return data.clientsByFilter;
        }}
    </Query>
}


const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default class AsyncSelectComponent extends Component {
  render() {
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={graphQLSelectSuggestions} />
    );
  }
}