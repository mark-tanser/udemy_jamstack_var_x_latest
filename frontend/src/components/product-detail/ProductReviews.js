import React, { useState, useEffect, useContext } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import { useQuery } from "@apollo/client"

import { UserContext } from "../../contexts"

import ProductReview from "./ProductReview"
import { GET_REVIEWS } from "../../apollo/queries"

const useStyles = makeStyles(theme => ({
    reviews: {
        padding: "0 3rem"
    }
}))

export default function ProductReviews( { product, edit, setEdit } ) {
    const classes = useStyles()
    const { user } = useContext(UserContext)
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
        <Grid 
            id="reviews" 
            item 
            container 
            direction="column" 
            classes={{ root: classes.reviews }}
        >
            {edit && (
                <ProductReview user={user} reviews={reviews} setReviews={setReviews} product={product} setEdit={setEdit} />
            )}
            {reviews
                .filter(
                    review => edit 
                        ? review.users_permissions_user.username !== user.username 
                        : review
                )
                .map(review => (
                <ProductReview 
                    reviews={reviews}
                    key={review.id} 
                    product={product} 
                    review={review} 
                />
                ))
            }
        </Grid>
    )
}