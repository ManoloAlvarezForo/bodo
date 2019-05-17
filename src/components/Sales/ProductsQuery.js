
import gql from 'graphql-tag'

export const GET_PRODUCTS_BY_FILTER = gql`
query getProductsByFilter($query: String, $properties: [String]){
	productsByFilter(query: $query, properties: $properties){
    id
    productId
    productName
    price
    description
    availableQuantity
    }
}
`