import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import CheckoutNavigation from "./CheckoutNavigation"

const useStyles = makeStyles(theme => ({
    stepContainer: {
        width: "40rem",
        height: "25rem",
        backgroundColor: theme.palette.primary.main
    }
}))

export default function CheckoutPortal({ user }) {
    const classes = useStyles()
    const [selectedStep, setSelectedStep] = useState(0)

    const steps = [
        {title: "Contact Info"},
        {title: "Address"},
        {title: "Shipping"},
        {title: "Payment"},
        {title: "Confirmation"},
        {title: `Thanks ${user.username}!`},
    ]

    return (
        <Grid item container alignItems="flex-end" direction="column" xs={6}>
            <CheckoutNavigation steps={steps} selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
            <Grid item container direction="column" alignItems="center" classes={{ root: classes.stepContainer }}></Grid>
        </Grid>
    )
}