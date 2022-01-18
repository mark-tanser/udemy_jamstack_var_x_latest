import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import ProductReview from "./ProductReview"

const useStyles = makeStyles(theme => ({
    reviews: {
        padding: "0 3rem"
    }
}))

export default function ProductReviews( {product} ) {
    const classes = useStyles()

    return (
        <Grid item container direction="column" classes={{ root: classes.reviews }}>
            <ProductReview product={product}/>
        </Grid>
    )
}