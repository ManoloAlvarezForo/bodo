import gql from 'graphql-tag'

export const ADD_CLIENT = gql`
mutation AddClient($client: ClientInput) {
	addClient(client: $client){
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