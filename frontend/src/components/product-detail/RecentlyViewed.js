import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import ProductFrameGrid from "../product-list/ProductFrameGrid"

const useStyles = makeStyles(theme => ({
    recentContainer: {
        margin: "10rem 0",
        "& > :not(:last-child)": {
            marginRight: "5rem",
        },
    },
    arrow: {
        minWidth: 0,
        height: "4rem",
        width: "4rem",
        fontSize: "4rem",
        color: theme.palette.primary.main,
        borderRadius: 50,
    },
}))

export default function RecentlyViewed({ products }) {
    const classes = useStyles()

    return (
        <Grid 
            item 
            container 
            justifyContent="center" 
            alignItems="center"
            classes={{ root: classes.recentContainer }}
        >

            <Grid item>
                <Button classes={{ root: classes.arrow }}>{"<"}</Button>
            </Grid>

            {products 
                ? products.map(product => {
                    const hasStyles = product.node.variants.some(variant => variant.style !== null)
                    return (
                        <ProductFrameGrid 
                            key={product.node.variants[product.selectedVariant].id} 
                            product={product} 
                            variant={product.node.variants[product.selectedVariant]}
                            hasStyles={hasStyles}
                            disableQuickView
                            small
                        />
                    )
                }) 
                : null
            }

            <Grid item>
                <Button calsses={{ root: classes.arrow }}>{">"}</Button>
            </Grid>

        </Grid>
    )
}