import React, { useState, useContext } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Rating from "../home/Rating"
import Fields from "../auth/Fields"

import { UserContext } from "../../contexts"

const useStyles = makeStyles(theme => ({
    light: {
        color: theme.palette.primary.main
    },
    date: {
        marginTop: "-0.5rem"
    }
}))

export default function ProductReview() {
    const classes = useStyles()
    const { user } = useContext(UserContext)

    return (
        <Grid item container direction="column">
            <Grid item container justifyContent="space-between">
                <Grid item>
                    <Typography variant="h4" classes={{ root: classes.light }}>
                        {user.username}
                    </Typography>
                </Grid>
                <Grid item>
                    <Rating number={0} size={2.5}/>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="h5" classes={{ root: clsx(classes.date, classes.light) }}>
                    {new Date().toLocaleDateString()}
                </Typography>
            </Grid>
        </Grid>
    )
}