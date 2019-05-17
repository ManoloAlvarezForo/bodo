import gql from 'graphql-tag'
export const IS_VALID_TOKEN = gql`
query isValidToken($token: String){
    isValidToken(token: $token){
        isValid
    }
}
`