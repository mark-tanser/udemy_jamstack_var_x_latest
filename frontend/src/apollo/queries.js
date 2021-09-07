import { gql } from "@apollo/client"

const GET_DETAILS = gql`
    query getDetails($id: ID!) {
        product(id: $id) {
            variants {
                qty
            }
        }
    }
`