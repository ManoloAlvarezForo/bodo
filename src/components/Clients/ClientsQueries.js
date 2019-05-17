import gql from 'graphql-tag'

export const GET_CLIENTS_BY_FILTER = gql`
query getClientsByFilter($query: String, $properties: [String]) {
    clientsByFilter(query: $query, properties: $properties){
        id
        name
        avatar
        lastName
        nit
        nitName
        address
        phone
        createdDate
    }
}
`