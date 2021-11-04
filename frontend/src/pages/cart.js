import React, { useState, useContext } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import { makeStyles } from "@material-ui/core/styles"
import { UserContext } from "../contexts"

import Layout from "../components/ui/layout"
import CheckoutPortal from "../components/cart/CheckoutPortal"
import CartItems from "../components/cart/CartItems"

const useStyles = makeStyles(theme => ({

}))

export default function Cart() {
    const classes = useStyles()
    const { user } = useContext(UserContext)

    return (
        <Layout>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h1">
                {user.username}'s Cart
              </Typography>
              <Grid item container>
                <CartItems />
                <CheckoutPortal />
              </Grid>  
            </Grid>
          </Grid>
        </Layout>
    )
}