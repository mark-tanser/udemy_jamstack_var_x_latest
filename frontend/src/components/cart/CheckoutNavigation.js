import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import save from "../../images/save.svg"
import Delete from "../../images/Delete.js"

const useStyles = makeStyles(theme => ({
    navbar: {
        backgroundColor: theme.palette.secondary.main,
        width: "40rem",
        height: "5rem",
        position: "relative"
    },
    back: {
        visibility: ({ selectedStep }) => selectedStep === 0 ? "hidden" : "visible"
    },
    forward: {
        visibility: ({ selectedStep, steps }) => selectedStep >= steps.length - 2 ? "hidden" : "visible"
    },
    disabled: {
        opacity: 0.5
    },
    icon: {
        height: "2.25rem",
        width: "2.25rem"
    },
    actions: {
        position: "absolute",
        right: 0
    },
    delete: {
        height: "2rem",
        width: "2rem"
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
                <Button 
                    disabled={steps[selectedStep].error} 
                    onClick={() => setSelectedStep(selectedStep + 1)} 
                    classes={{disabled: classes.disabled}}
                >
                    <Typography variant="h5">
                        {">"}
                    </Typography>
               </Button>
            </Grid>
            {steps[selectedStep].hasActions ? (
                <Grid item classes={{ root: classes.actions }}>
                    <Grid container>
                        <Grid item>
                            <IconButton>
                                <img src={save} alt="save" className={classes.icon}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <span className={classes.delete}>
                                    <Delete color="#fff" />
                                </span>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            ) : null}         
        </Grid>
    )
}