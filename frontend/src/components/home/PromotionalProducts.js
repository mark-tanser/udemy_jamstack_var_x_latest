import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Carousel from 'react-spring-3d-carousel'
import clsx from 'clsx'
import { useStaticQuery, graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import promoAdornment from '../../images/promo-adornment.svg'
import explore from '../../images/explore.svg'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        backgroundImage: `url(${promoAdornment})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '70rem',
        padding: '30rem 10rem 10rem 10rem'
    }
}))

export default function PromotionalProducts() {
    const classes = useStyles()
    const [selectedSlide, setSelectedSlide] = useState(0)

    const data = useStaticQuery(graphql`
    query MyQuery {
        allStrapiProduct(filter: {promo: {eq: true}}) {
          edges {
            node {
                name
                description
                strapiId
                variants {
                    images {
                    url
                }
              }
              
            }
          }
        }
    }
    `)

    var slides = [
        {key: 1, content: <div>First Slide</div>},
        {key: 2, content: <div>Second Slide</div>},
        {key: 3, content: <div>Third Slide</div>}
    ]

    // data.allStrapiProduct.edges.map({ node } => )

    console.log(data)

    return (
        <Grid 
            container 
            justifyContent="space-between" 
            alignItems="center"
            classes={{root: classes.mainContainer}}
        >
            <Grid item>
                <Carousel slides={slides} goToSlide={selectedSlide} />
            </Grid>
            <Grid item>
                Description
            </Grid>
        </Grid>    
    )
}