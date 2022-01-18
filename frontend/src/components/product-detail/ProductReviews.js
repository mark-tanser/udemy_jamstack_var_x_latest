import React, { useState, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import { useQuery } from "@apollo/client"

import ProductReview from "./ProductReview"
import { GET_REVIEWS } from "../../apollo/queries"

const useStyles = makeStyles(theme => ({
    reviews: {
        padding: "0 3rem"
    }
}))

export default function ProductReviews( { product } ) {
    const classes = useStyles()
    const [reviews, setReviews] = useState([])

    console.log("product:", product)

    const { data } = useQuery(GET_REVIEWS, { variables: { id: product } })

    useEffect(() => {
      if (data) {
        setReviews(data.product.reviews)
      }
    }, [data])

    console.log(reviews)

    return (
        <Grid item container direction="column" classes={{ root: classes.reviews }}>
            {reviews.map(review => (
                <ProductReview 
                    key={review.id} 
                    product={product} 
                    review={review} 
                />
            ))}
        </Grid>
    )
}