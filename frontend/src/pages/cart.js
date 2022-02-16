import React, { useState, useContext } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useMediaQuery } from "@material-ui/core"
import SEO from "../components/ui/seo"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import { makeStyles } from "@material-ui/core/styles"
import { UserContext } from "../contexts"

import Layout from "../components/ui/layout"
import CheckoutPortal from "../components/cart/CheckoutPortal"
import CartItems from "../components/cart/CartItems"

const useStyles = makeStyles(theme => ({
  cartContainer: {
    minHeight: "70vh"
  },
  name: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem"
    }
  }
}))

export default function Cart() {
    const classes = useStyles()
    const { user } = useContext(UserContext)
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

    const items = <CartItems />
    const checkout = <CheckoutPortal user={user}/>

    return (
        <Layout>
          <SEO title="Cart" description="Buy cool stuff here" />
          <Grid 
            container 
            direction="column" 
            alignItems="center"
            classes={{ root: classes.cartContainer }}
          >
            <Grid item>
              <Typography variant="h1" align="center" classes={{ root: classes.name }}>
                {user.username}'s Cart
              </Typography>
            </Grid>  
            <Grid item container>
              {matchesMD ? checkout : items}
              {matchesMD ? items : checkout}
            </Grid>  
          </Grid>
        </Layout>
    )
}