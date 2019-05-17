import React from 'react';
import { Query } from 'react-apollo';
import {GET_PRODUCTS_BY_FILTER} from './ProductsQuery'

const ProductsSuggestionsList = ({ products, item: Item, selectedItemEvent }) => {
    return (
        products.map((suggestion, index) => {
            return (
                <Item
                    selectedItemEvent={selectedItemEvent}
                    key={index}
                    product={suggestion}
                />
            )
        })
    )
}

const ProductSuggestions = ({ query, properties = ['productName', 'productId'], item, selectedItemEvent}) => {
    return <Query query={GET_PRODUCTS_BY_FILTER}
        variables={{ query, properties }}
        skipe={query === ''}
        fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return `Error!: ${error}`
            return(
                <ProductsSuggestionsList
                    products={data.productsByFilter}
                    item={item}
                    selectedItemEvent={selectedItemEvent}
                />
            )
        }}
    </Query>
}


export default ProductSuggestions;