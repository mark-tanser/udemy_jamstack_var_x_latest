import React, { useState, useContext } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import { makeStyles } from "@material-ui/core/styles"
import { CartContext } from "../../contexts"

import { useIsClient } from "../../hooks"

import Item from "./Item"

const useStyles = makeStyles(theme => ({

}))

export default function CartItems() {
    const classes = useStyles()
    const { cart } = useContext(CartContext)
    const { isClient, key } = useIsClient()

    return (
        <Grid key={key} item container direction="column" lg={6}>
            {!isClient ? null : cart.map(item => (
                <Item item={item} key={item.variant.id} />
            ))}
        </Grid>
    )
}