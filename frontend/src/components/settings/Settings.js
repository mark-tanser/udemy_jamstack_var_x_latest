import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Details from "./Details"
import Payments from "./Payments"
import Location from "./Location"

const useStyles = makeStyles(theme => ({

}))

export default function Settings() {
    const classes = useStyles()

    return (
       <>
            <Grid container>
                <Details />
                <Payments />
            </Grid>
            <Grid container>
                <Location />
            </Grid>
       </>
    )
}