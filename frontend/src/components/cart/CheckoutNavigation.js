import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    navbar: {
        backgroundColor: theme.palette.secondary.main,
        width: "40rem",
        height: "5rem"
    }
}))

export default function CheckoutNavigation() {
    const classes = useStyles()

    return (
        <Grid item container classes={{ root: classes.navbar}} >
            
        </Grid>
    )
}