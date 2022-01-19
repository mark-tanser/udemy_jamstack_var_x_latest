import { gql } from "@apollo/client"

export const GET_DETAILS = gql`
    query getDetails($id: ID!) {
        product(id: $id) {
            rating
            variants {
                qty
            }
        }
    }
`

export const GET_REVIEWS = gql`
    query getReviews($id: ID!) {
        product(id: $id) {
            reviews {
                id
                text
                rating
                updatedAt
                users_permissions_user {
                    username
                }
            }
        }
    }
`

// my version of Strapi has 'users_permission_user' in place of 'user' that is referenced in the course
