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
    },
    back: {
        visibility: ({ selectedStep }) => selectedStep === 0 ? "hidden" : "visible"
    },
    forward: {
        visibility: ({ selectedStep, steps }) => selectedStep >= steps.length - 2 ? "hidden" : "visible"
    }
}))

export default function CheckoutNavigation({ steps, selectedStep, setSelectedStep }) {
    const classes = useStyles({ selectedStep, steps })

    return (
        <Grid item container justifyContent="center" alignItems="center" classes={{ root: classes.navbar}} >
            <Grid item classes={{ root: classes.back }}>
                <Button onClick={() => setSelectedStep(selectedStep - 1)} >
                    <Typography variant="h5">
                        {"<"}
                    </Typography>
                </Button>
            </Grid>
            <Grid item>
                <Typography variant="h5">
                    {steps[selectedStep].title.toUpperCase()}
                </Typography>
            </Grid>
            <Grid item classes={{ root: classes.forward }}>
               <Button onClick={() => setSelectedStep(selectedStep + 1)}>
                    <Typography variant="h5">
                        {">"}
                    </Typography>
               </Button>
            </Grid>
        </Grid>
    )
}