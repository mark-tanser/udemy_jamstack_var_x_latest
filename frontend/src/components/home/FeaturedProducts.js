import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'

import { useStaticQuery, graphql } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import featuredAdornment from '../../images/featured-adornment.svg'

import FeaturedProduct from './FeaturedProduct'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'


const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${featuredAdornment})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '180rem',
        padding: '0 2.5rem',
        [theme.breakpoints.down('md')]: {
            height: '220rem',
        },
    },
    
}))

export default function FeaturedProducts() {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(null)

    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    const data = useStaticQuery(graphql`
      query GetFeatured {
        allStrapiProduct(filter: {promo: {}, featured: {eq: true}, parent: {}}) {
          edges {
            node {
              name
              strapiId
              category {
                name
              }
              variants {
                price
                style
                images {
                  localFile {
                    childImageSharp {
                        gatsbyImageData
                    }
                  }
                }
              }
            }
          }
        }
      }
    `)

    return (
        <Grid 
            container 
            direction="column" 
            justifyContent={matchesMD ? "space-between" : "center"}
            classes={{ root: classes.background }}
        >
            {data.allStrapiProduct.edges.map(({ node }, i) => (
                <FeaturedProduct 
                    expanded={expanded}
                    setExpanded={setExpanded}
                    key={node.strapiId} 
                    node={node} 
                    i={i} 
                    matches={matchesMD} 
                />
            ))}
        </Grid>
    )
}