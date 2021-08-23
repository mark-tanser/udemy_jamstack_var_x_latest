import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default function FeaturedProducts() {
    const data = useStaticQuery(graphql`
    query GetFeatured {
        allStrapiProduct(filter: {promo: {}, featured: {eq: true}, parent: {}}) {
          edges {
            node {
              name
              strapiId
              variants {
                price
                images {
                  url
                }
              }
            }
          }
        }
      }
    `)

    console.log(data)

    return <div>Featured Products</div>
}