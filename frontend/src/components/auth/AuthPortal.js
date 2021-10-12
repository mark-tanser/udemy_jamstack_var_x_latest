import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Login from "./Login"

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: "8rem"
    },
    paper: {
        border: `2rem solid ${theme.palette.secondary.main}`,
        width: "50rem",
        height: "40rem",
        borderRadius: 0
    },
    inner: {
        height: "40rem",
        width: "100%",
        border: `2rem solid ${theme.palette.primary.main}`
    }
}))

export default function AuthPortal() {
    const classes = useStyles()
    const [selectedStep, setSelectedStep] = useState(0)

    const steps = [{component: Login, label: "Login"}]

    return (
        <Grid container justify="center" classes={{ root: classes.container }}>
            <Grid item>
                <Paper elevation={6} classes={{ root: classes.paper}}>
                    <Grid container 
                        direction="column" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        classes={{ root: classes.inner }}
                    >
                        {steps.map((Step, i) => (
                            selectedStep === i ? <Step.component setSelectedStep={setSelectedStep} steps={steps} key={Step.label}/> : null
                        ))}
                    </Grid>
                </Paper>
            </Grid>
            
        </Grid>
    )
}